# Social Network Template on Next.js

Современный шаблон социальной сети на Next.js 15 с TypeScript и собственной CSS архитектурой.  
Готовое решение для создания социальных платформ с системой общения, друзей и обмена контентом.

---

## Возможности

**Основная функциональность:**
- Лента новостей с постами пользователей
- Система друзей и подписок с заявками
- Личные сообщения и интерфейс чата
- Профили пользователей с полной информацией
- Статистика активности и взаимодействий

**Технические особенности:**
- Next.js 15 с App Router архитектурой
- TypeScript для полной типобезопасности
- Собственная CSS система вместо Tailwind
- Модульная архитектура стилей
- Локальное хранение данных (готово для интеграции с API)
- Полная адаптивность для всех устройств
- Sticky навигация и современный UI

---

## Установка и настройка

### Требования
- Node.js версии 18 или выше (рекомендуется версия 20+)
- Менеджер пакетов: npm, pnpm или yarn

### Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки с Turbopack
npm run dev
# Откройте http://localhost:3000
```

### Продакшн сборка

```bash
# Сборка проекта
npm run build

# Запуск продакшн версии
npm run start

# Проверка кода
npm run lint
```

---

## Структура проекта

```
src/
├── app/
│   ├── (pages)/             # Группированные страницы
│   │   ├── components/      # UI компоненты
│   │   │   ├── Header/      # Навигационная панель
│   │   │   │   └── Header.tsx
│   │   │   └── Footer/      # Футер сайта
│   │   │       └── Footer.tsx
│   │   ├── profile/         # Страница профиля
│   │   │   └── page.tsx
│   │   ├── friends/         # Страница друзей
│   │   │   └── page.tsx
│   │   ├── messages/        # Страница сообщений
│   │   │   └── page.tsx
│   │   └── page.tsx         # Главная страница
│   ├── styles/              # CSS стили
│   │   ├── globals.css      # Глобальные стили
│   │   ├── header.css       # Стили шапки
│   │   ├── footer.css       # Стили футера
│   │   ├── home.css         # Стили главной страницы
│   │   ├── profile.css      # Стили профиля
│   │   ├── friends.css      # Стили страницы друзей
│   │   └── messages.css     # Стили сообщений
│   └── layout.tsx           # Основной layout
├── data/
│   └── socialData.ts        # Mock данные и типы
public/
└── favicon.ico              # Иконка сайта
```

---

## Функциональность

### Главная страница
- Приветствие и описание платформы
- Статистика активности (пользователи, посты, сообщения)
- Быстрые переходы к основным разделам

### Система пользователей
- Детальные профили с персональной информацией
- Аватары и биографии пользователей
- Статистика активности (посты, друзья, подписчики)
- Лента постов пользователя с изображениями

### Друзья и связи
- Система заявок в друзья (отправка/принятие)
- Управление списком друзей
- Рекомендации новых друзей
### Сообщения
- Интерфейс чата с разделенным экраном
- Список активных чатов с превью последних сообщений
- Полноценный интерфейс переписки
- Индикаторы непрочитанных сообщений
- Отметки времени для всех сообщений

---

## Дизайн-система

Проект использует собственную CSS архитектуру с модульным подходом:

**Основная цветовая палитра:**
```css
/* Цвета интерфейса */
#f9fafb         /* Фон страницы */
#ffffff         /* Фон карточек */
#111827         /* Основной текст */
#6b7280         /* Вторичный текст */
#2563eb         /* Акцентные элементы */
#e5e7eb         /* Границы */
```

**Ключевые компоненты:**
- Карточки: `.profile-card`, `.friends-card`, `.home-stat-card`
- Кнопки: `.home-btn-primary`, `.friends-btn-primary`, `.profile-edit-btn`
- Навигация: `.header-wrapper`, `.nav-links`
- Сетки: `.friends-grid`, `.home-stats`

**CSS Модули:**
- `header.css` - стили навигации и брендинга
- `footer.css` - стили футера и ссылок
- `home.css` - стили главной страницы и статистики
- `profile.css` - стили профиля и постов
- `friends.css` - стили системы друзей
- `messages.css` - стили интерфейса чата

**Адаптивность:**
- Mobile First подход
- Breakpoints: 640px, 768px, 1024px
- Flexbox и Grid для современных макетов
- Отзывчивые компоненты и типографика

---

## Настройка и кастомизация

### Модификация стилей

Отредактируйте соответствующие CSS файлы в `src/app/styles/`:

```css
/* Изменение цветовой схемы в header.css */
.logo-icon {
    background: linear-gradient(135deg, #10b981, #059669); /* Зеленая тема */
}

/* Изменение кнопок в home.css */
.home-btn-primary {
    background: #7c3aed; /* Фиолетовая тема */
}
```

### Создание новых страниц

1. Создайте папку в `src/app/(pages)/`
2. Добавьте файл `page.tsx`
3. Создайте соответствующий CSS файл в `src/app/styles/`
4. Добавьте импорт CSS в `layout.tsx`
5. Обновите навигацию в Header компоненте

### Интеграция с бэкендом

Замените mock данные на API вызовы:

```typescript
// Пример замены локальных данных
export const getPosts = async (): Promise<Post[]> => {
  const response = await fetch('/api/posts');
  return response.json();
};
```

---

## Типы данных

```typescript
interface User {
  id: number;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
}

interface Post {
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

interface Message {
  id: number;
  fromUserId: number;
  toUserId: number;
  content: string;
  timestamp: string;
  read: boolean;
}
```

---

## Развертывание

### Vercel (рекомендуется)
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Загрузите папку .next на Netlify
```

### Docker
```bash
docker build -t social-network-template .
docker run -p 3000:3000 social-network-template
```

---

## Технологический стек

- Framework: Next.js 15 с App Router
- Язык: TypeScript
- Стили: Собственная CSS архитектура
- React: v19
- Сборщик: Turbopack (встроен в Next.js)
- Линтер: ESLint с конфигом Next.js
- Данные: localStorage с TypeScript интерфейсами

---

## Лицензия

MIT License - свободное использование для личных и коммерческих проектов.

---

## Поддержка и развитие

**Участие в проекте:**
1. Создайте форк репозитория
2. Создайте feature branch (`git checkout -b feature/NewFeature`)
3. Зафиксируйте изменения (`git commit -m 'Add NewFeature'`)
4. Отправьте изменения (`git push origin feature/NewFeature`)
5. Создайте Pull Request

**Техническая поддержка:**
Для вопросов и предложений создавайте issues в репозитории проекта.
