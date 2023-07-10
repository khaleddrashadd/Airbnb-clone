'use client';
import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Button } from '..';
import useClickOutside from '@/hooks/use-click-outside';
import { is } from 'date-fns/locale';

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  actionLabel,
  footer,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}) => {
  const [showModal, setShowModal] = useState(isOpen);
  const handleClickOutside = useCallback(() => {
    setShowModal(false);
    onClose();
  }, []);
  const clickRef = useClickOutside(handleClickOutside);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = () => {
    onSubmit();
  };

  const handleSecondaryAction = () => {
    secondaryAction();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-neutral-800/70">
      {/*content*/}
      <div
        className={` w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto  h-full  md:h-auto duration-300 border-0 rounded-lg shadow-lg flex flex-col bg-white ${
          showModal ? 'translate-y-0 opacity-100' : 'opacity-0 translate-y-full'
        }`}
        ref={clickRef}>
        {/*header*/}
        <div className="flex items-center p-6 justify-center relative border-b-1 ">
          <button
            className="p-1border-0 hover:opacity-70 transition absolute left-9"
            onClick={handleClose}>
            <IoMdClose size={18} />
          </button>
          <div className="text-lg font-semibold">{title}</div>
        </div>
        {/*body*/}
        <div className="p-6 flex-auto">{body}</div>
        {/*footer*/}
        <div className="flex flex-col gap-2 p-6">
          <div className="flex flex-row items-center gap-4 w-full">
            {secondaryAction && secondaryActionLabel && (
              <Button
                // disabled={disabled}
                label={secondaryActionLabel}
                onClick={handleSecondaryAction}
              />
            )}
            <Button
              disabled={disabled}
              label={actionLabel}
              onClick={handleSubmit}
            />
          </div>
          {footer}
        </div>
      </div>
    </div>
  );
};
export default Modal;
