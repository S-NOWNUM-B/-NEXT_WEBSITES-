'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import '../../styles/tasks.css';
import {
    readTasks,
    writeTasks,
    onTasksChange,
    nowISO,
    uuid,
    type Task,
} from '../../../data/tasks';

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    // добавление
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    // фильтры/поиск
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'done'>('all');
    const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
    const [sort, setSort] = useState<'due' | 'created' | 'title'>('due');
    // редактирование
    const [editId, setEditId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editDueDate, setEditDueDate] = useState('');
    const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>('medium');

    // загрузка и подписка на изменения
    useEffect(() => {
        setTasks(readTasks());
        const unsubscribe = onTasksChange(() => {
            setTasks(readTasks());
        });
        return unsubscribe;
    }, []);

    // отображаемый список
    const view = useMemo(() => {
        let list = [...tasks];
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(
                (t) =>
                    t.title.toLowerCase().includes(q) ||
                    t.description.toLowerCase().includes(q),
            );
        }
        if (statusFilter !== 'all') {
            list = list.filter((t) => (statusFilter === 'done' ? t.done : !t.done));
        }
        if (priorityFilter !== 'all') {
            list = list.filter((t) => t.priority === priorityFilter);
        }
        list.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            if (sort === 'title') return a.title.localeCompare(b.title);
            if (sort === 'created') return a.createdAt < b.createdAt ? 1 : -1;
            // сортировка по сроку
            const aDue = a.dueDate || '';
            const bDue = b.dueDate || '';
            if (aDue && bDue) return aDue > bDue ? 1 : -1;
            if (aDue) return -1;
            if (bDue) return 1;
            return 0;
        });
        return list;
    }, [tasks, query, statusFilter, priorityFilter, sort]);

    // добавление задачи
    function addTask() {
        if (!title.trim() && !description.trim()) return;
        const task: Task = {
            id: uuid(),
            title: title.trim() || 'Без названия',
            description: description.trim(),
            createdAt: nowISO(),
            updatedAt: nowISO(),
            dueDate: dueDate || null,
            priority,
            done: false,
            pinned: false,
        };
        const updated = [task, ...tasks];
        setTasks(updated);
        writeTasks(updated);
        setTitle('');
        setDescription('');
        setDueDate('');
        setPriority('medium');
    }
    function onAddKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    }

    // операции над задачами
    function toggleDone(id: string) {
        const updated = tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done, updatedAt: nowISO() } : t,
        );
        setTasks(updated);
        writeTasks(updated);
    }
    function togglePin(id: string) {
        const updated = tasks.map((t) =>
            t.id === id ? { ...t, pinned: !t.pinned, updatedAt: nowISO() } : t,
        );
        setTasks(updated);
        writeTasks(updated);
    }
    function remove(id: string) {
        const updated = tasks.filter((t) => t.id !== id);
        setTasks(updated);
        writeTasks(updated);
        if (editId === id) cancelEdit();
    }
    function startEdit(t: Task) {
        setEditId(t.id);
        setEditTitle(t.title);
        setEditDescription(t.description);
        setEditDueDate(t.dueDate || '');
        setEditPriority(t.priority);
    }
    function cancelEdit() {
        setEditId(null);
        setEditTitle('');
        setEditDescription('');
        setEditDueDate('');
        setEditPriority('medium');
    }
    function saveEdit() {
        if (!editId) return;
        const updated = tasks.map((t) =>
            t.id === editId
                ? {
                    ...t,
                    title: editTitle.trim() || 'Без названия',
                    description: editDescription.trim(),
                    dueDate: editDueDate || null,
                    priority: editPriority,
                    updatedAt: nowISO(),
                }
                : t,
        );
        setTasks(updated);
        writeTasks(updated);
        cancelEdit();
    }
    function clearDone() {
        const updated = tasks.filter((t) => !t.done);
        setTasks(updated);
        writeTasks(updated);
    }
    function markAllDone() {
        const updated = tasks.map((t) =>
            t.done ? t : { ...t, done: true, updatedAt: nowISO() },
        );
        setTasks(updated);
        writeTasks(updated);
    }

    return (
        <main>
            {/* Панель управления: поиск, фильтры, сортировка, массовые действия */}
            <section className="card toolbar">
                <div className="toolbar-left">
                    <input
                        className="input"
                        placeholder="Поиск…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="toolbar-right">
                    <select
                        className="input select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                    >
                        <option value="all">Все</option>
                        <option value="active">Активные</option>
                        <option value="done">Сделанные</option>
                    </select>
                    <select
                        className="input select"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value as any)}
                    >
                        <option value="all">Любой приоритет</option>
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                    <select
                        className="input select"
                        value={sort}
                        onChange={(e) => setSort(e.target.value as any)}
                    >
                        <option value="due">По сроку</option>
                        <option value="created">Сначала новые</option>
                        <option value="title">По названию A→Я</option>
                    </select>
                    <button className="button" onClick={markAllDone}>
                        Отметить всё
                    </button>
                    <button className="button" onClick={clearDone}>
                        Удалить сделанные
                    </button>
                </div>
            </section>

            {/* Форма добавления новой задачи */}
            <section className="card add-task">
                <h2>Новая задача</h2>
                <input
                    className="input"
                    placeholder="Название"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="textarea"
                    placeholder="Описание"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onKeyDown={onAddKeyDown}
                />
                <div className="add-task-row">
                    <input
                        type="date"
                        className="input"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <select
                        className="input select"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as any)}
                    >
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                </div>
                <div className="card-footer">
                    <button className="button" onClick={addTask}>
                        Добавить
                    </button>
                </div>
            </section>

            {/* Список всех задач */}
            <section className="card">
                <div className="card-header">
                    <h2>Все задачи</h2>
                    <span className="muted">{view.length} / {tasks.length}</span>
                </div>
                {view.length === 0 ? (
                    <p className="empty">Ничего не найдено</p>
                ) : (
                    <div className="tasks-list">
                        {view.map((t) => (
                            <article
                                key={t.id}
                                className={`task-row ${t.done ? 'is-done' : ''}`}
                            >
                                <div className="task-main">
                                    <input
                                        type="checkbox"
                                        checked={!!t.done}
                                        onChange={() => toggleDone(t.id)}
                                        aria-label="Сделано"
                                    />
                                    {editId === t.id ? (
                                        <div className="edit-fields">
                                            <input
                                                className="input"
                                                value={editTitle}
                                                onChange={(e) => setEditTitle(e.target.value)}
                                            />
                                            <textarea
                                                className="textarea"
                                                rows={3}
                                                value={editDescription}
                                                onChange={(e) => setEditDescription(e.target.value)}
                                            />
                                            <div className="edit-row">
                                                <input
                                                    type="date"
                                                    className="input"
                                                    value={editDueDate}
                                                    onChange={(e) => setEditDueDate(e.target.value)}
                                                />
                                                <select
                                                    className="input select"
                                                    value={editPriority}
                                                    onChange={(e) =>
                                                        setEditPriority(e.target.value as any)
                                                    }
                                                >
                                                    <option value="low">Низкий</option>
                                                    <option value="medium">Средний</option>
                                                    <option value="high">Высокий</option>
                                                </select>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="task-texts">
                                            <div className="task-title">
                                                {t.title}
                                                {t.pinned && (
                                                    <span className="badge" style={{ marginLeft: 8 }}>
                            pin
                          </span>
                                                )}
                                            </div>
                                            {t.description && (
                                                <div className="task-description">{t.description}</div>
                                            )}
                                            <div className="task-meta muted">
                                                создано: {new Date(t.createdAt).toLocaleString()} • изм.:
                                                {new Date(t.updatedAt).toLocaleString()}
                                                {t.dueDate && (
                                                    <> • срок: {new Date(t.dueDate).toLocaleDateString()}</>
                                                )}
                                                <> • приоритет: {t.priority === 'low' ? 'низкий' : t.priority === 'medium' ? 'средний' : 'высокий'}</>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="task-actions">
                                    {editId === t.id ? (
                                        <>
                                            <button className="button" onClick={saveEdit}>
                                                Сохранить
                                            </button>
                                            <button className="button" onClick={cancelEdit}>
                                                Отмена
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button className="button" onClick={() => startEdit(t)}>
                                                Редакт.
                                            </button>
                                            <button className="button" onClick={() => togglePin(t.id)}>
                                                {t.pinned ? 'Открепить' : 'Закрепить'}
                                            </button>
                                            <button className="button" onClick={() => remove(t.id)}>
                                                Удалить
                                            </button>
                                        </>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}