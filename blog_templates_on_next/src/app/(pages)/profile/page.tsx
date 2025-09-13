'use client';

import { useState } from 'react';

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        name: 'Иван Иванов',
        email: 'ivan@example.com',
        bio: 'Frontend разработчик с 5-летним опытом. Увлекаюсь React, TypeScript и современными веб-технологиями.',
        location: 'Москва, Россия',
        website: 'https://example.com',
        social: {
            github: 'https://github.com/username',
            linkedin: 'https://linkedin.com/in/username',
            twitter: 'https://twitter.com/username'
        }
    });

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(profile);

    const stats = {
        posts: 12,
        tasks: 24,
        completed: 18
    };

    const recentActivity = [
        {
            id: 1,
            type: 'post',
            title: 'Опубликована статья "Тенденции веб-разработки в 2025"',
            date: '2025-01-05'
        },
        {
            id: 2,
            type: 'task',
            title: 'Выполнена задача "Изучить новые CSS Grid возможности"',
            date: '2025-01-03'
        },
        {
            id: 3,
            type: 'post',
            title: 'Опубликована статья "Как создать эффективный workflow"',
            date: '2025-01-01'
        }
    ];

    const handleSave = () => {
        setProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(profile);
        setIsEditing(false);
    };

    return (
        <div>
            {/* Заголовок */}
            <section style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: '2.2rem', marginBottom: 'var(--space-2)' }}>
                    Профиль
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--muted)' }}>
                    Управление личной информацией и настройками
                </p>
            </section>

            <div className="grid" style={{ gridTemplateColumns: '1fr 2fr', gap: 'var(--space-6)', alignItems: 'start' }}>
                {/* Левая колонка - Основная информация */}
                <div>
                    <div className="card">
                        <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                            {/* Аватар */}
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--brand)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto var(--space-3)',
                                fontSize: '2.5rem',
                                color: 'white',
                                fontWeight: 'bold'
                            }}>
                                {profile.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            
                            <h2 style={{ margin: '0 0 var(--space-1)' }}>{profile.name}</h2>
                            <p style={{ color: 'var(--muted)', margin: '0 0 var(--space-2)' }}>{profile.email}</p>
                            
                            <button 
                                onClick={() => setIsEditing(!isEditing)}
                                className="button"
                                style={{ 
                                    backgroundColor: isEditing ? 'var(--muted)' : 'var(--brand)', 
                                    color: 'white',
                                    fontWeight: '600'
                                }}
                            >
                                {isEditing ? 'Отменить' : 'Редактировать'}
                            </button>
                        </div>

                        {/* Статистика */}
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(3, 1fr)', 
                            gap: 'var(--space-2)',
                            padding: 'var(--space-3)',
                            backgroundColor: 'var(--surface-2)',
                            borderRadius: 'var(--radius)',
                            textAlign: 'center'
                        }}>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--brand)' }}>
                                    {stats.posts}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Статей</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--brand)' }}>
                                    {stats.tasks}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Задач</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                                    {stats.completed}
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Выполнено</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Правая колонка - Детальная информация */}
                <div className="grid" style={{ gap: 'var(--space-4)' }}>
                    {/* Информация о пользователе */}
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-3)' }}>Информация</h3>
                        
                        {isEditing ? (
                            <div className="grid" style={{ gap: 'var(--space-3)' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600' }}>
                                        Имя
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="input"
                                    />
                                </div>
                                
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600' }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="input"
                                    />
                                </div>
                                
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600' }}>
                                        О себе
                                    </label>
                                    <textarea
                                        value={formData.bio}
                                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                        className="textarea"
                                        rows={3}
                                    />
                                </div>
                                
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600' }}>
                                        Местоположение
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                        className="input"
                                    />
                                </div>
                                
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600' }}>
                                        Веб-сайт
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) => setFormData({...formData, website: e.target.value})}
                                        className="input"
                                    />
                                </div>
                                
                                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                                    <button 
                                        onClick={handleSave}
                                        className="button"
                                        style={{ 
                                            backgroundColor: 'var(--brand)', 
                                            color: 'white',
                                            flex: 1,
                                            fontWeight: '600'
                                        }}
                                    >
                                        Сохранить
                                    </button>
                                    <button 
                                        onClick={handleCancel}
                                        className="button"
                                        style={{ flex: 1 }}
                                    >
                                        Отменить
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid" style={{ gap: 'var(--space-3)' }}>
                                <div>
                                    <strong>О себе:</strong>
                                    <p style={{ margin: 'var(--space-1) 0 0', color: 'var(--muted)' }}>
                                        {profile.bio}
                                    </p>
                                </div>
                                
                                <div>
                                    <strong>Местоположение:</strong>
                                    <p style={{ margin: 'var(--space-1) 0 0', color: 'var(--muted)' }}>
                                        {profile.location}
                                    </p>
                                </div>
                                
                                <div>
                                    <strong>Веб-сайт:</strong>
                                    <p style={{ margin: 'var(--space-1) 0 0' }}>
                                        <a href={profile.website} target="_blank" rel="noopener noreferrer">
                                            {profile.website}
                                        </a>
                                    </p>
                                </div>
                                
                                <div>
                                    <strong>Социальные сети:</strong>
                                    <div style={{ marginTop: 'var(--space-2)', display: 'flex', gap: 'var(--space-2)' }}>
                                        <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="button">
                                            GitHub
                                        </a>
                                        <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="button">
                                            LinkedIn
                                        </a>
                                        <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer" className="button">
                                            Twitter
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Последняя активность */}
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-3)' }}>Последняя активность</h3>
                        
                        <div className="grid" style={{ gap: 'var(--space-2)' }}>
                            {recentActivity.map(activity => (
                                <div 
                                    key={activity.id}
                                    style={{ 
                                        padding: 'var(--space-2)',
                                        backgroundColor: 'var(--surface-2)',
                                        borderRadius: 'var(--radius)',
                                        borderLeft: `3px solid ${activity.type === 'post' ? 'var(--brand)' : '#10b981'}`
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                                        <span className="badge" style={{ 
                                            backgroundColor: activity.type === 'post' ? 'var(--brand)' : '#10b981',
                                            color: 'white'
                                        }}>
                                            {activity.type === 'post' ? 'Статья' : 'Задача'}
                                        </span>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                                            {new Date(activity.date).toLocaleDateString('ru-RU')}
                                        </span>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                        {activity.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
