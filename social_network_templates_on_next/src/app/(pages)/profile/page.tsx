"use client";

import { mockUsers, mockPosts } from '@/data/socialData';
import Image from 'next/image';

export default function ProfilePage() {
  const currentUser = mockUsers[0]; // Текущий пользователь
  const userPosts = mockPosts.filter(post => post.userId === currentUser.id);

  return (
    <div className="profile-container">
      {/* Профильная информация */}
      <div className="profile-card">
        <div className="profile-info">
          <Image
            src={currentUser.avatar}
            alt={`Аватар ${currentUser.name}`}
            width={120}
            height={120}
            className="profile-avatar"
          />
          <div className="profile-details">
            <h1 className="profile-name">{currentUser.name}</h1>
            <p className="profile-username">@{currentUser.username}</p>
            <p className="profile-bio">{currentUser.bio}</p>
            
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-number">{currentUser.posts}</div>
                <div className="profile-stat-label">Постов</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-number">{currentUser.followers}</div>
                <div className="profile-stat-label">Подписчиков</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-number">{currentUser.following}</div>
                <div className="profile-stat-label">Подписок</div>
              </div>
            </div>
            
            <button className="profile-edit-btn">
              Редактировать профиль
            </button>
          </div>
        </div>
      </div>

      {/* Посты пользователя */}
      <div className="profile-posts-section">
        <h2 className="profile-posts-title">Мои посты</h2>
        
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post.id} className="profile-post">
              <div className="profile-post-header">
                <Image
                  src={post.user.avatar}
                  alt={`Аватар ${post.user.name}`}
                  width={40}
                  height={40}
                  className="profile-post-avatar"
                />
                <div>
                  <h3 className="profile-post-user">{post.user.name}</h3>
                  <p className="profile-post-time">{post.timestamp}</p>
                </div>
              </div>
              
              <p className="profile-post-content">{post.content}</p>
              
              {post.image && (
                <div>
                  <Image
                    src={post.image}
                    alt="Изображение поста"
                    width={500}
                    height={300}
                    className="profile-post-image"
                  />
                </div>
              )}
              
              <div className="profile-post-actions">
                <button className={`profile-post-action ${post.liked ? 'liked' : ''}`}>
                  <span>❤️</span>
                  <span>{post.likes}</span>
                </button>
                <button className="profile-post-action">
                  <span>💬</span>
                  <span>{post.comments}</span>
                </button>
                <button className="profile-post-action">
                  <span>🔄</span>
                  <span>{post.shares}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="profile-no-posts">
            <p className="profile-no-posts-text">У вас пока нет постов</p>
            <button className="profile-create-post-btn">
              Создать пост
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
