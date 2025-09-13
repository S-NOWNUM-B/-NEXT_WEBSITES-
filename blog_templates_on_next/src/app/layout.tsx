import './styles/global.css';

import Header from './(pages)/components/Header/Header';
import Footer from './(pages)/components/Footer/Footer';

import { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "Мой Блог - современный шаблон на Next.js",
    description: "Современный шаблон блога на Next.js с TypeScript и CSS Modules. Идеально подходит для технических блогов и личных сайтов.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ru">
        <body>
        <div className="layout" style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column' 
        }}>
            <Header />
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
        </body>
        </html>
    );
}