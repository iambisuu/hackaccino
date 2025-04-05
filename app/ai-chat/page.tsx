
'use client'
import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { 
  Cloud, 
  Activity, 
  TrendingUp, 
  BarChart2, 
  FileText, 
  Settings, 
  User, 
  Menu, 
  Mic, 
  Send 
} from 'lucide-react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Sidebar navigation items
  const sidebarItems = [
    { icon: <Cloud className="w-5 h-5" />, label: 'Weather Forecast' },
    { icon: <Activity className="w-5 h-5" />, label: 'Check for Disease' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Stock Analysis' },
    { icon: <BarChart2 className="w-5 h-5" />, label: 'Market Trends' },
    { icon: <FileText className="w-5 h-5" />, label: 'Investment Notes' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setIsLoading(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: `This is a simulated response to: "${input}"`, 
        sender: 'ai' 
      }]);
      setIsLoading(false);
    }, 1000);
    
    setInput('');
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser.');
      return;
    }
    
    setIsListening(!isListening);
    
    if (!isListening) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
      
      recognition.start();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Head>
        <title>IVAA - Virtual Assistant</title>
        <meta name="description" content="IVAA - Intelligent Virtual Agricultural Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg text-gray-800 p-4 hidden md:block">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-xl font-bold text-green-800">IVAA</h1>
        </div>
        
        <nav>
          <ul>
            {sidebarItems.map((item, index) => (
              <li key={index} className="mb-3">
                <a 
                  href="#" 
                  className="flex items-center p-2 rounded-lg hover:bg-green-50 transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <span className="mr-3 text-green-600">{item.icon}</span>
                  <span className="text-gray-700">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-gray-200">
          <a 
            href="#" 
            className="flex items-center p-2 rounded-lg hover:bg-green-50 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <User className="w-5 h-5 mr-3 text-green-600" />
            <span className="text-gray-700">Profile</span>
          </a>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="bg-white shadow-sm p-4 md:hidden">
          <div className="flex justify-between items-center">
            <button className="text-gray-600">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-green-800">IVAA</h1>
            <div className="w-6"></div> {/* Empty div for flex spacing */}
          </div>
        </header>
        
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-500">
              <div className="mb-4">
                <Activity className="h-16 w-16 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-green-800">How can I help you today?</h2>
              <p className="max-w-md">Ask me anything about weather, crops, market prices, or farming recommendations!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-green-600 text-white rounded-br-none' 
                        : 'bg-gray-100 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-150"></div>
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
              className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <Mic className="h-6 w-6" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border-2 border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:border-green-500"
            />
            <button 
              type="submit" 
              className="bg-green-600 text-white p-2 rounded-full disabled:opacity-50 hover:bg-green-700"
              disabled={!input.trim() || isLoading}
            >
              <Send className="h-6 w-6" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}