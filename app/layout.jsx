import { Header, LoginModal, RegisterModal, RentModal } from '@/components';
import './globals.css';
import { Nunito } from 'next/font/google';
import Toast from '@/lib/Toast';
import { getCurrentUser } from './actions/getCurrentUser';

const nunito = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb clone',
  description:
    'Find the perfect place to stay at an amazing price. Belong anywhere with Airbnb.',
};

export default async function RootLayout({ children }) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toast />
        <RentModal/>
        <RegisterModal />
        <LoginModal />
        <Header currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
