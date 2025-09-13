"use client";

import { mockUsers, mockMessages } from '@/data/socialData';
import Image from 'next/image';
import { useState } from 'react';

export default function MessagesPage() {
  const currentUserId = 1;
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  
  // Группируем сообщения по чатам
  const chats = mockUsers
    .filter(user => user.id !== currentUserId)
    .map(user => {
      const chatMessages = mockMessages.filter(message => 
        (message.fromUserId === currentUserId && message.toUserId === user.id) ||
        (message.fromUserId === user.id && message.toUserId === currentUserId)
      ).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      const lastMessage = chatMessages[0];
      const unreadCount = chatMessages.filter(msg => 
        msg.fromUserId === user.id && !msg.read
      ).length;
      
      return {
        user,
        lastMessage,
        unreadCount,
        messages: chatMessages.reverse()
      };
    })
    .filter(chat => chat.lastMessage)
    .sort((a, b) => 
      new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
    );

  const selectedChat = selectedChatId 
    ? chats.find(chat => chat.user.id === selectedChatId)
    : null;

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="messages-container">
      <h1 className="messages-title">Сообщения</h1>
      
      <div className="messages-interface">
        <div className="messages-layout">
          {/* Список чатов */}
          <div className="messages-sidebar">
            <div className="messages-sidebar-header">
              <h2 className="messages-sidebar-title">Чаты</h2>
            </div>
            <div className="messages-chat-list">
              {chats.map((chat) => (
                <div
                  key={chat.user.id}
                  onClick={() => setSelectedChatId(chat.user.id)}
                  className={`messages-chat-item ${
                    selectedChatId === chat.user.id ? 'active' : ''
                  }`}
                >
                  <div className="messages-chat-content">
                    <div className="messages-avatar-container">
                      <Image
                        src={chat.user.avatar}
                        alt={`Аватар ${chat.user.name}`}
                        width={40}
                        height={40}
                        className="messages-avatar"
                      />
                      {chat.unreadCount > 0 && (
                        <div className="messages-unread-badge">
                          {chat.unreadCount}
                        </div>
                      )}
                    </div>
                    <div className="messages-chat-info">
                      <div className="messages-chat-header">
                        <h3 className="messages-chat-name">{chat.user.name}</h3>
                        <span className="messages-chat-time">
                          {formatTime(chat.lastMessage.timestamp)}
                        </span>
                      </div>
                      <p className="messages-chat-preview">
                        {chat.lastMessage.fromUserId === currentUserId ? 'Вы: ' : ''}
                        {chat.lastMessage.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Окно чата */}
          <div className="messages-main">
            {selectedChat ? (
              <>
                {/* Заголовок чата */}
                <div className="messages-chat-header">
                  <div className="messages-current-chat">
                    <Image
                      src={selectedChat.user.avatar}
                      alt={`Аватар ${selectedChat.user.name}`}
                      width={40}
                      height={40}
                      className="messages-avatar"
                    />
                    <div>
                      <h3 className="messages-current-name">{selectedChat.user.name}</h3>
                      <p className="messages-current-username">@{selectedChat.user.username}</p>
                    </div>
                  </div>
                </div>

                {/* Сообщения */}
                <div className="messages-conversation">
                  <div className="messages-messages">
                    {selectedChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`messages-message ${
                          message.fromUserId === currentUserId ? 'sent' : 'received'
                        }`}
                      >
                        <div
                          className={`messages-bubble ${
                            message.fromUserId === currentUserId ? 'sent' : 'received'
                          }`}
                        >
                          <p className="messages-bubble-text">{message.content}</p>
                          <p className="messages-bubble-time">
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Поле ввода */}
                <div className="messages-input-area">
                  <div className="messages-input-form">
                    <input
                      type="text"
                      placeholder="Напишите сообщение..."
                      className="messages-input"
                    />
                    <button className="messages-send-btn">
                      Отправить
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="messages-empty">
                <div className="messages-empty-content">
                  <p className="messages-empty-title">Выберите чат</p>
                  <p className="messages-empty-text">Нажмите на чат слева, чтобы начать общение</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
