/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Send, MoreVertical, Video, Search, Archive, Settings } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface Message {
  text: string;
  timestamp: number;
  isOutgoing: boolean;
}

interface Chat {
  phoneNumber: string;
  messages: Message[];
}

interface ChatProps {
  credentials: {
    idInstance: string;
    apiTokenInstance: string;
  };
}

const Chat = ({ credentials }: ChatProps) => {
  const chatsKey = `chats_${credentials.idInstance}`;
  const activeChatKey = `activeChat_${credentials.idInstance}`;

  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<Record<string, Chat>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [activeChatNumber, setActiveChatNumber] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('credentials', JSON.stringify(credentials));
  }, [credentials]);

  useEffect(() => {
    const savedChats = localStorage.getItem(chatsKey);
    const savedActiveChatNumber = localStorage.getItem(activeChatKey);

    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }

    if (savedActiveChatNumber) {
      setActiveChatNumber(savedActiveChatNumber);
    }
  }, [chatsKey, activeChatKey]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats, activeChatNumber]);

  const startChat = () => {
    if (!phoneNumber.match(/^\d+$/)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter only numbers without any special characters",
        variant: "destructive",
      });
      return;
    }

    const formattedNumber = phoneNumber.replace(/\D/g, '');

    if (!chats[formattedNumber]) {
      setChats(prev => ({
        ...prev,
        [formattedNumber]: {
          phoneNumber: formattedNumber,
          messages: []
        }
      }));
    }

    setActiveChatNumber(formattedNumber);
    setPhoneNumber("");

    toast({
      title: "Chat started",
      description: `Connected to ${formattedNumber}`,
    });
  };

  const sendMessage = async () => {
    if (!message.trim() || !activeChatNumber) return;

    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://7103.api.greenapi.com/waInstance${credentials.idInstance}/sendMessage/${credentials.apiTokenInstance}`,
        {
          chatId: `${activeChatNumber}@c.us`,
          message: message.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.data && response.data.idMessage) {
        const newMessage: Message = {
          text: message.trim(),
          timestamp: Date.now(),
          isOutgoing: true,
        };

        setChats(prev => ({
          ...prev,
          [activeChatNumber]: {
            ...prev[activeChatNumber],
            messages: [...prev[activeChatNumber].messages, newMessage]
          }
        }));

        setMessage("");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error: any) {
      console.error("Send message error:", error);
      let errorDescription = "Please check your credentials and try again";
      if (error.response) {
        errorDescription = `Server responded with status ${error.response.status}: ${error.response.data.message || error.response.data.error}`;
      } else if (error.message) {
        errorDescription = error.message;
      }
      toast({
        title: "Error sending message",
        description: errorDescription,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const checkNewMessages = async () => {
      if (!credentials.idInstance || !credentials.apiTokenInstance) return;

      try {
        const response = await axios.get(
          `https://7103.api.greenapi.com/waInstance${credentials.idInstance}/receiveNotification/${credentials.apiTokenInstance}?receiveTimeout=5`
        );
        console.log(response.data);

        if (response.data && response.data.body) {
          const { receiptId, body } = response.data;

          if (
            body.typeWebhook === "incomingMessageReceived" ||
            body.typeWebhook === "outgoingAPIMessageReceived" ||
            body.typeWebhook === "outgoingMessageReceived"
          ) {
            let text = "";
            if (body.messageData?.textMessageData?.textMessage) {
              text = body.messageData.textMessageData.textMessage;
            } else if (body.messageData?.extendedTextMessageData?.text) {
              text = body.messageData.extendedTextMessageData.text;
            }

            if (text) {
              const senderNumber = body.senderData?.sender?.replace("@c.us", "");
              if (senderNumber) {
                const newMessage: Message = {
                  text,
                  timestamp: body.timestamp ? body.timestamp * 1000 : Date.now(),
                  isOutgoing: body.typeWebhook === "outgoingAPIMessageReceived",
                };

                setChats(prev => {
                  const chat = prev[senderNumber] || { phoneNumber: senderNumber, messages: [] };
                  return {
                    ...prev,
                    [senderNumber]: {
                      ...chat,
                      messages: [...chat.messages, newMessage],
                    },
                  };
                });
              }
            }
          }

          if (receiptId) {
            await axios.delete(
              `https://7103.api.greenapi.com/waInstance${credentials.idInstance}/deleteNotification/${credentials.apiTokenInstance}/${receiptId}`
            );
          }
        }
      } catch (error) {
        console.error("Error checking messages:", error);
      }
    };

    intervalId = setInterval(checkNewMessages, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [credentials]);

  const activeChat = activeChatNumber ? chats[activeChatNumber] : null;

  useEffect(() => {
    localStorage.setItem(chatsKey, JSON.stringify(chats));
  }, [chats, chatsKey]);

  useEffect(() => {
    localStorage.setItem(activeChatKey, activeChatNumber);
  }, [activeChatNumber, activeChatKey]);

  const handleLogout = () => {
    localStorage.removeItem('credentials');
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex bg-[#f0f2f5]">
      {/* Left Sidebar */}
      <div className="w-[400px] flex flex-col border-r border-gray-200 bg-white">
        {/* Header */}
        <div className="h-[60px] bg-[#f0f2f5] flex items-center justify-between px-4 border-r border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <span className="font-semibold">WhatsApp</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-600">
            <Archive className="w-5 h-5 cursor-pointer" />
            <Video className="w-5 h-5 cursor-pointer" />
            <MoreVertical className="w-5 h-5 cursor-pointer" />
            <Button onClick={handleLogout} className="bg-red-500 text-white px-2 py-1 rounded">
              Выход
            </Button>
          </div>
        </div>

        {/* Search and New Chat */}
        <div className="p-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter phone number (e.g., 79001234567)"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full pl-10 bg-[#f0f2f5] border-none"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <Button
            onClick={startChat}
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white transition-colors"
            disabled={!phoneNumber}
          >
            Start Chat
          </Button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {Object.entries(chats).map(([number, chat]) => (
            <div
              key={number}
              onClick={() => setActiveChatNumber(number)}
              className={`flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-100 ${
                activeChatNumber === number ? 'bg-[#f0f2f5]' : ''
              }`}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
              <div className="flex-1">
                <p className="font-semibold">+{number}</p>
                <p className="text-sm text-gray-500">
                  {chat.messages[chat.messages.length - 1]?.text.substring(0, 30) || 'Start chatting'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#efeae2] relative">
        {activeChatNumber ? (
          <>
            {/* Chat Header */}
            <div className="h-[60px] bg-[#f0f2f5] flex items-center justify-between px-4 border-l border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <span className="font-semibold">+{activeChatNumber}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Search className="w-5 h-5 cursor-pointer" />
                <MoreVertical className="w-5 h-5 cursor-pointer" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeChat?.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.isOutgoing ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[60%] p-3 rounded-lg ${
                      msg.isOutgoing
                        ? "bg-[#d9fdd3] text-black rounded-tr-none"
                        : "bg-white text-black rounded-tl-none"
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                    <p className="text-[11px] text-gray-500 text-right mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 bg-[#f0f2f5]">
              <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2">
                <Input
                  type="text"
                  placeholder="Type a message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !isLoading && sendMessage()}
                  className="flex-1 border-none focus:ring-0"
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !message.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10 p-0 flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 bg-[#f0f2f5]">
            <div className="text-center">
              <Settings className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg">Enter a phone number to start chatting</p>
              <p className="text-sm text-gray-400">Messages are end-to-end encrypted</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
