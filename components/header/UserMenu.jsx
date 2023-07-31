'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar, MenuItem } from '..';
import { useCallback, useState } from 'react';
import { useClickOutside, useModal } from '@/hooks';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const UserMenu = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router =useRouter()

  const handleClickOutside = useCallback(() => {
    setIsOpen(false);
  }, []);
  const clickRef = useClickOutside(handleClickOutside);

  const modal = useModal();

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  const handleRent = () => {
    if (!currentUser) {
      modal.loginOnOpen()
      return;
    }
    modal.rentModalOnOpen()
  };

  return (
    <nav className="relative">
      <div className="flex items-center gap-3">
        <button
          onClick={handleRent}
          className="hidden md:block font-semibold text-sm py-3 px-4 rounded-full hover:bg-neutral-100 transition">
          Airbnb your home
        </button>
        <button
          onClick={toggleMenu}
          className="p-4 md:py-1 md:px-2 border-1 border-neutral-200 rounded-full flex items-center gap-3 hover:shadow-sm transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </button>
      </div>
      {isOpen && (
        <div
          ref={clickRef}
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My Trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push('/properties')}
                />
                <MenuItem
                  label="Airbnb my home"
                  onClick={() => modal.rentModalOnOpen()}
                />
                <hr />
                <MenuItem
                  label="Sign out"
                  onClick={signOut}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="Login"
                  onClick={modal.loginOnOpen}
                />
                <MenuItem
                  label="Sign up"
                  onClick={modal.registerOnOpen}
                />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
export default UserMenu;
