import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

interface ModalState {
  openedModals: Set<string>;
  openModal: (id: string) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalState>({} as ModalState);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [openedModals, setOpenedModals] = useState<Set<string>>(new Set());
  const location = useLocation();

  const openModal = (id: string) => {
    setOpenedModals((prev) => new Set([...prev, id]));
  };

  const closeModal = (id: string) => {
    setOpenedModals((prev) => {
      const updated = new Set(prev);
      updated.delete(id);
      return updated;
    });
  };

  const closeAllModals = () => {
    setOpenedModals(new Set());
  };

  useEffect(() => {
    closeAllModals();
  }, [location]);

  return (
    <ModalContext.Provider
      value={{ openedModals, openModal, closeModal, closeAllModals }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalController = () => useContext(ModalContext);
