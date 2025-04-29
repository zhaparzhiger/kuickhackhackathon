"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Camera, X, Check } from "lucide-react";
import { useXP } from "@/components/xp-provider";

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
    distance: "0.2 km",
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
    distance: "0.3 km",
    type: "Full-time",
    tags: ["Figma", "Adobe XD", "Prototyping"],
  },
  {
    id: 3,
    title: "Barista",
    company: "Coffee House",
    location: "Almaty, KZ",
    salary: "35,000 KZT",
    lat: 43.2392,
    lon: 76.8895,
    distance: "0.4 km",
    type: "Part-time",
    tags: ["Customer Service", "Food Service"],
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "DataWorks",
    location: "Almaty, KZ",
    salary: "75,000 KZT",
    lat: 43.2385,
    lon: 76.889,
    distance: "0.5 km",
    type: "Full-time",
    tags: ["Python", "Machine Learning", "SQL"],
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "GrowthMarketing",
    location: "Almaty, KZ",
    salary: "50,000 KZT",
    lat: 43.2395,
    lon: 76.8905,
    distance: "0.6 km",
    type: "Full-time",
    tags: ["Digital Marketing", "SEO", "Content Strategy"],
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
  const [sceneLoaded, setSceneLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sceneRef = useRef<HTMLElement>(null);

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
        console.log("Camera started successfully");
        setArActive(true);
      } else {
        console.error("videoRef.current is null");
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
    setArActive(false);
    setSelectedJob(null);
    if (sceneRef.current) {
      const entities = sceneRef.current.querySelectorAll(".job-entity");
      entities.forEach((entity) => entity.remove());
    }
    console.log("AR experience stopped");
  };

  // Select a job
  const selectJob = (job: Job) => {
    setSelectedJob(job);
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

  // Load A-Frame and AR.js scripts
  useEffect(() => {
    const loadScripts = async () => {
      try {
        // Load A-Frame
        const aframeScript = document.createElement("script");
        aframeScript.src = "https://aframe.io/releases/1.5.0/aframe.min.js";
        aframeScript.async = true;
        document.head.appendChild(aframeScript);

        // Load AR.js
        const arjsScript = document.createElement("script");
        arjsScript.src = "https://cdn.jsdelivr.net/gh/jeromeetienne/AR.js@2.3.1/aframe/build/aframe-ar.min.js";
        arjsScript.async = true;
        document.head.appendChild(arjsScript);

        // Wait for A-Frame to be available
        const checkAFrame = () => {
          if (typeof window !== "undefined" && window.AFRAME) {
            console.log("A-Frame detected");
            setSceneLoaded(true);
          } else {
            console.log("A-Frame not yet loaded, retrying...");
            setTimeout(checkAFrame, 100);
          }
        };
        aframeScript.onload = checkAFrame;

        return () => {
          if (document.head.contains(aframeScript)) document.head.removeChild(aframeScript);
          if (document.head.contains(arjsScript)) document.head.removeChild(arjsScript);
        };
      } catch (err) {
        console.error("Error loading scripts:", err);
      }
    };

    loadScripts();
  }, []);

  // Initialize A-Frame and add job markers
  useEffect(() => {
    if (!sceneLoaded || !arActive || !sceneRef.current) {
      console.log("Initialization check:", { sceneLoaded, arActive, sceneRef: !!sceneRef.current });
      return;
    }

    console.log("A-Frame is loaded, registering components");

    // Register A-Frame component
    window.AFRAME.registerComponent("job-marker", {
      schema: { id: { type: "string" } },
      init: function () {
        this.el.addEventListener("click", () => {
          const job = mockJobs.find((j) => j.id === parseInt(this.data.id));
          if (job) {
            console.log("Job marker clicked:", job);
            document.dispatchEvent(
              new CustomEvent("job-selected", { detail: { job } })
            );
          }
        });
      },
    });

    // Add job markers
    console.log("Adding job markers to A-Frame scene");
    const existingEntities = sceneRef.current.querySelectorAll(".job-entity");
    existingEntities.forEach((entity) => entity.remove());

    const userLocation = { latitude: cityCoords[city][0], longitude: cityCoords[city][1] };

    mockJobs.forEach((job) => {
      const entity = document.createElement("a-entity");
      entity.classList.add("job-entity");
      entity.setAttribute("data-job-id", job.id.toString());

      const latOffset = (Math.random() - 0.5) * 0.002;
      const lonOffset = (Math.random() - 0.5) * 0.002;

      entity.setAttribute(
        "gps-entity-place",
        `latitude: ${userLocation.latitude + latOffset}; longitude: ${userLocation.longitude + lonOffset}`
      );

      entity.innerHTML = `
        <a-entity
          geometry="primitive: plane; width: 2; height: 1.2"
          material="color: white; opacity: 0.9"
          position="0 0 0"
          rotation="0 0 0"
          scale="1 1 1"
          job-marker="id: ${job.id}"
        >
          <a-text
            value="${job.title}"
            align="center"
            color="#4F46E5"
            position="0 0.4 0.01"
            scale="0.5 0.5 0.5"
          ></a-text>
          <a-text
            value="${job.company}"
            align="center"
            color="#000"
            position="0 0.2 0.01"
            scale="0.4 0.4 0.4"
          ></a-text>
          <a-text
            value="${job.salary}"
            align="center"
            color="#000"
            position="0 0 0.01"
            scale="0.4 0.4 0.4"
          ></a-text>
          <a-text
            value="${job.distance}"
            align="center"
            color="#000"
            position="0 -0.2 0.01"
            scale="0.3 0.3 0.3"
          ></a-text>
        </a-entity>
      `;

      sceneRef.current.appendChild(entity);
      console.log(`Added job marker for ${job.title}`);
    });

    const updateEntities = () => {
      if (sceneRef.current) {
        sceneRef.current.querySelectorAll(".job-entity a-entity").forEach((entity) => {
          entity.setAttribute("look-at", "[gps-camera]");
        });
      }
    };
    const interval = setInterval(updateEntities, 1000);

    const handleJobSelect = (e: Event) => {
      const event = e as CustomEvent<{ job: Job }>;
      selectJob(event.detail.job);
      setShowApplyForm(true);
    };

    document.addEventListener("job-selected", handleJobSelect);

    return () => {
      document.removeEventListener("job-selected", handleJobSelect);
      clearInterval(interval);
    };
  }, [sceneLoaded, arActive, city]);

  // Debug sceneRef and videoRef
  useEffect(() => {
    console.log("Debug refs:", { sceneRef: sceneRef.current, videoRef: videoRef.current });
  }, [arActive, sceneLoaded]);

  return (
    <div className="w-full min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-primary px-4">AR Поиск Работы</h1>

      {!arActive && (
        <Card className="mb-6 mx-4">
          <CardHeader>
            <CardTitle>Найти Работу в Дополненной Реальности</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Испытайте новый способ поиска работы! Направьте камеру, чтобы увидеть доступные вакансии в вашем районе.
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
              <Button onClick={startAR} className="w-full bg-primary hover:bg-primary/90" disabled={!sceneLoaded}>
                <Camera className="mr-2 h-4 w-4" />
                Начать AR Поиск
              </Button>
              {!sceneLoaded && <p className="text-amber-500 text-sm mt-2">Загрузка AR сцены...</p>}
            </div>
          </CardContent>
        </Card>
      )}

      <div className={`relative w-full h-screen ${arActive ? "block" : "hidden"}`}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ zIndex: 9998 }}
        />
        <a-scene
          ref={sceneRef}
          vr-mode-ui="enabled: false"
          embedded
          arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false; trackingMethod: best;"
          renderer="logarithmicDepthBuffer: true;"
          className="absolute top-0 left-0 w-full h-full"
          style={{ zIndex: 9999 }}
        >
          <a-camera gps-camera rotation-reader />
        </a-scene>
        {arActive && (
          <div className="absolute top-4 right-4" style={{ zIndex: 10000 }}>
            <Button onClick={stopAR} variant="destructive" size="sm" className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {selectedJob && (
          <Card className="absolute bottom-4 left-4 right-4" style={{ zIndex: 10000 }}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="text-xl font-bold">{selectedJob.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300">{selectedJob.company}</p>
                </div>
                <Badge className="bg-primary text-white">{selectedJob.distance}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center text-gray-500">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{selectedJob.location}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{selectedJob.salary}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{selectedJob.type}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedJob.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary">
                    {tag}
                  </Badge>
                ))}
              </div>
              {!showApplyForm && !applicationSubmitted && (
                <Button onClick={() => setShowApplyForm(true)} className="w-full bg-primary hover:bg-primary/90">
                  Подать Заявку
                </Button>
              )}
              {showApplyForm && !applicationSubmitted && (
                <form onSubmit={handleApply} className="space-y-3">
                  <div>
                    <Label htmlFor="name">Полное Имя</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Электронная Почта</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Номер Телефона</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowApplyForm(false)}
                      className="flex-1"
                    >
                      Отмена
                    </Button>
                    <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                      Отправить Заявку
                    </Button>
                  </div>
                </form>
              )}
              {applicationSubmitted && (
                <div className="text-center py-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">Заявка Отправлена!</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Ваша заявка на {selectedJob.title} в {selectedJob.company} успешно отправлена.
                  </p>
                  <Button onClick={resetApplication} className="bg-primary hover:bg-primary/90">
                    Найти Другие Вакансии
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {!arActive && (
        <Card className="mx-4">
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
        body, html {
          margin: 0;
          padding: 0;
          height: 100vh;
          overflow: auto;
        }
        video {
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          display: block;
        }
        .ar-scene {
          width: 100vw !important;
          height: 100vh !important;
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          background: transparent !important;
          display: block !important;
        }
        .job-entity {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}