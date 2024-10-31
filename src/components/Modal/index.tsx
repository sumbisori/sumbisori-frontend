import { ReactNode, MouseEvent } from 'react';
import ModalPortal from './ModalPortal';
import { useModalContext } from '../../contexts/ModalContext';
import { Button } from '../Button';

interface Props {
  id: string;
  title?: string;
  children: ReactNode;
}

export function Modal({ id, title: label, children }: Props) {
  const { openModals, closeModal } = useModalContext();
  const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {openModals[id] && (
        <ModalPortal>
          <div
            onClick={(e) => handleBackgroundClick(e)}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/20"
          >
            <div
              className={`flex h-2/3 w-[393px] flex-col justify-between rounded-t-lg bg-gray-050 shadow-lg transition-transform duration-200`}
            >
              <div className="flex w-full items-center p-4 text-lg font-bold">
                <span>{label}</span>
              </div>
              <div className="overflow-auto p-4">{children}</div>
              <Button
                className="bg-blue-300 py-3 font-bold text-white"
                onClick={() => closeModal()}
              >
                닫기
              </Button>
            </div>
          </div>
        </ModalPortal>
      )}
    </>
  );
}
