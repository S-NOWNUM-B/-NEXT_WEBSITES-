# Forum Template on Next.js

Современный шаблон форума на Next.js 15 с TypeScript и Tailwind CSS для создания интерактивных сообществ.  
Готовое решение для форумов, обсуждений и Q&A платформ с адаптивным дизайном.

---

## Возможности

**Основная функциональность:**
- Система форума с темами обсуждений и ответами
- Организация контента по категориям
- Личные заметки пользователей с системой тегов
- Профиль пользователя с настройками
- Статические данные (готово для интеграции с API)

**Технические особенности:**
- Next.js 15 с App Router
- TypeScript для типобезопасности
- Tailwind CSS 4 для современного дизайна
- Полная адаптивность для всех устройств
- SEO оптимизация и высокая производительность

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
│   ├── (page)/              # Группированные страницы
│   │   ├── components/      # UI компоненты
│   │   │   ├── Header.tsx   # Шапка сайта
│   │   │   └── Footer.tsx   # Футер
│   │   ├── notes/           # Страница заметок
│   │   │   └── page.tsx
│   │   └── profile/         # Страница профиля
│   │       └── page.tsx
│   ├── layout.tsx           # Основной layout
│   ├── page.tsx             # Главная страница форума
│   └── styles/
│       └── globals.css      # Глобальные стили
├── data/
│   └── forumData.ts         # Mock данные форума
public/
└── favicon.ico              # Иконка сайта
```

---

## Функциональность

### Главная страница форума
- Последние обсуждения с информацией об авторах и активности
- Категории тем: Общее, Разработка, Помощь, Дизайн, Оптимизация
- Функционал создания новых тем
- Статистика: количество ответов и время последней активности

### Заметки
- Личные заметки пользователя
- Система тегов для категоризации
- Создание и управление заметками
- Карточный интерфейс с превью контента

### Профиль
- Информация о пользователе
- Статистика активности
- Настройки аккаунта

---

## Дизайн-система

Проект использует Tailwind CSS 4 с современными утилитами:

**Основная цветовая палитра:**
```css
/* Основные цвета */
bg-gray-50      /* Светлый фон */
bg-white        /* Фон карточек */
text-gray-900   /* Основной текст */
text-gray-600   /* Вторичный текст */
bg-blue-600     /* Акцентный цвет кнопок */
border-gray-200 /* Границы элементов */
```

**Ключевые компоненты:**
- Карточки: `bg-white rounded-lg shadow-sm border`
- Кнопки: `bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700`
- Контейнеры: `container mx-auto px-4 py-8`
- Сетки: `grid gap-6 md:grid-cols-2 lg:grid-cols-3`

**Адаптивность:**
Полностью адаптивный дизайн с breakpoints:
- Mobile: до 768px - одноколоночная компоновка
- Tablet: 768px+ - двухколоночная сетка
- Desktop: 1024px+ - трехколоночная сетка

---

## Настройка и кастомизация

### Добавление тем форума

Отредактируйте `src/data/forumData.ts`:

```typescript
export const forumTopics: ForumTopic[] = [
  {
    id: 6,
    title: "Новая тема обсуждения",
    author: "username",
    replies: 0,
    lastActivity: "только что",
    category: "Новая категория"
  }
];
```

### Создание новых страниц

1. Создайте новую папку в `src/app/(page)/`
2. Добавьте файл `page.tsx`
3. Обновите навигацию в `Header.tsx`

### Интеграция с API

Замените статические данные на API вызовы:

```typescript
// Вместо import { forumTopics }
const fetchTopics = async () => {
  const response = await fetch('/api/topics');
  return response.json();
};
```

### Настройка Tailwind

Кастомизируйте `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#your-color',
        // другие цвета
      }
    }
  }
}
```

---

## Типы данных

```typescript
interface ForumTopic {
  id: number;
  title: string;
  author: string;
  replies: number;
  lastActivity: string;
  category: string;
}

interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
}
```

---

## Развертывание

### Vercel (рекомендуется)
```bash
# Автоматический деплой через Git
vercel --prod
```

### Netlify
```bash
npm run build
# Загрузите папку .next на Netlify
```

### Docker
```bash
docker build -t forum-template .
docker run -p 3000:3000 forum-template
```

---

## Технологический стек

- Framework: Next.js 15 с App Router
- Язык: TypeScript
- Стили: Tailwind CSS 4
- React: v19
- Сборщик: Turbopack (встроен в Next.js)
- Линтер: ESLint с конфигом Next.js

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
