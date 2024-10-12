import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loadar from "../components/Loadar";
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
const genAI = new GoogleGenerativeAI("AIzaSyBbPIc3uMQzWWvEgyXg8h56GNGRNiHMHKE");
let chat;

export default function AIPage() {
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Got it! I'll do my best to answer your questions.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetch = async (message) => {
    let result = await chat.sendMessage(message);
    console.log(chat.getHistory());

    return result.response.text();
  };

  const handleSend = async () => {
    setLoading(true);
    if (input.trim()) {
      const userMessage = { role: "user", text: input };
      setMessages([...messages, userMessage]);
      setInput("");

      const modelResponse = await fetch(input);
      const modelMessage = { role: "model", text: modelResponse };
      setMessages([...messages, userMessage, modelMessage]);
      setLoading(false);
    }
  };

  const handleSpeak = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speech.voice = speechSynthesis.getVoices()[191];
    window.speechSynthesis.speak(speech);
  };

  React.useEffect(() => {
    const initializeChat = async () => {
      const model = await genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: "hey listen you have to answer the question related to education ,subject and course nothing else okay?",
              },
            ],
          },
          {
            role: "model",
            parts: [
              { text: "Got it! I'll do my best to answer your questions." },
            ],
          },
        ],
      });
    };

    initializeChat();
  }, []);

  return (
    <div className="sm:w-4/5 w-full mx-auto  h-full my-4 shadow-lg  ">
      <div className="mb-4  p-4 flex flex-wrap gap-y-4  justify-around">
        <h1 className="text-2xl  font-bold text-gray-800 p-y-4 text-center">
          AI Chatbot
        </h1>
        <div className="w-full">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.role === "model" ? "text-left py-2" : "text-right py-2"
              }`}
            >
                {message.role === "user" && <VolumeUpOutlinedIcon className="mr-2" 
                onClick={() => handleSpeak(message.text)}
                />}
              <p
                className={`${
                  message.role === "model"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-blue-500 text-white"
                } p-2 rounded-lg inline-block`}
              >
                {message.text}
              </p>
              {message.role === "model" && <VolumeUpOutlinedIcon className="ml-2"
                onClick={() => handleSpeak(message.text)}
               />}

            </div>
          ))}
        </div>
        <div
          className="
            flex flex-row  w-full gap-x-2  justify-around
            "
        >
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            label="Message"
            variant="outlined"
            fullWidth
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message here"
          />
          {loading ? (
            <Loadar />
          ) : (
            <Button
              onClick={handleSend}
              variant="contained"
              color="primary"
              className="mt-2"
            >
              Send
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
