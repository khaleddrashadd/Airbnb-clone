import { create } from 'zustand';

const useModal = create(set => ({
  loginIsOpen: false,
  registerIsOpen: false,
  loginOnOpen: () => set(() => ({ loginIsOpen: true })),
  loginOnClose: () => set(() => ({ loginIsOpen: false })),
  registerOnOpen: () => set(() => ({ registerIsOpen: true })),
  registerOnClose: () => set(() => ({ registerIsOpen: false })),
}));

export default useModal;
