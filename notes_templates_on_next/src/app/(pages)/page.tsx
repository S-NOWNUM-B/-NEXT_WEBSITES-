"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import '../styles/home.css';
import {
    readNotes,
    writeNotes,
    onNotesChange,
    nowISO as noteNowISO,
    uuid as noteUuid,
    type Note,
} from '../../data/notes';
import {
    readTasks,
    writeTasks,
    onTasksChange,
    nowISO as taskNowISO,
    uuid as taskUuid,
    type Task,
} from '../../data/tasks';

// Главная страница: быстрые заметки и задачи, а также последние элементы и статистика.
export default function HomePage() {
    // Хранилище данных
    const [notes, setNotes] = useState<Note[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    // Форма быстрой заметки
    const [noteTitle, setNoteTitle] = useState('');
    const [noteContent, setNoteContent] = useState('');
    const [justSavedNote, setJustSavedNote] = useState(false);
    // Форма быстрой задачи
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [justSavedTask, setJustSavedTask] = useState(false);

    // --- helper functions to update notes and tasks ---
    // toggle note done
    function toggleNoteDone(id: string) {
        const updated = notes.map((n) =>
            n.id === id ? { ...n, done: !n.done, updatedAt: noteNowISO() } : n,
        );
        setNotes(updated);
        writeNotes(updated);
    }
    // toggle note pin
    function toggleNotePin(id: string) {
        const updated = notes.map((n) =>
            n.id === id ? { ...n, pinned: !n.pinned, updatedAt: noteNowISO() } : n,
        );
        setNotes(updated);
        writeNotes(updated);
    }
    // toggle task done
    function toggleTaskDone(id: string) {
        const updated = tasks.map((t) =>
            t.id === id ? { ...t, done: !t.done, updatedAt: taskNowISO() } : t,
        );
        setTasks(updated);
        writeTasks(updated);
    }
    // toggle task pin
    function toggleTaskPin(id: string) {
        const updated = tasks.map((t) =>
            t.id === id ? { ...t, pinned: !t.pinned, updatedAt: taskNowISO() } : t,
        );
        setTasks(updated);
        writeTasks(updated);
    }

    // загрузка и подписка на заметки
    useEffect(() => {
        setNotes(readNotes());
        const unsub = onNotesChange(() => {
            setNotes(readNotes());
        });
        return unsub;
    }, []);
    // загрузка и подписка на задачи
    useEffect(() => {
        setTasks(readTasks());
        const unsub = onTasksChange(() => {
            setTasks(readTasks());
        });
        return unsub;
    }, []);

    // последние записи
    const recentNotes = useMemo(
        () => [...notes].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1)).slice(0, 3),
        [notes],
    );
    const recentTasks = useMemo(
        () => [...tasks].sort((a, b) => {
            // задачи со сроком идут выше, потом без срока; далее по updatedAt
            if (a.dueDate && !b.dueDate) return -1;
            if (!a.dueDate && b.dueDate) return 1;
            if (a.dueDate && b.dueDate) return a.dueDate < b.dueDate ? -1 : 1;
            return a.updatedAt < b.updatedAt ? 1 : -1;
        }).slice(0, 3),
        [tasks],
    );

    // статистика
    const notesCount = notes.length;
    const tasksCount = tasks.length;
    const tasksDone = tasks.filter((t) => t.done).length;

    // Добавить заметку
    function addNote() {
        if (!noteTitle.trim() && !noteContent.trim()) return;
        const note: Note = {
            id: noteUuid(),
            title: noteTitle.trim() || 'Без названия',
            content: noteContent.trim(),
            createdAt: noteNowISO(),
            updatedAt: noteNowISO(),
            done: false,
            pinned: false,
        };
        const updated = [note, ...notes];
        setNotes(updated);
        writeNotes(updated);
        setNoteTitle('');
        setNoteContent('');
        setJustSavedNote(true);
        setTimeout(() => setJustSavedNote(false), 1200);
    }
    function onNoteKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            addNote();
        }
    }

    // Добавить задачу
    function addTask() {
        if (!taskTitle.trim() && !taskDescription.trim()) return;
        const task: Task = {
            id: taskUuid(),
            title: taskTitle.trim() || 'Без названия',
            description: taskDescription.trim(),
            createdAt: taskNowISO(),
            updatedAt: taskNowISO(),
            dueDate: taskDueDate || null,
            priority: taskPriority,
            done: false,
            pinned: false,
        };
        const updated = [task, ...tasks];
        setTasks(updated);
        writeTasks(updated);
        setTaskTitle('');
        setTaskDescription('');
        setTaskDueDate('');
        setTaskPriority('medium');
        setJustSavedTask(true);
        setTimeout(() => setJustSavedTask(false), 1200);
    }
    function onTaskKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    }

    return (
        <main className="main">
            {/* Быстрая заметка */}
            <section className="card quick-note">
                <div className="card-header">
                    <h2>Быстрая заметка</h2>
                </div>
                <input
                    className="input"
                    placeholder="Заголовок"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
                <textarea
                    className="textarea"
                    placeholder="Текст заметки"
                    rows={5}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    onKeyDown={onNoteKeyDown}
                />
                <div className="card-footer">
                    <button className="button" onClick={addNote}>Сохранить</button>
                    {justSavedNote && <span className="saved">✓ Сохранено</span>}
                </div>
            </section>

            {/* Быстрая задача */}
            <section className="card quick-task">
                <div className="card-header">
                    <h2>Быстрая задача</h2>
                </div>
                <input
                    className="input"
                    placeholder="Название"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                <textarea
                    className="textarea"
                    placeholder="Описание"
                    rows={4}
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    onKeyDown={onTaskKeyDown}
                />
                <div className="quick-task-row">
                    <input
                        type="date"
                        className="input"
                        value={taskDueDate}
                        onChange={(e) => setTaskDueDate(e.target.value)}
                    />
                    <select
                        className="input select"
                        value={taskPriority}
                        onChange={(e) => setTaskPriority(e.target.value as any)}
                    >
                        <option value="low">Низкий</option>
                        <option value="medium">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                </div>
                <div className="card-footer">
                    <button className="button" onClick={addTask}>Сохранить</button>
                    {justSavedTask && <span className="saved">✓ Сохранено</span>}
                </div>
            </section>

            {/* Последние заметки */}
            <section className="card">
                <div className="card-header">
                    <h2>Последние заметки</h2>
                </div>
                {recentNotes.length === 0 ? (
                    <p className="empty">Нет заметок</p>
                ) : (
                    <div className="grid">
                        {recentNotes.map((n) => (
                            <article key={n.id} className="note">
                                <div className="note-header">
                                    <h3>{n.title}</h3>
                                    <span className="badge">{new Date(n.updatedAt).toLocaleDateString()}</span>
                                </div>
                                <p>{n.content || '—'}</p>
                                {/* строка метаданных заметки: дата изменения */}
                                <div className="note-meta">
                                    изм.: {new Date(n.updatedAt).toLocaleDateString()}
                                </div>
                                <div className="note-actions-home">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={!!n.done}
                                            onChange={() => toggleNoteDone(n.id)}
                                        />{' '}
                                        Готово
                                    </label>
                                    <button className="button" onClick={() => toggleNotePin(n.id)}>
                                        {n.pinned ? 'Открепить' : 'Закрепить'}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* Последние задачи */}
            <section className="card">
                <div className="card-header">
                    <h2>Последние задачи</h2>
                </div>
                {recentTasks.length === 0 ? (
                    <p className="empty">Нет задач</p>
                ) : (
                    <div className="grid">
                        {recentTasks.map((t) => (
                            <article key={t.id} className="task">
                                {/* заголовок как у заметок; в бейдже — срок или дата изменения */}
                                <div className="note-header">
                                    <h3>{t.title}</h3>
                                    <span className="badge">
              {t.dueDate
                  ? new Date(t.dueDate).toLocaleDateString()
                  : new Date(t.updatedAt).toLocaleDateString()}
            </span>
                                </div>
                                <p>{t.description || '—'}</p>
                                {/* строка метаданных: приоритет и дата изменения */}
                                <div className="task-meta">
                                    Приоритет: {t.priority === 'low' ? 'низкий' : t.priority === 'medium' ? 'средний' : 'высокий'} • изм.: {new Date(t.updatedAt).toLocaleDateString()}
                                </div>
                                <div className="task-actions-home">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={!!t.done}
                                            onChange={() => toggleTaskDone(t.id)}
                                        />{' '}
                                        Готово
                                    </label>
                                    <button className="button" onClick={() => toggleTaskPin(t.id)}>
                                        {t.pinned ? 'Открепить' : 'Закрепить'}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* Статистика */}
            <section className="card stats">
                <div className="stat">
                    <div className="stat-label">Всего заметок</div>
                    <div className="stat-value">{notesCount}</div>
                </div>
                <div className="stat">
                    <div className="stat-label">Всего задач</div>
                    <div className="stat-value">{tasksCount}</div>
                </div>
                <div className="stat">
                    <div className="stat-label">Задачи выполнены</div>
                    <div className="stat-value">{tasksDone}</div>
                </div>
            </section>
        </main>
    );
}