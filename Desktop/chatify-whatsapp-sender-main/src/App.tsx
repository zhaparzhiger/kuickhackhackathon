/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Login from "./components/Login";
import Chat from "./components/Chat";

const queryClient = new QueryClient();

const App = () => {
  const [credentials, setCredentials] = useState<{
    idInstance: string;
    apiTokenInstance: string;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCredentials = localStorage.getItem('credentials');
    if (savedCredentials) {
      setCredentials(JSON.parse(savedCredentials));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login onLogin={setCredentials} />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute credentials={credentials}>
                  <Chat credentials={credentials} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const ProtectedRoute = ({ credentials, children }: { credentials: any; children: JSX.Element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!credentials) {
      navigate("/login");
    }
  }, [credentials, navigate]);

  return credentials ? children : null;
};

export default App;