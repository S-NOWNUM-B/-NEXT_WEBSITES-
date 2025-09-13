export default function ProfilePage() {
  const userData = {
    name: "Иван Иванов",
    email: "ivan@example.com",
    joinDate: "Январь 2025",
    postsCount: 42,
    reputation: 156,
    avatar: "https://via.placeholder.com/100"
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Профиль пользователя
      </h1>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Профиль */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl text-gray-600">👤</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {userData.name}
              </h2>
              <p className="text-gray-600 mb-4">{userData.email}</p>
              <p className="text-sm text-gray-500">
                На форуме с {userData.joinDate}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Статистика
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Сообщений:</span>
                <span className="font-medium">{userData.postsCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Репутация:</span>
                <span className="font-medium">{userData.reputation}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Настройки */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Настройки профиля
            </h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  defaultValue={userData.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={userData.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  О себе
                </label>
                <textarea
                  rows={4}
                  placeholder="Расскажите о себе..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Сохранить изменения
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Последняя активность
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-gray-900">Создал новую тему "Обсуждение React 19"</p>
                <p className="text-sm text-gray-500">2 часа назад</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <p className="text-gray-900">Ответил в теме "Помощь с TypeScript"</p>
                <p className="text-sm text-gray-500">1 день назад</p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="text-gray-900">Создал заметку "CSS Grid Layout"</p>
                <p className="text-sm text-gray-500">3 дня назад</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
