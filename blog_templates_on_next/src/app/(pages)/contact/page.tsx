'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Здесь будет логика отправки формы
        console.log('Форма отправлена:', formData);
        alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            {/* Заголовок */}
            <section style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: '2.2rem', marginBottom: 'var(--space-2)' }}>
                    Контакты
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
                    Свяжитесь с нами для сотрудничества, вопросов или предложений
                </p>
            </section>

            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
                {/* Форма обратной связи */}
                <div className="card">
                    <h2 style={{ marginBottom: 'var(--space-4)' }}>Написать нам</h2>
                    
                    <form onSubmit={handleSubmit} className="grid" style={{ gap: 'var(--space-3)' }}>
                        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                            <div>
                                <label htmlFor="name" style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600' }}>
                                    Имя *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                    placeholder="Ваше имя"
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="email" style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600' }}>
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="input"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600' }}>
                                Тема
                            </label>
                            <select
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="select"
                                style={{ width: '100%' }}
                            >
                                <option value="">Выберите тему</option>
                                <option value="collaboration">Сотрудничество</option>
                                <option value="question">Вопрос</option>
                                <option value="suggestion">Предложение</option>
                                <option value="bug">Сообщить об ошибке</option>
                                <option value="other">Другое</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" style={{ display: 'block', marginBottom: 'var(--space-1)', fontWeight: '600' }}>
                                Сообщение *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="textarea"
                                rows={6}
                                placeholder="Напишите ваше сообщение..."
                            />
                        </div>

                        <button 
                            type="submit"
                            className="button"
                            style={{ 
                                backgroundColor: 'var(--brand)', 
                                color: 'white',
                                padding: 'var(--space-2) var(--space-4)',
                                fontWeight: '600',
                                fontSize: '1rem',
                                justifySelf: 'start'
                            }}
                        >
                            Отправить сообщение
                        </button>
                    </form>
                </div>

                {/* Контактная информация */}
                <div className="grid" style={{ gap: 'var(--space-4)' }}>
                    {/* Быстрые контакты */}
                    <div className="card">
                        <h3>Быстрая связь</h3>
                        <div className="grid" style={{ gap: 'var(--space-3)' }}>
                            <div>
                                <h4 style={{ margin: '0 0 var(--space-1)', fontSize: '0.9rem', color: 'var(--brand)' }}>
                                    📧 Email
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                    blog@example.com
                                </p>
                            </div>
                            
                            <div>
                                <h4 style={{ margin: '0 0 var(--space-1)', fontSize: '0.9rem', color: 'var(--brand)' }}>
                                    💬 Telegram
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                    @blog_support
                                </p>
                            </div>
                            
                            <div>
                                <h4 style={{ margin: '0 0 var(--space-1)', fontSize: '0.9rem', color: 'var(--brand)' }}>
                                    🐙 GitHub
                                </h4>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                    github.com/blog
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Время ответа */}
                    <div className="card">
                        <h3>Время ответа</h3>
                        <div className="grid" style={{ gap: 'var(--space-2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.9rem' }}>Email</span>
                                <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>24-48 часов</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.9rem' }}>Telegram</span>
                                <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>2-4 часа</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '0.9rem' }}>GitHub Issues</span>
                                <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>1-3 дня</span>
                            </div>
                        </div>
                    </div>

                    {/* FAQ */}
                    <div className="card">
                        <h3>Частые вопросы</h3>
                        <div className="grid" style={{ gap: 'var(--space-2)' }}>
                            <details style={{ cursor: 'pointer' }}>
                                <summary style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: 'var(--space-1)' }}>
                                    Можно ли использовать материалы блога?
                                </summary>
                                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>
                                    Да, все материалы доступны под лицензией MIT и могут быть использованы в ваших проектах.
                                </p>
                            </details>
                            
                            <details style={{ cursor: 'pointer' }}>
                                <summary style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: 'var(--space-1)' }}>
                                    Как предложить тему для статьи?
                                </summary>
                                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>
                                    Напишите нам через форму выше, выбрав тему "Предложение", или создайте issue на GitHub.
                                </p>
                            </details>
                            
                            <details style={{ cursor: 'pointer' }}>
                                <summary style={{ fontWeight: '600', fontSize: '0.9rem', marginBottom: 'var(--space-1)' }}>
                                    Есть ли RSS?
                                </summary>
                                <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: 0 }}>
                                    Да, RSS-лента доступна по адресу /rss.xml
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
