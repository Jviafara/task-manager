import Modal from '@/components/Modal';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Task Manager',
    description: 'Developed by Jesús Viafara',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-[#f5f6f8]">
                {children}
                <Modal />
            </body>
        </html>
    );
}
