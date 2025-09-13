export default function Home() {
  return (
    <div className="home-container">
      <div className="home-welcome">
        <h1 className="home-title">
          Добро пожаловать в SocialNet
        </h1>
        <p className="home-subtitle">
          Современная социальная сеть для общения и обмена идеями
        </p>
      </div>

      <div className="home-stats">
        <div className="home-stat-card">
          <div className="home-stat-number home-stat-blue">1,234</div>
          <div className="home-stat-label">Активных пользователей</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-number home-stat-green">5,678</div>
          <div className="home-stat-label">Постов сегодня</div>
        </div>
        <div className="home-stat-card">
          <div className="home-stat-number home-stat-purple">12,345</div>
          <div className="home-stat-label">Новых сообщений</div>
        </div>
      </div>

      <div className="home-actions">
        <div className="home-actions-card">
          <h2 className="home-actions-title">
            Начните использовать SocialNet
          </h2>
          <div className="home-actions-buttons">
            <a
              href="/profile"
              className="home-btn-primary"
            >
              Мой профиль
            </a>
            <a
              href="/friends"
              className="home-btn-secondary"
            >
              Найти друзей
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
