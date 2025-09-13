import Link from "next/link";
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footerContent}>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h4>О сайте</h4>
                        <p>Здесь будет краткая информация о сайте</p>
                    </div>
                    <div className={styles.column}>
                        <h4>Навигация</h4>
                        <ul className={styles.navLinks}>
                            <li><Link href="/">Главная</Link></li>
                            <li><Link href="/notes">Заметки</Link></li>
                            <li><Link href="/tasks">Задания</Link></li>
                            <li><Link href="/profile">Профиль</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h4>Контакты</h4>
                        <p>Здесь будут контактные данные</p>
                    </div>
                </div>
                <div className={styles.copyright}>
                    © 2025, все права защищены
                </div>
            </div>
        </footer>
    );
}