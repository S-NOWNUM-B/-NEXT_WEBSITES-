import Link from "next/link";
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footerContent}>
                <div className={styles.columns}>
                    <div className={styles.column}>
                        <h4>О блоге</h4>
                        <p>Место для обмена знаниями и опытом в области технологий и разработки</p>
                    </div>
                    <div className={styles.column}>
                        <h4>Навигация</h4>
                        <ul className={styles.navLinks}>
                            <li><Link href="/">Главная</Link></li>
                            <li><Link href="/blog">Блог</Link></li>
                            <li><Link href="/about">О блоге</Link></li>
                            <li><Link href="/contact">Контакты</Link></li>
                        </ul>
                    </div>
                    <div className={styles.column}>
                        <h4>Контакты</h4>
                        <p>Свяжитесь с нами для сотрудничества или вопросов</p>
                    </div>
                </div>
                <div className={styles.copyright}>
                    © 2025, все права защищены
                </div>
            </div>
        </footer>
    );
}