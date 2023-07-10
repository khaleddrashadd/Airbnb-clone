import { Header, Modal } from '@/components';
import './globals.css';
import { Nunito } from 'next/font/google';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Ait bnb clone',
  description:
    'Find the perfect place to stay at an amazing price. Belong anywhere with Airbnb.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Modal
          isOpen
          actionLabel="submit"
        />
        <Header />
        {children}
      </body>
    </html>
  );
}
