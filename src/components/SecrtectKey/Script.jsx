import React, { useState } from 'react';

const Script = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    setMessages([...messages, { text: input, user: 'You' }]);
    setInput('');
    // Simulate bot response
    setTimeout(() => setMessages([...messages, { text: input, user: 'You' }, { text: 'Hello from the bot!', user: 'Bot' }]), 500);
  };

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, width: '300px', background: 'white', border: '1px solid gray' }}>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ margin: 0, padding: '5px' }}>
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
        style={{ width: 'calc(100% - 60px)', padding: '5px' }}
      />
      <button onClick={handleSend} style={{ padding: '5px' }}>Send</button>
    </div>
  );
};



export default Script
