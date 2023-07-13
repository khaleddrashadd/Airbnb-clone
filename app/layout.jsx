import { Header, RegisterModal } from '@/components';
import './globals.css';
import { Nunito } from 'next/font/google';
import Toast from '@/lib/Toast';

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
        <Toast />
        <RegisterModal />
        <Header />
        {children}
      </body>
    </html>
  );
}
