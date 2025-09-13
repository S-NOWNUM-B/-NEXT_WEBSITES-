import Link from "next/link";

export default function Footer() {
    return (
        <footer className="footer-wrapper">
            <div className="footer-content">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h4>О SocialNet</h4>
                        <p>Современная социальная платформа для общения, обмена идеями и создания сообществ</p>
                    </div>
                    <div className="footer-column">
                        <h4>Навигация</h4>
                        <ul className="footer-nav-links">
                            <li><Link href="/">Главная</Link></li>
                            <li><Link href="/profile">Профиль</Link></li>
                            <li><Link href="/friends">Друзья</Link></li>
                            <li><Link href="/messages">Сообщения</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4>Поддержка</h4>
                        <ul className="footer-nav-links">
                            <li><a href="#help">Помощь</a></li>
                            <li><a href="#privacy">Конфиденциальность</a></li>
                            <li><a href="#terms">Условия использования</a></li>
                            <li><a href="#contact">Связаться с нами</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-copyright">
                    © 2025 SocialNet. Все права защищены.
                </div>
            </div>
        </footer>
    );
}
