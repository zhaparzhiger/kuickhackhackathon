"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Camera, X, Check } from "lucide-react";
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";

// Define job type
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  lat: number;
  lon: number;
  distance: string;
  type: string;
  tags: string[];
}

// Mock job data
const mockJobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Almaty, KZ",
    salary: "60,000 KZT",
    lat: 43.2389,
    lon: 76.8897,
    distance: "1 m",
    type: "Full-time",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignHub",
    location: "Almaty, KZ",
    salary: "55,000 KZT",
    lat: 43.239,
    lon: 76.89,
    distance: "2 m",
    type: "Full-time",
    tags: ["Figma", "Adobe XD", "Prototyping"],
  },
];

// City coordinates
const cityCoords: { [key: string]: [number, number] } = {
  Almaty: [43.2389, 76.8897],
  Astana: [51.1694, 71.4491],
  Shymkent: [42.3167, 69.5901],
};

export default function ARJobSearch() {
  const [city, setCity] = useState<string>("Almaty");
  const [arActive, setArActive] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyForm, setShowApplyForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; email: string; phone: string }>({
    name: "",
    email: "",
    phone: "",
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posenetModelRef = useRef<posenet.PoseNet | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Handle city change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  // Initialize TensorFlow.js backend
  const initializeBackend = async () => {
    try {
      console.log("Available backends:", tf.getBackend(), tf.engine().registry);
      await tf.setBackend("webgl");
      await tf.ready();
      console.log("WebGL backend set successfully");
    } catch (err) {
      console.warn("WebGL backend failed, falling back to CPU:", err);
      try {
        await tf.setBackend("cpu");
        await tf.ready();
        console.log("CPU backend set successfully");
      } catch (cpuErr) {
        console.error("Failed to set CPU backend:", cpuErr);
        setBackendError("Не удалось инициализировать TensorFlow.js: " + (cpuErr as Error).message);
      }
    }
  };

  // Load PoseNet model
  const loadPoseNet = async () => {
    try {
      console.log("Loading PoseNet model...");
      const net = await posenet.load({
        architecture: "MobileNetV1",
        outputStride: 16,
        inputResolution: { width: 320, height: 240 },
        multiplier: 0.5,
      });
      posenetModelRef.current = net;
      setModelLoaded(true);
      console.log("PoseNet model loaded successfully");
    } catch (err) {
      console.error("Error loading PoseNet model:", err);
      setBackendError("Не удалось загрузить модель PoseNet: " + (err as Error).message);
    }
  };

  useEffect(() => {
    const init = async () => {
      await initializeBackend();
      if (!backendError) {
        await loadPoseNet();
      }
    };
    init();
  }, []);

  // Ensure the video element is mounted
  useEffect(() => {
    if (videoRef.current) {
      setIsMounted(true);
      console.log("videoRef is mounted");
    }
  }, [arActive]);

  // Start AR experience
  const startAR = async () => {
    if (!isMounted) {
      console.error("Component not fully mounted, videoRef is not ready");
      alert("Ошибка: видео элемент не готов. Попробуйте снова.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        console.log("Video playback started successfully");
        setArActive(true);
        detectPose();
      } else {
        console.error("videoRef.current is null after mounting");
        alert("Ошибка: videoRef.current не инициализирован");
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Не удалось получить доступ к камере: " + (err as Error).message);
    }
  };

  // Stop AR experience
  const stopAR = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    setArActive(false);
    setSelectedJob(null);
    console.log("AR experience stopped");
  };

  // Select a job
  const selectJob = (job: Job) => {
    setSelectedJob(job);
    setShowApplyForm(false);
    console.log("Selected job:", job);
  };

  // Handle apply form submission
  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    console.log("Application submitted:", { job: selectedJob, applicant: formData });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Reset application form
  const resetApplication = () => {
    setApplicationSubmitted(false);
    setShowApplyForm(false);
    setSelectedJob(null);
    setFormData({ name: "", email: "", phone: "" });
  };

  // Draw job markers on the canvas
  const drawJobMarkers = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    console.log(`Drawing job markers at x: ${x}, y: ${y}`);
    mockJobs.forEach((job, index) => {
      // Reduce the X offset to keep markers closer together
      const markerX = x + (index * 100 - 50); // Reduced from 150 to 100, and 75 to 50
      const markerY = y - 50; // Reduced from 100 to 50 to keep it closer to the nose
      const markerWidth = 120;
      const markerHeight = 80;

      // Ensure the marker stays within canvas bounds
      const adjustedX = Math.max(markerWidth / 2, Math.min(markerX, ctx.canvas.width - markerWidth / 2));
      const adjustedY = Math.max(markerHeight / 2, Math.min(markerY, ctx.canvas.height - markerHeight / 2));

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fillRect(adjustedX - markerWidth / 2, adjustedY - markerHeight / 2, markerWidth, markerHeight);

      ctx.fillStyle = "#1E3A8A";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText(job.title, adjustedX, adjustedY - 10);
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText(job.company, adjustedX, adjustedY + 5);
      ctx.fillText(job.salary, adjustedX, adjustedY + 20);
      ctx.fillText(job.distance, adjustedX, adjustedY + 35);

      (job as any).markerBounds = {
        x: adjustedX - markerWidth / 2,
        y: adjustedY - markerHeight / 2,
        width: markerWidth,
        height: markerHeight,
      };
      console.log(`Marker for ${job.title} drawn at x: ${adjustedX}, y: ${adjustedY}`);
    });
  };

  // Detect poses and draw markers
  const detectPose = async () => {
    if (!posenetModelRef.current || !videoRef.current || !canvasRef.current) {
      console.log("Not ready to detect poses:", {
        model: !!posenetModelRef.current,
        video: !!videoRef.current,
        canvas: !!canvasRef.current,
      });
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get 2D context from canvas");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    console.log(`Canvas dimensions set to: ${canvas.width}x${canvas.height}`);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(10, 10, 50, 50);

    let pose;
    try {
      pose = await posenetModelRef.current.estimateSinglePose(video, {
        flipHorizontal: true, // Flip horizontally for front-facing camera
      });
      console.log("Detected pose:", pose);
    } catch (err) {
      console.error("Error during pose detection:", err);
      return;
    }

    const nose = pose.keypoints.find((kp) => kp.part === "nose");
    if (nose && nose.score > 0.2) {
      const { x, y } = nose.position;
      console.log(`Nose detected at x: ${x}, y: ${y}, confidence: ${nose.score}`);
      drawJobMarkers(ctx, x, y);
    } else {
      console.log("No pose detected, using fallback position");
      drawJobMarkers(ctx, canvas.width / 2, canvas.height / 4);
    }

    // Add a delay to reduce CPU load
    await new Promise((resolve) => setTimeout(resolve, 100));
    animationFrameIdRef.current = requestAnimationFrame(detectPose);
  };

  // Handle canvas click to select a job
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedJob = mockJobs.find((job) => {
      const bounds = (job as any).markerBounds;
      if (!bounds) return false;
      return (
        x >= bounds.x &&
        x <= bounds.x + bounds.width &&
        y >= bounds.y &&
        y <= bounds.y + bounds.height
      );
    });

    if (clickedJob) {
      selectJob(clickedJob);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-primary px-4 pt-4">AR Поиск Работы</h1>

      {!arActive && (
        <Card className="mb-6 mx-4 shadow-md">
          <CardHeader>
            <CardTitle>Найти Работу в Дополненной Реальности</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Направьте камеру, чтобы увидеть вакансии в вашем окружении!
              </p>
              <div className="mb-6">
                <Label htmlFor="city">Выберите Город</Label>
                <select
                  id="city"
                  className="w-full mt-1 p-2 rounded-md border border-input bg-background"
                  value={city}
                  onChange={handleCityChange}
                >
                  <option value="Almaty">Алматы</option>
                  <option value="Astana">Астана</option>
                  <option value="Shymkent">Шымкент</option>
                </select>
              </div>
              <Button
                onClick={startAR}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!modelLoaded || !!backendError}
              >
                <Camera className="mr-2 h-4 w-4" />
                Начать AR Поиск
              </Button>
              {!modelLoaded && !backendError && (
                <p className="text-amber-500 text-sm mt-2">Загрузка модели TensorFlow.js...</p>
              )}
              {backendError && (
                <p className="text-red-500 text-sm mt-2">{backendError}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div
        className="relative w-[70vw] h-[100vh] max-w-[500px] mx-auto"
        style={{ display: arActive ? "block" : "none" }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg shadow-lg"
          style={{ zIndex: 1 }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: 2 }}
          onClick={handleCanvasClick}
        />
        <div className="absolute top-2 right-2" style={{ zIndex: 3 }}>
          <Button
            onClick={stopAR}
            variant="destructive"
            size="sm"
            className="rounded-full shadow-md"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {selectedJob && (
          <Card
            className="absolute bottom-2 left-2 right-2 bg-white/95 shadow-lg rounded-lg"
            style={{ zIndex: 3 }}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-lg font-bold text-primary">{selectedJob.title}</h2>
                  <p className="text-sm text-gray-600">{selectedJob.company}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary text-white text-xs">
                    {selectedJob.distance}
                  </Badge>
                  <Button
                    onClick={() => setSelectedJob(null)}
                    variant="ghost"
                    size="sm"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{selectedJob.salary}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{selectedJob.type}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {selectedJob.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              {!showApplyForm && !applicationSubmitted && (
                <Button
                  onClick={() => setShowApplyForm(true)}
                  className="w-full bg-primary hover:bg-primary/90 text-sm"
                >
                  Подать Заявку
                </Button>
              )}
              {showApplyForm && !applicationSubmitted && (
                <form onSubmit={handleApply} className="space-y-3">
                  <div>
                    <Label htmlFor="name" className="text-xs">
                      Полное Имя
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs">
                      Электронная Почта
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-xs">
                      Номер Телефона
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowApplyForm(false)}
                      className="flex-1 text-sm"
                    >
                      Отмена
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-primary hover:bg-primary/90 text-sm"
                    >
                      Отправить
                    </Button>
                  </div>
                </form>
              )}
              {applicationSubmitted && (
                <div className="text-center py-3">
                  <Check className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <h3 className="text-sm font-medium">Заявка Отправлена!</h3>
                  <Button
                    onClick={resetApplication}
                    className="mt-3 bg-primary hover:bg-primary/90 text-sm"
                  >
                    Найти Другие Вакансии
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {!arActive && (
        <Card className="mx-4 shadow-md">
          <CardHeader>
            <CardTitle>
              Вакансии в {city === "Almaty" ? "Алматы" : city === "Astana" ? "Астане" : "Шымкенте"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockJobs.map((job) => (
                <div
                  key={job.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => selectJob(job)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold">{job.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{job.company}</p>
                    </div>
                    <Badge className="bg-primary/10 text-primary">{job.distance}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div className="flex items-center text-gray-500 text-sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {job.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{job.tags.length - 2} еще
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <style jsx>{`
        body,
        html {
          margin: 0;
          padding: 0;
          height: 100vh;
          overflow: auto;
        }
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          border-radius: 0.5rem;
        }
        canvas {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  );
}