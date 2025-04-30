"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, X, Check, Camera, ArrowLeft, ArrowRight } from "lucide-react";
import jobsData from "@/public/vacancies/jobs.json";

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
  bearing?: number;
  inRange?: boolean;
}

// City coordinates
const cityCoords: { [key: string]: [number, number] } = {
  Pavlodar: [52.2976, 76.9360],
  Almaty: [43.2389, 76.8897],
  Astana: [51.1694, 71.4491],
  Shymkent: [42.3167, 69.5901],
};

// Вычисление расстояния между двумя точками
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3; // Радиус Земли в метрах
  const toRadians = (deg: number) => (deg * Math.PI) / 180;

  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Расстояние в метрах
};

// Вычисление азимута между двумя точками
const calculateBearing = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const toDegrees = (rad: number) => (rad * 180) / Math.PI;

  const dLon = toRadians(lon2 - lon1);
  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);

  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  const bearing = toDegrees(Math.atan2(y, x));
  return (bearing + 360) % 360;
};

// Простая проверка направления (упрощенная модель)
const getDirectionIndicator = (bearing: number): { icon: JSX.Element; text: string } => {
  // Упрощенная модель: делим направления на 4 сектора
  if (bearing >= 315 || bearing < 45) {
    return { icon: <ArrowLeft className="h-6 w-6" />, text: "Поверните налево" };
  } else if (bearing >= 45 && bearing < 135) {
    return { icon: <ArrowRight className="h-6 w-6" />, text: "Прямо" };
  } else if (bearing >= 135 && bearing < 225) {
    return { icon: <ArrowRight className="h-6 w-6" />, text: "Поверните направо" };
  } else {
    return { icon: <ArrowLeft className="h-6 w-6" />, text: "Поверните назад" };
  }
};

export default function ARJobSearch() {
  const [city, setCity] = useState<string>("Pavlodar");
  const [arActive, setArActive] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyForm, setShowApplyForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Инициализация вакансий
  const [jobs, setJobs] = useState<Job[]>(
    jobsData.jobs.map((job) => ({
      ...job,
      distance: "0 m",
      inRange: false,
      bearing: 0,
    }))
  );

  // Получение геолокации
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setUserLocation(newLocation);
          console.log("User Location:", newLocation);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          setCameraError("Не удалось получить геолокацию. Пожалуйста, разрешите доступ.");
        },
        { enableHighAccuracy: true }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setCameraError("Геолокация не поддерживается вашим устройством.");
    }
  }, []);

  // Обновление расстояний и направлений
  useEffect(() => {
    if (userLocation) {
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lon,
            job.lat,
            job.lon
          );
          const bearing = calculateBearing(
            userLocation.lat,
            userLocation.lon,
            job.lat,
            job.lon
          );
          return {
            ...job,
            distance: `${Math.round(distance)} m`,
            inRange: distance <= 500, // Радиус действия 500 метров
            bearing,
          };
        })
      );
    }
  }, [userLocation]);

  // Handle city change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  // Start AR experience
  const startAR = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setArActive(true);
        console.log("AR mode activated successfully");
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
                <option value="Pavlodar">Павлодар</option>
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
        <Button
          onClick={stopAR}
          size="sm"
          className="absolute top-2 right-2 rounded-full shadow-md bg-red-500 hover:bg-red-600 text-white"
          style={{ zIndex: 1000 }}
        >
          <X className="h-4 w-4" />
        </Button>

        {cameraError && arActive && (
          <div className="absolute top-12 left-2 right-2 text-red-500 text-sm bg-white p-2 rounded-lg shadow-md">
            {cameraError}
          </div>
        )}

        {/* Отображение вакансий в радиусе действия */}
        {arActive && userLocation && (
          <div className="absolute bottom-2 left-2 right-2 space-y-2 max-h-[50vh] overflow-y-auto">
            {jobs.map((job) => {
              if (job.inRange) {
                return (
                  <Card
                    key={job.id}
                    className="shadow-lg rounded-xl bg-blue-500 text-white"
                    onClick={() => selectJob(job)}
                  >
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-lg font-semibold">{job.title}</h2>
                          <p className="text-sm opacity-90">{job.company}</p>
                        </div>
                        <Badge className="bg-blue-700 text-white shadow-sm">
                          {job.distance}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              } else {
                // Показываем стрелку направления для вакансий вне радиуса
                const direction = getDirectionIndicator(job.bearing || 0);
                return (
                  <Card
                    key={job.id}
                    className="shadow-lg rounded-xl bg-gray-200 text-gray-900"
                  >
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <h2 className="text-sm font-semibold">{job.title}</h2>
                        <p className="text-xs">{job.distance}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">{direction.text}</span>
                        {direction.icon}
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>
        )}

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
              Вакансии в {city === "Pavlodar" ? "Павлодаре" : city === "Almaty" ? "Алматы" : city === "Astana" ? "Астане" : "Шымкенте"}
            </h2>
          </div>
          <CardContent>
            <div className="space-y-3">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="p-3 border rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer transition-colors"
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
      `}</style>
    </div>
  );
}