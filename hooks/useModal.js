import { create } from 'zustand';

const useModal = create(set => ({
  loginIsOpen: false,
  registerIsOpen: false,
  rentModalIsOpen: false,
  loginOnOpen: () => set(() => ({ loginIsOpen: true })),
  loginOnClose: () => set(() => ({ loginIsOpen: false })),
  registerOnOpen: () => set(() => ({ registerIsOpen: true })),
  registerOnClose: () => set(() => ({ registerIsOpen: false })),
  rentModalOnOpen: () => set(() => ({ rentModalIsOpen: true })),
  rentModalOnClose: () => set(() => ({ rentModalIsOpen: false })),
}));

export default useModal;
