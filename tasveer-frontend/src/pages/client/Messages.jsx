import React, { useState } from 'react';

const Messages = ({ conversationsData = [] }) => {

  const [activeChat, setActiveChat] = useState(0);
  const [message, setMessage] = useState("");
  const [conversations, setConversations] = useState(conversationsData);

  const currentChat = conversations[activeChat];

  // ✅ SEND MESSAGE
  const handleSend = () => {

    if (!message.trim()) return;

    const updated = [...conversations];

    updated[activeChat].messages.push({
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString()
    });

    setConversations(updated);
    setMessage("");
  };

  return (
    <div className="h-[80vh] max-w-7xl mx-auto flex gap-6 p-8">

      {/* CONTACT LIST */}
      <div className="w-1/3 glass-panel rounded-[3rem] border-white/5 overflow-hidden flex flex-col">

        <div className="p-8 border-b border-white/5">
          <h3 className="text-xl font-display text-[#D4AF37]">Messages</h3>
        </div>

        <div className="flex-grow overflow-y-auto">

          {conversations.length > 0 ? (

            conversations.map((c, i) => (

              <div 
                key={i} 
                onClick={() => setActiveChat(i)}
                className={`p-8 cursor-pointer transition-all border-b border-white/[0.02] ${
                  activeChat === i 
                    ? 'bg-[#D4AF37]/5 border-r-2 border-r-[#D4AF37]' 
                    : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h5 className="font-bold text-white text-sm">{c.name}</h5>
                  <span className="text-[10px] text-white/20">{c.time}</span>
                </div>
                <p className="text-xs text-white/40 truncate">
                  {c.messages?.[c.messages.length - 1]?.text}
                </p>
              </div>

            ))

          ) : (
            <p className="text-white/30 text-center py-10 text-sm">
              No conversations
            </p>
          )}

        </div>

      </div>

      {/* CHAT WINDOW */}
      <div className="flex-grow glass-panel rounded-[3rem] border-white/5 flex flex-col overflow-hidden">

        {currentChat ? (
          <>
            {/* HEADER */}
            <div className="p-8 border-b border-white/5 bg-white/[0.01]">
              <h4 className="text-lg font-display text-white">
                {currentChat.name}
              </h4>
              <p className="text-[9px] uppercase text-green-500 font-bold tracking-widest">
                Online
              </p>
            </div>

            {/* MESSAGES */}
            <div className="flex-grow p-8 space-y-6 overflow-y-auto">

              {currentChat.messages.map((msg, i) => (

                <div 
                  key={i} 
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className={`p-5 rounded-2xl max-w-md text-sm ${
                    msg.sender === "user"
                      ? "bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-white/80 rounded-tr-none"
                      : "bg-white/5 text-white/80 rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>

              ))}

            </div>

            {/* INPUT */}
            <div className="p-8 bg-white/[0.01] flex gap-4">

              <input 
                type="text" 
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-grow bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#D4AF37] text-white text-sm"
              />

              <button 
                onClick={handleSend}
                className="tasveer-btn-primary px-8"
              >
                Send
              </button>

            </div>

          </>
        ) : (
          <div className="flex items-center justify-center h-full text-white/30">
            Select a conversation
          </div>
        )}

      </div>

    </div>
  );
};

export default Messages;