import './styles/global.css';

import Header from './(pages)/components/Header/Header';
import Footer from './(pages)/components/Footer/Footer';

import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "Шаблон сайта",
    description: "Описание",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
        <body>
        <div className="layout">
            <Header />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
        </body>
        </html>
    );
}