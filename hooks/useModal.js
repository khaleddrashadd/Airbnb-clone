import { create } from 'zustand';

const useModal = create(set => ({
  loginIsOpen: false,
  registerIsOpen: false,
  rentModalIsOpen: false,
  searchModalIsOpen: false,
  loginOnOpen: () => set(() => ({ loginIsOpen: true })),
  loginOnClose: () => set(() => ({ loginIsOpen: false })),
  registerOnOpen: () => set(() => ({ registerIsOpen: true })),
  registerOnClose: () => set(() => ({ registerIsOpen: false })),
  rentModalOnOpen: () => set(() => ({ rentModalIsOpen: true })),
  rentModalOnClose: () => set(() => ({ rentModalIsOpen: false })),
  searchModalOnOpen: () => set(() => ({ searchModalIsOpen: true })),
  searchModalOnClose: () => set(() => ({ searchModalIsOpen: false })),
}));

export default useModal;
