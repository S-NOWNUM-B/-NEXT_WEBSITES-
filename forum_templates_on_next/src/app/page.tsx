import Link from "next/link";
import { forumTopics } from "../data/forumData";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Добро пожаловать на форум
        </h1>
        <p className="text-gray-600 text-lg">
          Обсуждайте интересные темы, делитесь знаниями и находите единомышленников.
        </p>
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Последние обсуждения
          </h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Создать тему
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {forumTopics.map((topic) => (
              <div key={topic.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {topic.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                      <Link href={`/topic/${topic.id}`}>
                        {topic.title}
                      </Link>
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Автор: <span className="font-medium">{topic.author}</span></span>
                      <span>•</span>
                      <span>{topic.replies} ответов</span>
                      <span>•</span>
                      <span>Последняя активность: {topic.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            📝 Заметки
          </h3>
          <p className="text-gray-600 mb-4">
            Ведите личные заметки и делитесь полезной информацией.
          </p>
          <Link 
            href="/notes" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Перейти к заметкам →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            👤 Профиль
          </h3>
          <p className="text-gray-600 mb-4">
            Управляйте своим профилем и настройками аккаунта.
          </p>
          <Link 
            href="/profile" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Открыть профиль →
          </Link>
        </div>
      </section>
    </div>
  );
}
