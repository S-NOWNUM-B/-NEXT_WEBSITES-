'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import '../../styles/profile.css';

type Profile = {
    name: string;
    email: string;
    bio: string;
    theme: 'auto' | 'light' | 'dark';
};

type Note = {
    id: string;
    title: string;
    content?: string;
    done?: boolean;
    pinned?: boolean;
    updatedAt: string | number | Date;
};

type Task = {
    id: string;
    title: string;
    description?: string;
    done?: boolean;
    pinned?: boolean;
    priority?: 'low' | 'medium' | 'high';
    dueDate?: string | number | Date | null;
    updatedAt: string | number | Date;
};

/* ---------- утилиты для localStorage ---------- */
function readLocal<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}
function writeLocal<T>(key: string, value: T) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
}

/* ---------- страница ---------- */
export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile>({
        name: '',
        email: '',
        bio: '',
        theme: 'auto',
    });

    const [notes, setNotes] = useState<Note[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const fileRef = useRef<HTMLInputElement>(null);

    // загрузка
    useEffect(() => {
        setProfile(readLocal<Profile>('profile', { name: '', email: '', bio: '', theme: 'auto' }));
        setNotes(readLocal<Note[]>('notes', []));
        setTasks(readLocal<Task[]>('tasks', []));
    }, []);

    // статистика
    const stats = useMemo(() => {
        const notesTotal = notes.length;
        const notesDone = notes.filter(n => n.done).length;
        const tasksTotal = tasks.length;
        const tasksDone = tasks.filter(t => t.done).length;
        const pinned = notes.filter(n => n.pinned).length + tasks.filter(t => t.pinned).length;
        return { notesTotal, notesDone, tasksTotal, tasksDone, pinned };
    }, [notes, tasks]);

    // сохранить профиль
    const saveProfile = () => writeLocal('profile', profile);

    // тема (минимально: кладём в localStorage и на html data-theme)
    useEffect(() => {
        if (profile.theme === 'auto') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', profile.theme);
        }
    }, [profile.theme]);

    // экспорт/импорт/очистка
    const exportAll = () => {
        const payload = {
            profile,
            notes,
            tasks,
            exportedAt: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'notes-template-data.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const importAll = async (file: File) => {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            if (data.profile) writeLocal('profile', data.profile);
            if (data.notes) writeLocal('notes', data.notes);
            if (data.tasks) writeLocal('tasks', data.tasks);
            // обновим стейт
            setProfile(readLocal<Profile>('profile', { name: '', email: '', bio: '', theme: 'auto' }));
            setNotes(readLocal<Note[]>('notes', []));
            setTasks(readLocal<Task[]>('tasks', []));
            alert('Данные импортированы');
        } catch {
            alert('Не удалось импортировать файл');
        }
    };

    const clearAll = () => {
        if (confirm('Удалить локальные данные профиля, заметок и задач?')) {
            localStorage.removeItem('profile');
            localStorage.removeItem('notes');
            localStorage.removeItem('tasks');
            setProfile({ name: '', email: '', bio: '', theme: 'auto' });
            setNotes([]);
            setTasks([]);
        }
    };

    const initials = (profile.name || 'Пользователь')
        .split(' ')
        .map(w => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return (
        <main>
            {/* Профиль */}
            <section className="card">
                <div className="card-header">
                    <h2>Профиль</h2>
                </div>

                <div className="profile-grid">
                    <div className="avatar" aria-hidden>{initials}</div>

                    <div className="profile-fields">
                        <label className="field">
                            <span className="label">Имя</span>
                            <input
                                className="input"
                                value={profile.name}
                                onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                                placeholder="Как к вам обращаться?"
                            />
                        </label>

                        <label className="field">
                            <span className="label">Email</span>
                            <input
                                className="input"
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                                placeholder="example@mail.com"
                            />
                        </label>

                        <label className="field">
                            <span className="label">О себе</span>
                            <textarea
                                className="textarea"
                                rows={4}
                                value={profile.bio}
                                onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                                placeholder="Короткая заметка о себе"
                            />
                        </label>

                        <label className="field">
                            <span className="label">Тема</span>
                            <select
                                className="select"
                                value={profile.theme}
                                onChange={(e) => setProfile(p => ({ ...p, theme: e.target.value as Profile['theme'] }))}
                            >
                                <option value="auto">Системная</option>
                                <option value="light">Светлая</option>
                                <option value="dark">Тёмная</option>
                            </select>
                        </label>

                        <div className="profile-actions">
                            <button className="button" onClick={saveProfile}>Сохранить</button>
                            <button className="button" onClick={exportAll}>Экспорт</button>
                            <button
                                className="button"
                                onClick={() => fileRef.current?.click()}
                                aria-label="Импортировать данные из файла"
                            >
                                Импорт
                            </button>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="application/json"
                                hidden
                                onChange={(e) => {
                                    const f = e.target.files?.[0];
                                    if (f) importAll(f);
                                    e.currentTarget.value = '';
                                }}
                            />
                            <button className="button" onClick={clearAll}>Очистить всё</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Статистика */}
            <section className="card">
                <div className="card-header">
                    <h2>Статистика</h2>
                </div>
                <div className="stats">
                    <div className="stat">
                        <div className="stat-label">Заметок всего</div>
                        <div className="stat-value">{stats.notesTotal}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-label">Заметок готово</div>
                        <div className="stat-value">{stats.notesDone}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-label">Задач всего</div>
                        <div className="stat-value">{stats.tasksTotal}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-label">Задач готово</div>
                        <div className="stat-value">{stats.tasksDone}</div>
                    </div>
                    <div className="stat">
                        <div className="stat-label">Закреплено</div>
                        <div className="stat-value">{stats.pinned}</div>
                    </div>
                </div>
            </section>
        </main>
    );
}