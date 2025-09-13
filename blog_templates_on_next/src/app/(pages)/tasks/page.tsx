'use client';

import { useState } from 'react';

interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    category: string;
}

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            title: "Написать статью о React hooks",
            description: "Подробный разбор useEffect и useState с примерами",
            completed: false,
            priority: 'high',
            dueDate: "2025-01-20",
            category: "Работа"
        },
        {
            id: 2,
            title: "Обновить дизайн блога",
            description: "Добавить темную тему и улучшить мобильную версию",
            completed: false,
            priority: 'medium',
            dueDate: "2025-01-25",
            category: "Разработка"
        },
        {
            id: 3,
            title: "Изучить новые CSS Grid возможности",
            completed: true,
            priority: 'low',
            category: "Обучение"
        },
        {
            id: 4,
            title: "Провести код-ревью проекта",
            description: "Проверить качество кода и документацию",
            completed: false,
            priority: 'high',
            dueDate: "2025-01-18",
            category: "Работа"
        },
        {
            id: 5,
            title: "Настроить CI/CD pipeline",
            completed: false,
            priority: 'medium',
            category: "DevOps"
        }
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    const categories = ['all', ...Array.from(new Set(tasks.map(task => task.category)))];

    const toggleTask = (id: number) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const addTask = () => {
        if (newTaskTitle.trim()) {
            const newTask: Task = {
                id: Math.max(...tasks.map(t => t.id)) + 1,
                title: newTaskTitle,
                completed: false,
                priority: 'medium',
                category: 'Общее'
            };
            setTasks([newTask, ...tasks]);
            setNewTaskTitle('');
        }
    };

    const getPriorityColor = (priority: Task['priority']) => {
        switch (priority) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return 'var(--muted)';
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesFilter = filter === 'all' || 
            (filter === 'active' && !task.completed) || 
            (filter === 'completed' && task.completed);
        
        const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
        
        return matchesFilter && matchesCategory;
    });

    const completedCount = tasks.filter(task => task.completed).length;
    const totalCount = tasks.length;

    return (
        <div>
            {/* Заголовок и статистика */}
            <section style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                <h1 style={{ fontSize: '2.2rem', marginBottom: 'var(--space-2)' }}>
                    Задачи и проекты
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--muted)', marginBottom: 'var(--space-3)' }}>
                    Управление задачами и отслеживание прогресса
                </p>
                
                <div className="card" style={{ display: 'inline-block', padding: 'var(--space-3) var(--space-4)' }}>
                    <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--brand)' }}>
                                {totalCount - completedCount}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Активных</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                                {completedCount}
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Выполнено</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text)' }}>
                                {Math.round((completedCount / totalCount) * 100)}%
                            </div>
                            <div style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Прогресс</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Добавление новой задачи */}
            <section className="card" style={{ marginBottom: 'var(--space-4)' }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>Добавить задачу</h3>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <input
                        type="text"
                        placeholder="Введите название задачи..."
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                        className="input"
                        style={{ flex: 1 }}
                    />
                    <button 
                        onClick={addTask}
                        className="button"
                        style={{ 
                            backgroundColor: 'var(--brand)', 
                            color: 'white',
                            padding: '10px 20px',
                            fontWeight: '600'
                        }}
                    >
                        Добавить
                    </button>
                </div>
            </section>

            {/* Фильтры */}
            <section style={{ marginBottom: 'var(--space-4)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Фильтр по статусу */}
                    <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                        {(['all', 'active', 'completed'] as const).map(filterType => (
                            <button
                                key={filterType}
                                onClick={() => setFilter(filterType)}
                                className="button"
                                style={{
                                    backgroundColor: filter === filterType ? 'var(--brand)' : 'var(--surface)',
                                    color: filter === filterType ? 'white' : 'var(--text)',
                                    padding: 'var(--space-1) var(--space-2)',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {filterType === 'all' && 'Все'}
                                {filterType === 'active' && 'Активные'}
                                {filterType === 'completed' && 'Выполненные'}
                            </button>
                        ))}
                    </div>

                    {/* Фильтр по категории */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="select"
                        style={{ fontSize: '0.9rem' }}
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category === 'all' ? 'Все категории' : category}
                            </option>
                        ))}
                    </select>
                </div>
            </section>

            {/* Список задач */}
            <section>
                {filteredTasks.length === 0 ? (
                    <div className="card" style={{ textAlign: 'center', padding: 'var(--space-6)' }}>
                        <p className="empty">Задачи не найдены</p>
                    </div>
                ) : (
                    <div className="grid" style={{ gap: 'var(--space-3)' }}>
                        {filteredTasks.map(task => (
                            <div key={task.id} className="card">
                                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                                    {/* Чекбокс */}
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                        style={{ marginTop: '2px' }}
                                    />

                                    {/* Содержание задачи */}
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                                            <h4 style={{ 
                                                margin: 0, 
                                                textDecoration: task.completed ? 'line-through' : 'none',
                                                opacity: task.completed ? 0.6 : 1
                                            }}>
                                                {task.title}
                                            </h4>
                                            
                                            {/* Индикатор приоритета */}
                                            <span 
                                                style={{ 
                                                    width: '8px', 
                                                    height: '8px', 
                                                    borderRadius: '50%', 
                                                    backgroundColor: getPriorityColor(task.priority),
                                                    display: 'inline-block'
                                                }}
                                                title={`Приоритет: ${task.priority}`}
                                            />
                                        </div>

                                        {task.description && (
                                            <p style={{ 
                                                color: 'var(--muted)', 
                                                fontSize: '0.9rem', 
                                                marginBottom: 'var(--space-2)',
                                                opacity: task.completed ? 0.6 : 1
                                            }}>
                                                {task.description}
                                            </p>
                                        )}

                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)', alignItems: 'center' }}>
                                            <span className="badge">{task.category}</span>
                                            <span className="badge">{task.priority}</span>
                                            {task.dueDate && (
                                                <span className="badge" style={{ 
                                                    color: new Date(task.dueDate) < new Date() ? '#ef4444' : 'inherit' 
                                                }}>
                                                    {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Кнопка удаления */}
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#ef4444',
                                            cursor: 'pointer',
                                            padding: 'var(--space-1)',
                                            borderRadius: '4px',
                                            fontSize: '1.1rem'
                                        }}
                                        title="Удалить задачу"
                                    >
                                        ×
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}