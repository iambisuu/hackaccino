'use client'

import { useState, useRef, useEffect, FormEvent } from 'react';
import Head from 'next/head';

// Add proper type definitions for the Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Sidebar navigation items
  const sidebarItems = [
    { icon: '☁️', label: 'Weather Forecast' },
    { icon: '🩺', label: 'Check for Disease' },
    { icon: '📊', label: 'Market Trends' },
    { icon: '⚙️', label: 'Settings' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    setIsLoading(true);

    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: `This is a simulated response to: "${input}"`,
          sender: 'ai',
        },
      ]);
      setIsLoading(false);
    }, 1000);

    setInput('');
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser.');
      return;
    }

    setIsListening(!isListening);

    if (!isListening) {
      // Use the standard SpeechRecognition or the webkit prefixed version
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.start();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Head>
        <title>AI Chat Interface</title>
        <meta name="description" content="AI Chat Interface with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4 hidden md:block">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-xl font-bold">AI Assistant</h1>
        </div>

        <nav>
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index} className="mb-2">
                <a
                  href="#"
                  className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="mr-3 text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t border-gray-700">
          <a
            href="#"
            className="flex items-center p-2 rounded hover:bg-gray-700 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <span className="mr-3">👤</span>
            <span>Profile</span>
          </a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="bg-white shadow p-4 md:hidden">
          <div className="flex justify-between items-center">
            <button className="text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold">AI Assistant</h1>
            <div className="w-6"></div> {/* Empty div for flex spacing */}
          </div>
        </header>

        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
              <div className="text-6xl mb-4">🤖</div>
              <h2 className="text-2xl font-semibold mb-2">
                How can I help you today?
              </h2>
              <p className="max-w-md">
                Ask me anything about weather, health, stocks, or any other
                topic!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 p-3 rounded-lg rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="bg-white border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`p-2 rounded-full ${
                isListening
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border-2 border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-full disabled:opacity-50"
              disabled={!input.trim() || isLoading}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}