// Mock данные для форума
export interface ForumTopic {
  id: number;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
  category: string;
}

export const forumTopics: ForumTopic[] = [
  {
    id: 1,
    title: "Добро пожаловать на наш форум!",
    author: "Админ",
    replies: 15,
    lastActivity: "2 часа назад",
    category: "Общее"
  },
  {
    id: 2,
    title: "Обсуждение новых функций Next.js 15",
    author: "developer123",
    replies: 8,
    lastActivity: "4 часа назад",
    category: "Разработка"
  },
  {
    id: 3,
    title: "Помощь с настройкой TypeScript",
    author: "newbie",
    replies: 23,
    lastActivity: "1 день назад",
    category: "Помощь"
  },
  {
    id: 4,
    title: "Лучшие практики CSS модулей",
    author: "designer",
    replies: 12,
    lastActivity: "2 дня назад",
    category: "Дизайн"
  },
  {
    id: 5,
    title: "Как оптимизировать производительность React?",
    author: "performance_guru",
    replies: 31,
    lastActivity: "3 дня назад",
    category: "Оптимизация"
  }
];

export interface Note {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags: string[];
}

export const notes: Note[] = [
  {
    id: 1,
    title: "Заметки по React Hooks",
    content: "Основные принципы использования useState и useEffect...",
    author: "developer123",
    createdAt: "2025-01-10",
    tags: ["React", "Hooks", "JavaScript"]
  },
  {
    id: 2,
    title: "CSS Grid vs Flexbox",
    content: "Сравнение CSS Grid и Flexbox для различных случаев...",
    author: "designer",
    createdAt: "2025-01-08",
    tags: ["CSS", "Layout", "Design"]
  },
  {
    id: 3,
    title: "Настройка ESLint для TypeScript",
    content: "Пошаговое руководство по настройке ESLint...",
    author: "coder",
    createdAt: "2025-01-05",
    tags: ["TypeScript", "ESLint", "Configuration"]
  }
];
