export default function AboutPage() {
    return (
        <div>
            {/* Заголовок */}
            <section style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: '2.2rem', marginBottom: 'var(--space-2)' }}>
                    О блоге
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
                    Узнайте больше о нашей миссии и целях
                </p>
            </section>

            {/* Основное содержание */}
            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--space-6)', alignItems: 'start' }}>
                {/* Основная информация */}
                <div>
                    <article className="card">
                        <h2>Наша история</h2>
                        <p style={{ marginBottom: 'var(--space-3)', lineHeight: '1.6' }}>
                            Этот блог был создан с простой целью - делиться знаниями и опытом в области современных технологий. 
                            Мы верим, что обмен информацией делает всё сообщество разработчиков сильнее.
                        </p>
                        
                        <h3>Что мы освещаем</h3>
                        <ul style={{ marginBottom: 'var(--space-3)', lineHeight: '1.6' }}>
                            <li><strong>Веб-разработка</strong> - современные фреймворки, инструменты и практики</li>
                            <li><strong>JavaScript и TypeScript</strong> - от основ до продвинутых техник</li>
                            <li><strong>React и Next.js</strong> - создание современных веб-приложений</li>
                            <li><strong>CSS и дизайн</strong> - красивые и функциональные интерфейсы</li>
                            <li><strong>Продуктивность</strong> - инструменты и методы для эффективной работы</li>
                        </ul>

                        <h3>Наши принципы</h3>
                        <div className="grid" style={{ gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
                                <h4 style={{ margin: '0 0 var(--space-1)', color: 'var(--brand)' }}>Качество контента</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                    Каждая статья тщательно продумана и проверена на практике
                                </p>
                            </div>
                            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
                                <h4 style={{ margin: '0 0 var(--space-1)', color: 'var(--brand)' }}>Практичность</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                    Мы фокусируемся на том, что действительно можно применить в работе
                                </p>
                            </div>
                            <div style={{ padding: 'var(--space-3)', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
                                <h4 style={{ margin: '0 0 var(--space-1)', color: 'var(--brand)' }}>Открытость</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem' }}>
                                    Все материалы доступны бесплатно и без ограничений
                                </p>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Боковая панель */}
                <div className="grid" style={{ gap: 'var(--space-4)' }}>
                    {/* Статистика */}
                    <div className="card">
                        <h3>Статистика блога</h3>
                        <div className="grid" style={{ gap: 'var(--space-2)' }}>
                            <div style={{ textAlign: 'center', padding: 'var(--space-2)', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--brand)' }}>50+</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Статей опубликовано</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: 'var(--space-2)', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--brand)' }}>1000+</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Читателей в месяц</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: 'var(--space-2)', backgroundColor: 'var(--surface-2)', borderRadius: 'var(--radius)' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--brand)' }}>2+</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Года работы</div>
                            </div>
                        </div>
                    </div>

                    {/* Авторы */}
                    <div className="card">
                        <h3>Авторы</h3>
                        <div className="grid" style={{ gap: 'var(--space-3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--brand)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                    АБ
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600' }}>Автор Блога</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Основатель</div>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#10b981',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                    ВР
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600' }}>Веб-разработчик</div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Frontend эксперт</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Технологии */}
                    <div className="card">
                        <h3>Технологии</h3>
                        <p style={{ fontSize: '0.9rem', marginBottom: 'var(--space-2)' }}>
                            Этот блог создан с использованием:
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                            <span className="badge">Next.js</span>
                            <span className="badge">TypeScript</span>
                            <span className="badge">CSS Modules</span>
                            <span className="badge">React</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
