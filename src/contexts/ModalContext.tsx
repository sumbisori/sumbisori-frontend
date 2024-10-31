import { ReactNode, createContext, useContext, useState } from 'react';

interface ModalState {
  openModals: { [id: string]: boolean };
  openModal: (id: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalState>({} as ModalState);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [openModals, setOpenModals] = useState<{ [id: string]: boolean }>({});

  const openModal = (id: string) => {
    setOpenModals((prev) => ({ ...prev, [id]: true }));
  };

  const closeModal = () => {
    setOpenModals({});
  };

  return (
    <ModalContext.Provider value={{ openModals, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
