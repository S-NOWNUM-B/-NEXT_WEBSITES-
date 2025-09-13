'use client';

import { useEffect, useMemo, useState } from 'react';
import '../../styles/notes.css';
import {
    readNotes,
    writeNotes,
    onNotesChange,
    nowISO,
    uuid,
    type Note
} from '../../../data/notes';

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [query, setQuery] = useState('');
    const [filter, setFilter] =
        useState<'all' | 'active' | 'done'>('all');
    const [sort, setSort] =
        useState<'updated' | 'created' | 'title'>('updated');

    const [editId, setEditId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    // загружаем данные и подписываемся на обновления
    useEffect(() => {
        setNotes(readNotes());
        const unsubscribe = onNotesChange(() => {
            setNotes(readNotes());
        });
        return unsubscribe;
    }, []);

    const view = useMemo(() => {
        let list = [...notes];
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(
                (n) =>
                    n.title.toLowerCase().includes(q) ||
                    n.content.toLowerCase().includes(q)
            );
        }
        if (filter !== 'all') {
            list = list.filter((n) =>
                filter === 'done' ? n.done : !n.done,
            );
        }
        list.sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            if (sort === 'title')
                return a.title.localeCompare(b.title);
            if (sort === 'created')
                return a.createdAt < b.createdAt ? 1 : -1;
            return a.updatedAt < b.updatedAt ? 1 : -1;
        });
        return list;
    }, [notes, query, filter, sort]);

    // добавление
    function addNote() {
        if (!title.trim() && !content.trim()) return;
        const note: Note = {
            id: uuid(),
            title: title.trim() || 'Без названия',
            content: content.trim(),
            createdAt: nowISO(),
            updatedAt: nowISO(),
            done: false,
            pinned: false,
        };
        const updated = [note, ...notes];
        setNotes(updated);
        writeNotes(updated);      // сохраняем изменения
        setTitle('');
        setContent('');
    }
    function onAddKeyDown(
        e: React.KeyboardEvent<HTMLTextAreaElement>
    ) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            addNote();
        }
    }

    // операции над заметкой
    function toggleDone(id: string) {
        const updated = notes.map((n) =>
            n.id === id
                ? {
                    ...n,
                    done: !n.done,
                    updatedAt: nowISO(),
                }
                : n,
        );
        setNotes(updated);
        writeNotes(updated);
    }
    function togglePin(id: string) {
        const updated = notes.map((n) =>
            n.id === id
                ? {
                    ...n,
                    pinned: !n.pinned,
                    updatedAt: nowISO(),
                }
                : n,
        );
        setNotes(updated);
        writeNotes(updated);
    }
    function remove(id: string) {
        const updated = notes.filter((n) => n.id !== id);
        setNotes(updated);
        writeNotes(updated);
        if (editId === id) cancelEdit();
    }
    function startEdit(n: Note) {
        setEditId(n.id);
        setEditTitle(n.title);
        setEditContent(n.content);
    }
    function cancelEdit() {
        setEditId(null);
        setEditTitle('');
        setEditContent('');
    }
    function saveEdit() {
        if (!editId) return;
        const updated = notes.map((n) =>
            n.id === editId
                ? {
                    ...n,
                    title:
                        editTitle.trim() || 'Без названия',
                    content: editContent.trim(),
                    updatedAt: nowISO(),
                }
                : n,
        );
        setNotes(updated);
        writeNotes(updated);
        cancelEdit();
    }
    function clearDone() {
        const updated = notes.filter((n) => !n.done);
        setNotes(updated);
        writeNotes(updated);
    }
    function markAllDone() {
        const updated = notes.map((n) =>
            n.done
                ? n
                : { ...n, done: true, updatedAt: nowISO() },
        );
        setNotes(updated);
        writeNotes(updated);
    }

    return (
        <main>
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
                        value={filter}
                        onChange={(e) =>
                            setFilter(e.target.value as any)
                        }
                    >
                        <option value="all">Все</option>
                        <option value="active">Активные</option>
                        <option value="done">Сделанные</option>
                    </select>
                    <select
                        className="input select"
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value as any)
                        }
                    >
                        <option value="updated">
                            Сначала обновлённые
                        </option>
                        <option value="created">
                            Сначала новые
                        </option>
                        <option value="title">
                            По названию A→Я
                        </option>
                    </select>
                    <button
                        className="button"
                        onClick={markAllDone}
                    >
                        Отметить всё
                    </button>
                    <button
                        className="button"
                        onClick={clearDone}
                    >
                        Удалить сделанные
                    </button>
                </div>
            </section>

            <section className="card add">
                <h2>Новая заметка</h2>
                <input
                    className="input"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="textarea"
                    placeholder="Текст"
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={onAddKeyDown}
                />
                <div className="card-footer">
                    <button
                        className="button"
                        onClick={addNote}
                    >
                        Добавить
                    </button>
                </div>
            </section>

            <section className="card">
                <div className="card-header">
                    <h2>Все заметки</h2>
                    <span className="muted">
            {view.length} / {notes.length}
          </span>
                </div>

                {view.length === 0 ? (
                    <p className="empty">Ничего не найдено</p>
                ) : (
                    <div className="notes-list">
                        {view.map((n) => (
                            <article
                                key={n.id}
                                className={`note-row ${
                                    n.done ? 'is-done' : ''
                                }`}
                            >
                                <div className="row-main">
                                    <input
                                        type="checkbox"
                                        checked={!!n.done}
                                        onChange={() => toggleDone(n.id)}
                                        aria-label="Сделано"
                                    />
                                    {editId === n.id ? (
                                        <div className="edit-fields">
                                            <input
                                                className="input"
                                                value={editTitle}
                                                onChange={(e) =>
                                                    setEditTitle(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                            <textarea
                                                className="textarea"
                                                rows={3}
                                                value={editContent}
                                                onChange={(e) =>
                                                    setEditContent(
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <div className="note-texts">
                                            <div className="note-title">
                                                {n.title}
                                                {n.pinned && (
                                                    <span
                                                        className="badge"
                                                        style={{
                                                            marginLeft: 8,
                                                        }}
                                                    >
                            pin
                          </span>
                                                )}
                                            </div>
                                            {n.content && (
                                                <div className="note-content">
                                                    {n.content}
                                                </div>
                                            )}
                                            <div className="note-meta muted">
                                                создано:{' '}
                                                {new Date(
                                                    n.createdAt,
                                                ).toLocaleString()}{' '}
                                                • изм.:{' '}
                                                {new Date(
                                                    n.updatedAt,
                                                ).toLocaleString()}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="row-actions">
                                    {editId === n.id ? (
                                        <>
                                            <button
                                                className="button"
                                                onClick={saveEdit}
                                            >
                                                Сохранить
                                            </button>
                                            <button
                                                className="button"
                                                onClick={cancelEdit}
                                            >
                                                Отмена
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="button"
                                                onClick={() =>
                                                    startEdit(n)
                                                }
                                            >
                                                Редакт.
                                            </button>
                                            <button
                                                className="button"
                                                onClick={() =>
                                                    togglePin(n.id)
                                                }
                                            >
                                                {n.pinned
                                                    ? 'Открепить'
                                                    : 'Закрепить'}
                                            </button>
                                            <button
                                                className="button"
                                                onClick={() =>
                                                    remove(n.id)
                                                }
                                            >
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