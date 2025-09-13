import Link from 'next/link';

export default function Home() {
    // Моковые данные для демонстрации
    const featuredPosts = [
        {
            id: 1,
            title: "Добро пожаловать в наш блог",
            excerpt: "Это первая запись в нашем блоге. Здесь мы будем делиться интересными мыслями и идеями.",
            date: "2025-01-15",
            author: "Автор Блога",
            tags: ["Общее", "Приветствие"]
        },
        {
            id: 2,
            title: "Как создать эффективный workflow",
            excerpt: "Организация рабочего процесса - ключ к успешной продуктивности. Разберем основные принципы.",
            date: "2025-01-10",
            author: "Эксперт по продуктивности",
            tags: ["Продуктивность", "Работа"]
        },
        {
            id: 3,
            title: "Тенденции веб-разработки в 2025",
            excerpt: "Обзор современных технологий и подходов в веб-разработке на текущий год.",
            date: "2025-01-05",
            author: "Веб-разработчик",
            tags: ["Разработка", "Технологии"]
        }
    ];

    return (
        <div>
            {/* Главный баннер */}
            <section className="card" style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-3)' }}>
                    Добро пожаловать в наш блог
                </h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto var(--space-4)' }}>
                    Место, где мы делимся полезными идеями, советами и размышлениями о современном мире технологий и не только.
                </p>
                <Link href="/blog" className="button" style={{ 
                    backgroundColor: 'var(--brand)', 
                    color: 'white',
                    padding: 'var(--space-2) var(--space-4)',
                    borderRadius: 'var(--radius)',
                    border: 'none',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                }}>
                    Читать статьи
                </Link>
            </section>

            {/* Последние записи */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <h2>Последние статьи</h2>
                    <Link href="/blog" style={{ color: 'var(--brand)', fontWeight: '600' }}>
                        Все статьи →
                    </Link>
                </div>
                
                <div className="grid auto">
                    {featuredPosts.map(post => (
                        <article key={post.id} className="card">
                            <div className="card-header">
                                <h3 style={{ margin: 0 }}>{post.title}</h3>
                            </div>
                            
                            <p style={{ marginBottom: 'var(--space-3)', color: 'var(--muted)' }}>
                                {post.excerpt}
                            </p>
                            
                            <div className="card-footer">
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
                                        {post.author} • {new Date(post.date).toLocaleDateString('ru-RU')}
                                    </div>
                                    <div style={{ marginTop: 'var(--space-1)' }}>
                                        {post.tags.map(tag => (
                                            <span key={tag} className="badge" style={{ marginRight: 'var(--space-1)' }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <Link href={`/blog/${post.id}`} style={{ 
                                    color: 'var(--brand)', 
                                    fontWeight: '600',
                                    fontSize: '0.9rem'
                                }}>
                                    Читать →
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Дополнительная информация */}
            <section className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-4)' }}>
                <div className="card">
                    <h3>О блоге</h3>
                    <p>Этот блог создан для обмена знаниями и опытом в области технологий, продуктивности и личного развития.</p>
                </div>
                
                <div className="card">
                    <h3>Категории</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                        <span className="badge">Технологии</span>
                        <span className="badge">Продуктивность</span>
                        <span className="badge">Разработка</span>
                        <span className="badge">Общее</span>
                    </div>
                </div>
            </section>
        </div>
    );
}