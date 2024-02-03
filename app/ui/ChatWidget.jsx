// app/ui/components/ChatWidget.tsx
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import { useState } from 'react';

const ChatWidget = () => {
  const [productType, setProductType] = useState('');

  const handleNewUserMessage = (newMessage) => {
    // Your chatbot logic here
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Chatbot"
      subtitle="Ask me about shoes, clothes, or accessories."
    />
  );
};

export default ChatWidget;
