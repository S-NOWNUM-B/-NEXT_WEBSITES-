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
                    <span className={styles.logoText}>Мой Блог</span>
                </Link>

                {/*Центральная часть Header*/}
                <nav className={styles.navLinks}>
                    <Link href="/blog">Блог</Link>
                    <Link href="/about">О блоге</Link>
                </nav>

                {/*Правая часть Header*/}
                <div className={styles.profileLink}>
                    <Link href="/contact">Контакты</Link>
                </div>

            </div>
        </header>
    );
}