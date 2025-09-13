import Link from 'next/link';
import { notFound } from 'next/navigation';

// Моковые данные (в реальном проекте будут браться из API или базы данных)
const posts = [
    {
        id: 1,
        title: "Добро пожаловать в наш блог",
        content: `
        <h2>Добро пожаловать!</h2>
        <p>Это первая запись в нашем блоге. Мы рады приветствовать вас в нашем уголке интернета, где мы будем делиться интересными мыслями, идеями и наблюдениями.</p>
        
        <h3>Что вас ждет?</h3>
        <p>В нашем блоге вы найдете:</p>
        <ul>
            <li>Статьи о современных технологиях</li>
            <li>Советы по повышению продуктивности</li>
            <li>Размышления о трендах в веб-разработке</li>
            <li>Полезные ресурсы и инструменты</li>
        </ul>
        
        <h3>Наша миссия</h3>
        <p>Мы стремимся создать место, где можно найти качественный контент, который поможет в профессиональном и личном развитии. Каждая статья написана с заботой о читателе и стремлением поделиться реально полезной информацией.</p>
        
        <p>Спасибо, что присоединились к нам в этом путешествии!</p>
        `,
        date: "2025-01-15",
        author: "Автор Блога",
        tags: ["Общее", "Приветствие"],
        readTime: "3 мин"
    },
    {
        id: 2,
        title: "Как создать эффективный workflow",
        content: `
        <h2>Основы эффективного рабочего процесса</h2>
        <p>Эффективная организация рабочего процесса - это не просто модное слово, а реальный способ повысить продуктивность и снизить стресс.</p>
        
        <h3>1. Планирование - основа всего</h3>
        <p>Начинайте каждый день с четкого плана. Определите 3-5 ключевых задач, которые должны быть выполнены.</p>
        
        <h3>2. Методы управления временем</h3>
        <ul>
            <li><strong>Техника Помодоро</strong> - работайте блоками по 25 минут</li>
            <li><strong>Time blocking</strong> - выделяйте блоки времени для разных типов задач</li>
            <li><strong>Правило 2 минут</strong> - если задача занимает меньше 2 минут, делайте ее сразу</li>
        </ul>
        
        <h3>3. Инструменты для организации</h3>
        <p>Выберите подходящие инструменты и придерживайтесь их:</p>
        <ul>
            <li>Todoist или Notion для задач</li>
            <li>Календарь для планирования времени</li>
            <li>Slack или Teams для коммуникации</li>
        </ul>
        
        <h3>Заключение</h3>
        <p>Помните: идеального workflow не существует. Экспериментируйте и адаптируйте методы под свои потребности.</p>
        `,
        date: "2025-01-10",
        author: "Эксперт по продуктивности",
        tags: ["Продуктивность", "Работа"],
        readTime: "5 мин"
    },
    {
        id: 3,
        title: "Тенденции веб-разработки в 2025",
        content: `
        <h2>Что ждет веб-разработку в 2025 году?</h2>
        <p>Индустрия веб-разработки продолжает стремительно развиваться. Рассмотрим ключевые тенденции этого года.</p>
        
        <h3>1. Server Components набирают популярность</h3>
        <p>React Server Components революционизируют способ создания приложений, позволяя выполнять код на сервере и отправлять готовый результат клиенту.</p>
        
        <h3>2. AI-инструменты в разработке</h3>
        <p>Искусственный интеллект становится неотъемлемой частью процесса разработки:</p>
        <ul>
            <li>GitHub Copilot для автокомплита кода</li>
            <li>ChatGPT для решения проблем</li>
            <li>AI-инструменты для тестирования</li>
        </ul>
        
        <h3>3. Новые CSS-возможности</h3>
        <p>CSS продолжает развиваться:</p>
        <ul>
            <li>Container Queries для адаптивного дизайна</li>
            <li>CSS Grid subgrid для сложных макетов</li>
            <li>Новые цветовые пространства</li>
        </ul>
        
        <h3>4. Производительность превыше всего</h3>
        <p>Core Web Vitals и пользовательский опыт остаются приоритетом. Инструменты вроде Vite и esbuild делают сборку быстрее.</p>
        
        <h3>Выводы</h3>
        <p>2025 год обещает быть захватывающим для веб-разработчиков. Главное - не пытаться изучить все сразу, а сосредоточиться на том, что действительно полезно для ваших проектов.</p>
        `,
        date: "2025-01-05",
        author: "Веб-разработчик",
        tags: ["Разработка", "Технологии"],
        readTime: "7 мин"
    }
];

export default async function PostPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const postId = parseInt(resolvedParams.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        notFound();
    }

    return (
        <div>
            {/* Навигация назад */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <Link 
                    href="/blog" 
                    style={{ 
                        color: 'var(--brand)', 
                        fontSize: '0.9rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-1)'
                    }}
                >
                    ← Назад к статьям
                </Link>
            </div>

            {/* Основная статья */}
            <article className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Заголовок и мета-информация */}
                <header style={{ marginBottom: 'var(--space-5)', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '2.2rem', lineHeight: '1.2', marginBottom: 'var(--space-3)' }}>
                        {post.title}
                    </h1>
                    
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        gap: 'var(--space-2)', 
                        fontSize: '0.9rem', 
                        color: 'var(--muted)',
                        marginBottom: 'var(--space-3)'
                    }}>
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>

                    {/* Теги */}
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                        {post.tags.map(tag => (
                            <span key={tag} className="badge">
                                {tag}
                            </span>
                        ))}
                    </div>
                </header>

                {/* Содержание статьи */}
                <div 
                    style={{ 
                        fontSize: '1.1rem', 
                        lineHeight: '1.7',
                        color: 'var(--text)'
                    }}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Футер статьи */}
                <footer style={{ 
                    marginTop: 'var(--space-6)', 
                    paddingTop: 'var(--space-4)', 
                    borderTop: '1px solid var(--border)',
                    textAlign: 'center'
                }}>
                    <div style={{ marginBottom: 'var(--space-3)' }}>
                        <p style={{ color: 'var(--muted)', marginBottom: 'var(--space-2)' }}>
                            Понравилась статья? Поделитесь с друзьями!
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)' }}>
                            <button className="button">Поделиться</button>
                            <button className="button">Сохранить</button>
                        </div>
                    </div>
                </footer>
            </article>

            {/* Похожие статьи */}
            <section style={{ marginTop: 'var(--space-6)' }}>
                <h3 style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                    Другие статьи
                </h3>
                <div className="grid auto">
                    {posts
                        .filter(p => p.id !== postId)
                        .slice(0, 2)
                        .map(relatedPost => (
                            <div key={relatedPost.id} className="card">
                                <h4 style={{ marginBottom: 'var(--space-2)' }}>
                                    <Link href={`/blog/${relatedPost.id}`} style={{ color: 'var(--text)' }}>
                                        {relatedPost.title}
                                    </Link>
                                </h4>
                                <p style={{ 
                                    color: 'var(--muted)', 
                                    fontSize: '0.9rem',
                                    marginBottom: 'var(--space-2)'
                                }}>
                                    {relatedPost.author} • {new Date(relatedPost.date).toLocaleDateString('ru-RU')}
                                </p>
                                <Link 
                                    href={`/blog/${relatedPost.id}`}
                                    style={{ color: 'var(--brand)', fontSize: '0.9rem', fontWeight: '600' }}
                                >
                                    Читать →
                                </Link>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
}

// Генерируем статические параметры для статических страниц
export async function generateStaticParams() {
    return posts.map((post) => ({
        id: post.id.toString(),
    }));
}
