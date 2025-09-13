// Общая библиотека для работы с задачами. Аналогична notes.ts, но хранит
// отдельную структуру `Task` и использует другой ключ в localStorage.

export type Task = {
    id: string;
    title: string;
    description: string;
    createdAt: string; // ISO
    updatedAt: string; // ISO
    dueDate: string | null; // ISO или null
    priority: 'low' | 'medium' | 'high';
    done: boolean;
    pinned: boolean;
};

export const TASKS_KEY = 'tasks';
const UPDATED_EVENT = 'tasks:updated';

function safeParse<T>(raw: string | null, fallback: T): T {
    if (!raw) return fallback;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return fallback;
    }
}

// Нормализуем входной список: добавляем недостающие поля,
// чтобы старые данные не ломали интерфейс.
function normalize(list: Task[]): Task[] {
    return (Array.isArray(list) ? list : []).map((t) => ({
        id: t.id,
        title: t.title ?? 'Без названия',
        description: t.description ?? '',
        createdAt: t.createdAt ?? new Date().toISOString(),
        updatedAt: t.updatedAt ?? new Date().toISOString(),
        dueDate: t.dueDate ?? null,
        priority: t.priority ?? 'medium',
        done: !!t.done,
        pinned: !!t.pinned,
    }));
}

export function readTasks(): Task[] {
    if (typeof window === 'undefined') return [];
    const data = safeParse<Task[]>(localStorage.getItem(TASKS_KEY), []);
    return normalize(data);
}

export function writeTasks(list: Task[]): void {
    if (typeof window === 'undefined') return;
    // сохраняем нормализованную копию
    localStorage.setItem(TASKS_KEY, JSON.stringify(normalize(list)));
    // уведомляем все слушатели в этом окне
    window.dispatchEvent(new Event(UPDATED_EVENT));
}

// Подписка на изменения задач. При каждом обновлении хранилища
// (из этого окна или другого) вызывается cb. Возвращает функцию
// отписки, которую следует вызвать при размонтировании компонента.
export function onTasksChange(cb: () => void): () => void {
    const handler = () => cb();
    window.addEventListener(UPDATED_EVENT, handler);
    // слушаем обновление localStorage между вкладками
    const storageHandler = (e: StorageEvent) => {
        if (e.key === TASKS_KEY) cb();
    };
    window.addEventListener('storage', storageHandler);
    return () => {
        window.removeEventListener(UPDATED_EVENT, handler);
        window.removeEventListener('storage', storageHandler);
    };
}

export const nowISO = () => new Date().toISOString();

export const uuid = (): string => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
};