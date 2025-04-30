'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, PhoneCall, PhoneOff, Upload } from 'lucide-react';
import { useXP } from './xp-provider';
import { parsePDF } from '@/lib/pdfParser';
import { generateQuestions } from '@/lib/deepseek';
import Vapi from '@vapi-ai/web';
import Image from 'next/image';
import { VAPI_API_KEY } from '@/constants/constants';

export default function InterviewPrep() {
  const [resumeText, setResumeText] = useState('');
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [improvementPoints, setImprovementPoints] = useState([]);
  const [confidenceScore, setConfidenceScore] = useState(60);
  const [loading, setLoading] = useState(false);
  const [callActive, setCallActive] = useState(false);
  const { addXP } = useXP();
  const [vapiInstance, setVapiInstance] = useState(null);
  const fileInputRef = useRef(null);

  // Веб-камера
  useEffect(() => {
    let stream = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.getElementById('user-video');
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      } catch (error) {
        console.error('Ошибка доступа к веб-камере:', error);
        alert('Не удалось получить доступ к веб-камере. Проверьте настройки браузера.');
      }
    };

    const stopCamera = () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };

    if (isInterviewStarted) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isInterviewStarted]);

  // Инициализация Vapi
  useEffect(() => {
    try {
      const instance = new Vapi(VAPI_API_KEY);
      setVapiInstance(instance);
      console.log('Vapi инициализирован:', instance);
    } catch (error) {
      console.error('Ошибка инициализации Vapi:', error);
      alert('Не удалось инициализировать голосовой интерфейс. Проверьте API-ключ.');
    }

    return () => {
      if (vapiInstance && callActive) {
        try {
          vapiInstance.stop();
          console.log('Звонок остановлен при размонтировании');
        } catch (err) {
          console.error('Ошибка при остановке звонка при размонтировании:', err);
        }
      }
    };
  }, [callActive]);

  // Парсинг оценок для уверенности
  const parseScore = (value) => {
    const lowerValue = value.toLowerCase();
    if (lowerValue.includes('высок')) return 80; // Высокий: +80%
    if (lowerValue.includes('средн')) return 50; // Средний: +50%
    if (lowerValue.includes('низк')) return 20; // Низкий: +20%
    const numericMatch = value.match(/(\d+)%?/);
    if (numericMatch) return parseInt(numericMatch[1], 10);
    return 50; // По умолчанию средний
  };

  // Получение текстового уровня уверенности
  const getConfidenceLevel = (score) => {
    if (score >= 80) return 'Высокий';
    if (score >= 50) return 'Средний';
    return 'Низкий';
  };

  // Обработка загрузки резюме
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      try {
        console.log('Загрузка файла:', file.name);
        const text = await parsePDF(file);
        console.log('Текст резюме:', text);
        setResumeText(text);
        localStorage.setItem('resumeText', text);
        const generatedQuestions = await generateQuestions(text);
        console.log('Сгенерированные вопросы:', generatedQuestions);
        if (generatedQuestions.length === 0) {
          throw new Error('Вопросы не сгенерированы');
        }
        setQuestions(generatedQuestions);
        setIsResumeUploaded(true);
      } catch (error) {
        console.error('Ошибка обработки резюме:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        alert(`Ошибка обработки резюме: ${errorMessage}. Пожалуйста, загрузите текстовое PDF.`);
      }
      setLoading(false);
    }
  };

  // Функция для вызова клика на скрытом инпуте
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Начало интервью
  const startInterview = () => {
    if (questions.length === 0) {
      alert('Ошибка: Вопросы не загружены. Пожалуйста, загрузите резюме.');
      return;
    }

    if (!vapiInstance) {
      console.error('Vapi не инициализирован');
      alert('Ошибка: Голосовой интерфейс не инициализирован.');
      return;
    }

    setIsInterviewStarted(true);
    setCallActive(true);

    const assistantOptions = {
      name: 'Interview Assistant',
      firstMessage: questions[0],
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en-US',
      },
      voice: {
        provider: 'playht',
        voiceId: 'jennifer',
      },
      model: {
        provider: 'openai',
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an interview preparation assistant.

Your task is to ask questions from the list and evaluate the candidate's answers. List of questions:
${questions.join('\n\n')}

After each answer, evaluate it according to the criteria:
3. Suggestions: specific recommendations on what can be improved in the answer (1-2 sentences).

The answer format should be strictly as follows:
Suggestions: [recommendations].

Talk like you're a real human. Use a friendly tone. Be professional and polite. Use short sentences.

Ask questions in turn. After the answer, give feedback in the specified format and move on to the next question. If there are no more questions, end the interview by saying, "Thank you for completing the interview! Would you like to start over?"

Be professional but friendly. Use short sentences. Answer in English.`,
          },
        ],
      },
    };

    // Настройка обработчиков событий Vapi
    vapiInstance.on('call-start', () => {
      console.log('Звонок начался');
      setCallActive(true);
    });

    vapiInstance.on('call-end', () => {
      console.log('Звонок завершён');
      setCallActive(false);
      endInterview();
    });

    vapiInstance.on('message', (message) => {
      console.log('Сообщение Vapi:', message);
      if (message.type === 'transcript' && message.role === 'assistant') {
        const transcript = message.transcript;
        if (transcript.toLowerCase().includes('ясность') || transcript.toLowerCase().includes('специфичность')) {
          setFeedback(prev => [...prev, transcript]);

          const clarityMatch = transcript.match(/Ясность:\s*([^\.]+)/i);
          const specificityMatch = transcript.match(/Специфичность:\s*([^\.]+)/i);
          const suggestionsMatch = transcript.match(/Предложения:\s*([^\.]+)/i);

          if (clarityMatch && specificityMatch) {
            const clarityScore = parseScore(clarityMatch[1]);
            const specificityScore = parseScore(specificityMatch[1]);
            const confidenceDelta = (clarityScore + specificityScore) / 2;
            setConfidenceScore(prev => Math.min(100, Math.max(0, prev + confidenceDelta / 10)));
          }

          if (suggestionsMatch) {
            const suggestion = suggestionsMatch[1].trim();
            setImprovementPoints(prev => [...prev, suggestion]);
          }

          addXP(5);
        }
        if (transcript.includes('Спасибо за прохождение интервью!')) {
          setCallActive(false);
          endInterview();
        }
      }
    });

    vapiInstance.on('transcript', (message) => {
      console.log('Транскрипт пользователя:', message);
    });

    try {
      vapiInstance.start(assistantOptions);
      setCurrentQuestionIndex(1);
      addXP(10);
    } catch (error) {
      console.error('Ошибка запуска звонка:', error);
      alert('Не удалось начать голосовое интервью. Попробуйте снова.');
      setCallActive(false);
      setIsInterviewStarted(false);
    }
  };

  // Завершение интервью
  const endInterview = () => {
    if (vapiInstance && callActive) {
      try {
        vapiInstance.stop();
        console.log('Звонок успешно остановлен');
      } catch (err) {
        console.error('Ошибка при остановке звонка:', err);
      }
    } else {
      console.log('Vapi не инициализирован или звонок не активен');
    }

    setCallActive(false);
    setIsInterviewStarted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setFeedback([]);
    setImprovementPoints([]);
    setConfidenceScore(60);
    setIsResumeUploaded(false);
    setResumeText('');
    localStorage.removeItem('resumeText');

    if (feedback.length > 0) {
      addXP(20);
    }
  };

  return (
    <div className="w-full">
      <style>
        {`
          .call-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            text-align: center;
          }
          .avatar-container {
            position: relative;
            width: 200px;
            height: 200px;
            margin-bottom: 1rem;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
          }
          .call-status {
            font-size: 1.25rem;
            font-weight: bold;
            color: ${callActive ? '#00ff00' : '#ff3333'};
            margin: 1rem 0;
          }
          .spinner {
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1s linear infinite;
          }
          .file-input-hidden {
            display: none;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="w-full">
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardContent className="p-4 flex-1 flex flex-col">
              {!isResumeUploaded ? (
                <div className="flex-1 flex items-center justify-center">
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <Play className="h-12 w-12 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold mb-4 text-primary">Загрузите ваше резюме</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Загрузите резюме, чтобы получить вопросы для интервью, основанные на ваших навыках.
                      </p>
                      <div>
                        <Button
                          onClick={handleButtonClick}
                          className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-2"
                        >
                          <Upload className="h-4 w-4 mr-2" /> Выбрать резюме
                        </Button>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          className="file-input-hidden"
                          ref={fileInputRef}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ) : !isInterviewStarted ? (
                <div className="flex-1 flex items-center justify-center">
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                        <PhoneCall className="h-12 w-12 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold mb-4 text-primary">Готовы начать интервью?</h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Нажмите "Начать интервью", чтобы начать голосовое собеседование.
                      </p>
                      <Button
                        onClick={startInterview}
                        className="bg-primary hover:bg-primary/90"
                        disabled={questions.length === 0 || loading}
                      >
                        <PhoneCall className="h-4 w-4 mr-2" /> Начать голосовое интервью
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="call-container">
                  <div className="flex gap-4">
                    <div className="avatar-container">
                      <Image
                        src="/images/avatar.png"
                        alt="AI Assistant Avatar"
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="avatar-container">
                      <video
                        id="user-video"
                        autoPlay
                        playsInline
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  <p className="call-status">{callActive ? 'Звонок активен' : 'Звонок завершён'}</p>
                  <Button
                    onClick={endInterview}
                    className="bg-red-500 hover:bg-red-600"
                    disabled={loading || !callActive}
                  >
                    <PhoneOff className="h-4 w-4 mr-2" /> Завершить звонок
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}