
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
interface LoginProps {
  onLogin: (credentials: { idInstance: string; apiTokenInstance: string }) => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const handleLogin = () => {
    if (idInstance && apiTokenInstance) {
      onLogin({ idInstance, apiTokenInstance });
      navigate('/chat');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-in fade-in-50 duration-500">
      <CardHeader className="text-center">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to WhatsApp Sender</h1>
        <p className="text-gray-500 mt-2">Enter your GREEN-API credentials to continue</p>
      </CardHeader>
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="idInstance">
              ID Instance
            </label>
            <Input
              id="idInstance"
              type="text"
              placeholder="Enter your ID Instance"
              value={idInstance}
              onChange={(e) => setIdInstance(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700" htmlFor="apiToken">
              API Token Instance
            </label>
            <Input
              id="apiToken"
              type="password"
              placeholder="Enter your API Token"
              value={apiTokenInstance}
              onChange={(e) => setApiTokenInstance(e.target.value)}
              required
              className="w-full"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Login;
