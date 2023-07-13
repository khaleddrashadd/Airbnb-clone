'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import { Avatar, MenuItem } from '..';
import { useCallback, useState } from 'react';
import { useRegisterModal } from '@/hooks';
import { useClickOutside } from '@/hooks';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleClickOutside = useCallback(() => {
    setIsOpen(false)
  },[]);
  const clickRef = useClickOutside(handleClickOutside);

  const registerModal = useRegisterModal();

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <nav className="relative">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {}}
          className="hidden md:block font-semibold text-sm py-3 px-4 rounded-full hover:bg-neutral-100 transition">
          Airbnb your home
        </button>
        <button
          onClick={toggleMenu}
          className="p-4 md:py-1 md:px-2 border-1 border-neutral-200 rounded-full flex items-center gap-3 hover:shadow-sm transition">
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </button>
      </div>
      {isOpen && (
        <div
          ref={clickRef}
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem
                label="Login"
                onClick={() => {}}
              />
              <MenuItem
                label="Sign up"
                onClick={registerModal.onOpen}
              />
            </>
          </div>
        </div>
      )}
    </nav>
  );
};
export default UserMenu;
