// pages/index.js
"use client"
// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Navbar from '../components/Navbar';

interface ChatMessage {
  role: 'user' | 'chatbot';
  content: string;
}

const Home = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Display initial message from chatbot when component mounts
    handleGetStarted();
  }, []); // Empty dependency array ensures this runs only once

  const handleUserInput = () => {
    // Add user input to chat history
    const updatedChatHistory: ChatMessage[] = [...chatHistory, { role: 'user', content: userInput }];

    // Start loading state
    setIsLoading(true);

    // Process user input and generate a response
    setTimeout(() => {
      let response = '';

      if (!started) {
        response = "Hey, what would you like to buy today?";
        setStarted(true);
      } else {
        response = generateChatbotResponse(userInput);
      }

      // Add user input and chatbot response to chat history
      setChatHistory([...updatedChatHistory, { role: 'chatbot', content: response }]);

      // Clear user input
      setUserInput('');

      // End loading state
      setIsLoading(false);
    }, 1000); // Simulating a delay for loading purposes
  };

  const generateChatbotResponse = (userInput: string) => {
    // Simulate chatbot response based on user input
    switch (userInput.toLowerCase()) {
      case 'shoes':
        return 'Sure, let me show you our latest shoe collection. What type of shoes are you looking for?';
      case 'clothes':
        return 'Great! We have a wide range of clothing options. Can you specify the type or any specific preferences?';
      case 'accessories':
        return 'Awesome! We have a variety of accessories available. What kind of accessories are you interested in?';
      default:
        return "I'm sorry, I didn't understand that. Please choose from shoes, clothes, or accessories.";
    }
  };

  // Function to handle the initial message when "Get Started" is clicked
  const handleGetStarted = () => {
    if (!started) {
      setChatHistory([{ role: 'chatbot', content: "Hey, what would you like to buy today?" }]);
      setStarted(true);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      <Head>
        <title>Lemonade</title>
        <meta name="description" content="Personal Choice Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen">
        {/* Heading and Subheading */}
        <h1 className="text-4xl font-cursive mb-2 text-gray-800">Lemonade</h1>
        <h4 className="text-lg text-gray-600 mb-4">Personal Choice Assistant</h4>

        <div className="max-w-md border p-4 rounded-md mb-4">
          {/* Display Chat History */}
          {chatHistory.map((message, index) => (
            <div key={index} className={`p-3 mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              {/* Chatbot's Chat */}
              {message.role === 'chatbot' && (
                <div className="bg-gray-800 p-2 rounded-md inline-block">
                  {message.content.split('').map((letter, letterIndex) => (
                    <span key={letterIndex} className={`typing-animation-${letterIndex}`}>
                      {letter}
                    </span>
                  ))}
                </div>
              )}

              {/* User's Chat */}
              {message.role === 'user' && (
                <div className="bg-gray-800 p-2 rounded-md inline-block">
                  {message.content}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* User Input Field */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-2 py-1 border rounded-md focus:outline-none focus:border-blue-500 text-black"
          />
          <button
            onClick={() => { handleUserInput(); handleGetStarted(); }}
            disabled={!userInput || isLoading}
            className={`bg-pink-500 text-white px-4 py-2 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600 transition duration-300'}`}
          >
            {isLoading ? 'Loading...' : 'Send'}
          </button>
        </div>

        
      </main>

  <Navbar/>
    </div>
  );
};

export default Home;
