import Link from 'next/link';

export default function BlogPage() {
    // Моковые данные для блога
    const posts = [
        {
            id: 1,
            title: "Добро пожаловать в наш блог",
            excerpt: "Это первая запись в нашем блоге. Здесь мы будем делиться интересными мыслями и идеями о современном мире технологий.",
            content: "Полный текст статьи будет здесь...",
            date: "2025-01-15",
            author: "Автор Блога",
            tags: ["Общее", "Приветствие"],
            readTime: "3 мин"
        },
        {
            id: 2,
            title: "Как создать эффективный workflow",
            excerpt: "Организация рабочего процесса - ключ к успешной продуктивности. Разберем основные принципы эффективной работы.",
            content: "Полный текст статьи будет здесь...",
            date: "2025-01-10",
            author: "Эксперт по продуктивности",
            tags: ["Продуктивность", "Работа"],
            readTime: "5 мин"
        },
        {
            id: 3,
            title: "Тенденции веб-разработки в 2025",
            excerpt: "Обзор современных технологий и подходов в веб-разработке на текущий год. Что нового появилось?",
            content: "Полный текст статьи будет здесь...",
            date: "2025-01-05",
            author: "Веб-разработчик",
            tags: ["Разработка", "Технологии"],
            readTime: "7 мин"
        },
        {
            id: 4,
            title: "Основы TypeScript для начинающих",
            excerpt: "TypeScript становится все популярнее. Изучаем основы типизации и преимущества статической типизации.",
            content: "Полный текст статьи будет здесь...",
            date: "2024-12-28",
            author: "Frontend Developer",
            tags: ["TypeScript", "Программирование"],
            readTime: "10 мин"
        },
        {
            id: 5,
            title: "Дизайн-системы: зачем они нужны",
            excerpt: "Разбираемся, что такое дизайн-системы и как они помогают создавать согласованные интерфейсы.",
            content: "Полный текст статьи будет здесь...",
            date: "2024-12-20",
            author: "UI/UX Designer",
            tags: ["Дизайн", "UI/UX"],
            readTime: "6 мин"
        },
        {
            id: 6,
            title: "Next.js 15: что нового?",
            excerpt: "Обзор новых возможностей и улучшений в последней версии популярного React-фреймворка.",
            content: "Полный текст статьи будет здесь...",
            date: "2024-12-15",
            author: "React Developer",
            tags: ["Next.js", "React", "Фреймворки"],
            readTime: "8 мин"
        }
    ];

    const categories = ["Все", "Технологии", "Продуктивность", "Разработка", "Дизайн"];

    return (
        <div>
            {/* Заголовок страницы */}
            <section style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: '2.2rem', marginBottom: 'var(--space-2)' }}>
                    Блог
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--muted)', maxWidth: '600px', margin: '0 auto' }}>
                    Коллекция статей о технологиях, разработке и трендах в IT
                </p>
            </section>

            {/* Фильтры по категориям */}
            <section style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'center' }}>
                    {categories.map(category => (
                        <button 
                            key={category} 
                            className="button"
                            style={{ 
                                backgroundColor: category === "Все" ? 'var(--brand)' : 'var(--surface)',
                                color: category === "Все" ? 'white' : 'var(--text)',
                                border: '1px solid var(--border)',
                                padding: 'var(--space-1) var(--space-3)',
                                borderRadius: '20px',
                                fontSize: '0.9rem'
                            }}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Список статей */}
            <section>
                <div className="grid" style={{ gap: 'var(--space-4)' }}>
                    {posts.map(post => (
                        <article key={post.id} className="card">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                                {/* Заголовок и мета-информация */}
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)', fontSize: '0.9rem', color: 'var(--muted)' }}>
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    
                                    <h2 style={{ margin: '0 0 var(--space-2)', fontSize: '1.4rem' }}>
                                        <Link href={`/blog/${post.id}`} style={{ color: 'var(--text)' }}>
                                            {post.title}
                                        </Link>
                                    </h2>
                                    
                                    <p style={{ color: 'var(--muted)', lineHeight: '1.6' }}>
                                        {post.excerpt}
                                    </p>
                                </div>

                                {/* Теги и ссылка */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                                        {post.tags.map(tag => (
                                            <span key={tag} className="badge">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    
                                    <Link 
                                        href={`/blog/${post.id}`} 
                                        style={{ 
                                            color: 'var(--brand)', 
                                            fontWeight: '600',
                                            fontSize: '0.9rem',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        Читать статью →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Pagination (заглушка) */}
            <section style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}>
                    <button className="button" disabled style={{ opacity: 0.5 }}>← Предыдущая</button>
                    <button className="button" style={{ backgroundColor: 'var(--brand)', color: 'white' }}>1</button>
                    <button className="button">2</button>
                    <button className="button">3</button>
                    <button className="button">Следующая →</button>
                </div>
            </section>
        </div>
    );
}