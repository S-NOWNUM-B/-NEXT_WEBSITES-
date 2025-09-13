import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="header-wrapper">
            <div className="header-content">
                <Link href="/" className="logo-section">
                    <div className="logo-icon">SN</div>
                    <span className="logo-text">SocialNet</span>
                </Link>

                <nav className="nav-links">
                    <Link href="/profile">Профиль</Link>
                    <Link href="/friends">Друзья</Link>
                    <Link href="/messages">Сообщения</Link>
                </nav>

                <div className="profile-section">
                    <div className="profile-info">
                        <Image
                            src="/api/placeholder/32/32"
                            alt="Аватар пользователя"
                            width={32}
                            height={32}
                            className="avatar"
                        />
                        <span>Мой аккаунт</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
