"use client";

import { useState } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { useVoiceCommands } from "@/hooks/use-voice-commands";

export function VoiceCommandWidget() {
  const [lastCommand, setLastCommand] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  const handleVoiceCommand = (command: string) => {
    setLastCommand(command);
    setCommandHistory((prev) => [command, ...prev.slice(0, 4)]);

    if (command.includes("weather")) {
      speak("Showing weather information");
    } else if (command.includes("news")) {
      speak("Displaying latest news");
    } else if (command.includes("crypto")) {
      speak("Showing cryptocurrency rates");
    } else if (command.includes("todo") || command.includes("task")) {
      speak("Opening your to-do list");
    } else {
      speak(
        "Command not recognized. Try saying weather, news, crypto, or todo."
      );
    }
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const { isListening, startListening, stopListening, isSupported } =
    useVoiceCommands(handleVoiceCommand);

  if (!isSupported) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-2 mb-4">
          <MicOff className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Voice Commands</h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Voice commands are not supported in your browser.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="h-5 w-5" />
        <h3 className="text-lg font-semibold">Voice Commands</h3>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-center">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`rounded-full h-16 w-16 flex items-center justify-center transition-all duration-300 ${
              isListening
                ? "bg-red-600 hover:bg-red-700 animate-pulse"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isListening ? (
              <MicOff className="h-8 w-8" />
            ) : (
              <Mic className="h-8 w-8" />
            )}
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isListening ? "Listening..." : "Click to start voice command"}
          </p>
          {lastCommand && (
            <p className="text-sm font-medium mt-2">
              Last command: "{lastCommand}"
            </p>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Try saying:</h4>
          <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
            <li>• "Show weather"</li>
            <li>• "Latest news"</li>
            <li>• "Crypto prices"</li>
            <li>• "My todo list"</li>
          </ul>
        </div>

        {commandHistory.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent commands:</h4>
            <div className="space-y-1">
              {commandHistory.map((cmd, index) => (
                <p
                  key={index}
                  className="text-xs text-gray-600 dark:text-gray-400"
                >
                  "{cmd}"
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
