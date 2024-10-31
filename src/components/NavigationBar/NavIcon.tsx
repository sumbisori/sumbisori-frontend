import { ReactNode } from 'react';

interface Props {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
}

export const NavIcon = ({ icon, label, onClick }: Props) => {
  return (
    <div
      className="flex flex-col items-center justify-center"
      onClick={onClick}
    >
      {/* icon 자리 */}
      <div className="size-[36px] bg-gray-300" />
      <p className="flex w-[36px] justify-center text-[12px]">{label}</p>
    </div>
  );
};
