"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, X, Check, Camera } from "lucide-react";

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
  alpha?: number;
  floatOffset?: number;
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
    alpha: 1,
    floatOffset: 0,
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
    alpha: 1,
    floatOffset: 0,
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
  const [formData, setFormData] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Handle city change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  // Start AR experience with webcam
  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setArActive(true);
        animateMarkers();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraError("Не удалось получить доступ к камере. Пожалуйста, разрешите доступ.");
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
    setCameraError(null);
  };

  // Select a job
  const selectJob = (job: Job) => {
    setSelectedJob(job);
    setShowApplyForm(false);
  };

  // Handle apply form submission
  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApplicationSubmitted(true);
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
    setFormData({ name: "", email: "" });
  };

  // Animate job markers over webcam feed
  const animateMarkers = () => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(videoRef.current!, 0, 0, canvas.width, canvas.height);

      mockJobs.forEach((job, index) => {
        const x = canvas.width / 2;
        const y = canvas.height / 2 - (index * 120);
        const markerWidth = 160;
        const markerHeight = 100;
        const floatOffset = Math.sin(Date.now() / 500 + index) * 5;

        // Highlight UX/UI Designer
        ctx.fillStyle = job.title === "UX/UI Designer" ? "rgba(59, 130, 246, 0.9)" : "rgba(255, 255, 255, 0.9)";
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.roundRect(x - markerWidth / 2, y - markerHeight / 2 + floatOffset, markerWidth, markerHeight, 12);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = job.title === "UX/UI Designer" ? "#ffffff" : "#1e3a8a";
        ctx.font = "bold 16px Roboto, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(job.title, x, y - 20 + floatOffset);
        ctx.fillStyle = "#4b5563";
        ctx.font = "14px Roboto, sans-serif";
        ctx.fillText(job.company, x, y + floatOffset);
        ctx.fillText(`${job.salary} | ${job.distance}`, x, y + 20 + floatOffset);

        // Update marker bounds for click detection
        (job as any).markerBounds = {
          x: x - markerWidth / 2,
          y: y - markerHeight / 2 + floatOffset,
          width: markerWidth,
          height: markerHeight,
        };
      });

      animationFrameIdRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  // Handle canvas click with improved detection
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAR();
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 px-4 pt-4">AR Поиск Работы</h1>

      {!arActive && (
        <Card className="mb-4 mx-4 shadow-md rounded-xl bg-white dark:bg-gray-800">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Найти Работу в AR</h2>
          </div>
          <CardContent>
            <div className="mb-3">
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Используйте камеру, чтобы увидеть вакансии вокруг вас!
              </p>
              <Label htmlFor="city">Город</Label>
              <select
                id="city"
                className="w-full mt-1 p-2 rounded-lg border bg-white text-gray-900 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-400"
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
              className="w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg shadow-md"
            >
              <Camera className="mr-2 h-4 w-4" />
              Начать AR Поиск
            </Button>
            {cameraError && <p className="text-red-500 text-sm mt-2">{cameraError}</p>}
          </CardContent>
        </Card>
      )}

      <div
        className="relative w-[70vw] max-w-[500px] mx-auto h-[90vh]"
        style={{ display: arActive ? "block" : "none" }}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-lg"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          onClick={handleCanvasClick}
        />
        <Button
          onClick={stopAR}
          size="sm"
          className="absolute top-2 right-2 rounded-full shadow-md bg-red-500 hover:bg-red-600 text-white"
        >
          <X className="h-4 w-4" />
        </Button>

        {selectedJob && (
          <Card className="absolute bottom-2 left-2 right-2 shadow-lg rounded-xl max-h-[50vh] overflow-y-auto bg-blue-500 text-white">
            <CardContent className="p-3 relative">
              <Button
                onClick={() => setSelectedJob(null)}
                size="sm"
                className="absolute top-2 right-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="mb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold">{selectedJob.title}</h2>
                    <p className="text-sm opacity-90">{selectedJob.company}</p>
                  </div>
                  <Badge className="bg-blue-700 text-white shadow-sm">
                    {selectedJob.distance}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2 text-sm opacity-90">
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
              <div className="flex flex-wrap gap-1 mb-2">
                {selectedJob.tags.map((tag) => (
                  <Badge key={tag} className="text-xs bg-blue-700 text-white shadow-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              {!showApplyForm && !applicationSubmitted && (
                <Button
                  onClick={() => setShowApplyForm(true)}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md"
                >
                  Подать Заявку
                </Button>
              )}
              {showApplyForm && !applicationSubmitted && (
                <form onSubmit={handleApply} className="space-y-2">
                  <div>
                    <Label htmlFor="name" className="text-white">Имя</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="bg-blue-100 text-gray-900 rounded-lg p-1.5 focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="bg-blue-100 text-gray-900 rounded-lg p-1.5 focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      onClick={() => setShowApplyForm(false)}
                      className="flex-1 bg-transparent border-blue-200 text-white hover:bg-blue-600 rounded-lg shadow-md"
                    >
                      Отмена
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md"
                    >
                      Отправить
                    </Button>
                  </div>
                </form>
              )}
              {applicationSubmitted && (
                <div className="text-center py-2">
                  <Check className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <h3 className="text-sm font-semibold">Заявка Отправлена!</h3>
                  <Button
                    onClick={resetApplication}
                    className="mt-2 w-full bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-md"
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
        <Card className="mx-4 shadow-md rounded-xl bg-white dark:bg-gray-800">
          <div className="p-4">
            <h2 className="text-lg font-semibold">
              Вакансии в {city === "Almaty" ? "Алматы" : city === "Astana" ? "Астане" : "Шымкенте"}
            </h2>
          </div>
          <CardContent>
            <div className="space-y-3">
              {mockJobs.map((job) => (
                <div
                  key={job.id}
                  className={`p-3 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors ${
                    job.title === "UX/UI Designer" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""
                  }`}
                  onClick={() => selectJob(job)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{job.company}</p>
                    </div>
                    <Badge className="bg-blue-500 text-white shadow-sm">
                      {job.distance}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {job.tags.map((tag) => (
                      <Badge key={tag} className="text-xs bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white shadow-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <style jsx>{`
        body, html {
          margin: 0;
          padding: 0;
          font-family: 'Roboto', sans-serif;
        }
        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 12px;
        }
        canvas {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 12px;
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        @keyframes slide-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}