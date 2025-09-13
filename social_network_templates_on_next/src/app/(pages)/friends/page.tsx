"use client";

import { mockUsers, mockFriends } from '@/data/socialData';
import Image from 'next/image';

export default function FriendsPage() {
  const currentUserId = 1;
  const friends = mockFriends
    .filter(friendship => 
      (friendship.userId === currentUserId || friendship.friendId === currentUserId) && 
      friendship.status === 'accepted'
    )
    .map(friendship => {
      const friendId = friendship.userId === currentUserId ? friendship.friendId : friendship.userId;
      return mockUsers.find(user => user.id === friendId);
    })
    .filter(Boolean);

  const friendRequests = mockFriends
    .filter(friendship => 
      friendship.friendId === currentUserId && friendship.status === 'pending'
    )
    .map(friendship => mockUsers.find(user => user.id === friendship.userId))
    .filter(Boolean);

  const suggestedFriends = mockUsers.filter(user => 
    user.id !== currentUserId && 
    !friends.some(friend => friend?.id === user.id) &&
    !friendRequests.some(request => request?.id === user.id)
  );

  return (
    <div className="friends-container">
      <h1 className="friends-title">Друзья</h1>

      {/* Заявки в друзья */}
      {friendRequests.length > 0 && (
        <div className="friends-section">
          <h2 className="friends-section-title">Заявки в друзья</h2>
          <div className="friends-grid">
            {friendRequests.map((user) => (
              <div key={user?.id} className="friends-card">
                <div className="friends-card-content">
                  <Image
                    src={user?.avatar || '/api/placeholder/60/60'}
                    alt={`Аватар ${user?.name}`}
                    width={60}
                    height={60}
                    className="friends-avatar"
                  />
                  <h3 className="friends-name">{user?.name}</h3>
                  <p className="friends-username">@{user?.username}</p>
                  <div className="friends-actions">
                    <button className="friends-btn-primary">
                      Принять
                    </button>
                    <button className="friends-btn-secondary">
                      Отклонить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Список друзей */}
      <div className="friends-section">
        <h2 className="friends-section-title">
          Мои друзья ({friends.length})
        </h2>
        <div className="friends-grid">
          {friends.map((friend) => (
            <div key={friend?.id} className="friends-card">
              <div className="friends-card-content">
                <Image
                  src={friend?.avatar || '/api/placeholder/60/60'}
                  alt={`Аватар ${friend?.name}`}
                  width={60}
                  height={60}
                  className="friends-avatar"
                />
                <h3 className="friends-name">{friend?.name}</h3>
                <p className="friends-username">@{friend?.username}</p>
                <p className="friends-followers">{friend?.followers} подписчиков</p>
                <div className="friends-actions">
                  <button className="friends-btn-primary">
                    Сообщение
                  </button>
                  <button className="friends-btn-icon">
                    ...
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Рекомендации */}
      <div className="friends-section">
        <h2 className="friends-section-title">Возможно, вы знаете</h2>
        <div className="friends-grid">
          {suggestedFriends.slice(0, 6).map((user) => (
            <div key={user.id} className="friends-card">
              <div className="friends-card-content">
                <Image
                  src={user.avatar}
                  alt={`Аватар ${user.name}`}
                  width={60}
                  height={60}
                  className="friends-avatar"
                />
                <h3 className="friends-name">{user.name}</h3>
                <p className="friends-username">@{user.username}</p>
                <p className="friends-followers">{user.followers} подписчиков</p>
                <button className="friends-btn-full">
                  Добавить в друзья
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
