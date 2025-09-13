// Типы данных для социальной сети
export interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
}

export interface Post {
  id: number;
  userId: number;
  user: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  liked: boolean;
}

export interface Message {
  id: number;
  fromUserId: number;
  toUserId: number;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Friend {
  id: number;
  userId: number;
  friendId: number;
  status: 'pending' | 'accepted' | 'blocked';
  timestamp: string;
}

// Mock данные пользователей
export const mockUsers: User[] = [
  {
    id: 1,
    name: "Анна Козлова",
    username: "anna_kozlova",
    avatar: "/api/placeholder/40/40",
    bio: "Frontend разработчик. Люблю React и TypeScript 💻",
    followers: 342,
    following: 156,
    posts: 28
  },
  {
    id: 2,
    name: "Дмитрий Петров",
    username: "dmitry_dev",
    avatar: "/api/placeholder/40/40",
    bio: "Backend разработчик в стартапе. Python и Go enthusiast 🐍",
    followers: 578,
    following: 234,
    posts: 45
  },
  {
    id: 3,
    name: "Мария Сидорова",
    username: "maria_designer",
    avatar: "/api/placeholder/40/40",
    bio: "UI/UX дизайнер с опытом 5+ лет. Создаю красивые интерфейсы ✨",
    followers: 892,
    following: 367,
    posts: 67
  },
  {
    id: 4,
    name: "Алексей Иванов",
    username: "alex_fullstack",
    avatar: "/api/placeholder/40/40", 
    bio: "Fullstack разработчик. React + Node.js = ❤️",
    followers: 423,
    following: 189,
    posts: 34
  }
];

// Mock данные постов
export const mockPosts: Post[] = [
  {
    id: 1,
    userId: 1,
    user: mockUsers[0],
    content: "Сегодня изучаю новые возможности React 19! Concurrent features выглядят потрясающе 🚀",
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: "2 часа назад",
    liked: false
  },
  {
    id: 2,
    userId: 2,
    user: mockUsers[1],
    content: "Запустил новый микросервис на Go. Производительность впечатляет! 🔥",
    image: "/api/placeholder/500/300",
    likes: 67,
    comments: 15,
    shares: 12,
    timestamp: "4 часа назад", 
    liked: true
  },
  {
    id: 3,
    userId: 3,
    user: mockUsers[2],
    content: "Работаю над новым дизайн-системой. Скоро покажу результат! 🎨",
    likes: 45,
    comments: 12,
    shares: 8,
    timestamp: "6 часов назад",
    liked: false
  }
];

// Mock данные сообщений
export const mockMessages: Message[] = [
  {
    id: 1,
    fromUserId: 2,
    toUserId: 1,
    content: "Привет! Как дела с новым проектом?",
    timestamp: "2025-09-14T10:30:00",
    read: true
  },
  {
    id: 2,
    fromUserId: 1,
    toUserId: 2,
    content: "Привет! Всё отлично, спасибо! Как у тебя дела?",
    timestamp: "2025-09-14T10:35:00",
    read: true
  },
  {
    id: 3,
    fromUserId: 2,
    toUserId: 1,
    content: "Тоже хорошо! Хочешь вместе поработать над чем-то интересным?",
    timestamp: "2025-09-14T10:40:00",
    read: false
  },
  {
    id: 4,
    fromUserId: 3,
    toUserId: 1,
    content: "Анна, посмотри мои новые макеты, пожалуйста!",
    timestamp: "2025-09-14T09:15:00",
    read: false
  },
  {
    id: 5,
    fromUserId: 1,
    toUserId: 3,
    content: "Конечно! Скинь ссылку",
    timestamp: "2025-09-14T09:20:00",
    read: true
  }
];

// Mock данные друзей
export const mockFriends: Friend[] = [
  {
    id: 1,
    userId: 1,
    friendId: 2,
    status: 'accepted',
    timestamp: "2025-09-10T15:00:00"
  },
  {
    id: 2,
    userId: 1,
    friendId: 3,
    status: 'accepted',
    timestamp: "2025-09-12T10:30:00"
  },
  {
    id: 3,
    userId: 4,
    friendId: 1,
    status: 'pending',
    timestamp: "2025-09-14T08:45:00"
  }
];

// Функции для работы с localStorage (можно заменить на API вызовы)
export const getPosts = (): Post[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('socialPosts');
    return saved ? JSON.parse(saved) : mockPosts;
  }
  return mockPosts;
};

export const savePosts = (posts: Post[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('socialPosts', JSON.stringify(posts));
  }
};

export const getUsers = (): User[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('socialUsers');
    return saved ? JSON.parse(saved) : mockUsers;
  }
  return mockUsers;
};

export const saveUsers = (users: User[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('socialUsers', JSON.stringify(users));
  }
};

export const getMessages = (): Message[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('socialMessages');
    return saved ? JSON.parse(saved) : mockMessages;
  }
  return mockMessages;
};

export const saveMessages = (messages: Message[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('socialMessages', JSON.stringify(messages));
  }
};

export const getFriends = (): Friend[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('socialFriends');
    return saved ? JSON.parse(saved) : mockFriends;
  }
  return mockFriends;
};

export const saveFriends = (friends: Friend[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('socialFriends', JSON.stringify(friends));
  }
};
