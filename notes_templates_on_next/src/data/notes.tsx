// Хранилище и утилиты для заметок. Аналогичны tasks.ts, но без срока и приоритета.

export type Note = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    done?: boolean;
    pinned?: boolean;
};

export const NOTES_KEY = 'notes';
const UPDATED_EVENT = 'notes:updated';

function safeParse<T>(raw: string | null, fallback: T): T {
    if (!raw) return fallback;
    try { return JSON.parse(raw) as T; } catch { return fallback; }
}

function normalize(list: Note[]): Note[] {
    return (Array.isArray(list) ? list : []).map((n) => ({
        id: n.id,
        title: n.title ?? 'Без названия',
        content: n.content ?? '',
        createdAt: n.createdAt ?? new Date().toISOString(),
        updatedAt: n.updatedAt ?? new Date().toISOString(),
        done: !!n.done,
        pinned: !!n.pinned,
    }));
}

export function readNotes(): Note[] {
    if (typeof window === 'undefined') return [];
    const data = safeParse<Note[]>(localStorage.getItem(NOTES_KEY), []);
    return normalize(data);
}

export function writeNotes(list: Note[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(NOTES_KEY, JSON.stringify(normalize(list)));
    window.dispatchEvent(new Event(UPDATED_EVENT));
}

// подписка на изменения заметок: уведомляет при изменении localStorage
export function onNotesChange(cb: () => void): () => void {
    const handler = () => cb();
    window.addEventListener(UPDATED_EVENT, handler);
    const storageHandler = (e: StorageEvent) => {
        if (e.key === NOTES_KEY) cb();
    };
    window.addEventListener('storage', storageHandler);
    return () => {
        window.removeEventListener(UPDATED_EVENT, handler);
        window.removeEventListener('storage', storageHandler);
    };
}

export const nowISO = () => new Date().toISOString();
export const uuid = () =>
    (typeof crypto !== 'undefined' && 'randomUUID' in crypto)
        ? (crypto as any).randomUUID()
        : `${Date.now()}_${Math.random().toString(16).slice(2)}`;