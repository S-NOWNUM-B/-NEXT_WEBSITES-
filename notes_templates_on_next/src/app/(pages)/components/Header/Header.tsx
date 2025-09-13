import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.headerWrapper}>

            {/*Логотип*/}
            <div className={styles.headerContent}>
                <Link href="/" className={styles.logoSection}>
                    <Image
                        src="/logo/logo.png"
                        alt="Логотип сайта"
                        width={32}
                        height={32}
                    />
                    <span className={styles.logoText}>Шаблонный текст</span>
                </Link>

                {/*Центральная часть Header*/}
                <nav className={styles.navLinks}>
                    <Link href="/notes">Заметки</Link>
                    <Link href="/tasks">Задачи</Link>
                </nav>

                {/*Правая часть Header*/}
                <div className={styles.profileLink}>
                    <Link href="/profile">Профиль</Link>
                </div>

            </div>
        </header>
    );
}