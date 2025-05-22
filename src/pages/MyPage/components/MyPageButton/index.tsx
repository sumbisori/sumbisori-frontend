import { ReactNode } from 'react';
import RightBracketIcon from '@/icons/right-bracket.svg?react';
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon: ReactNode;
}

export const MyPageButton = ({ children, icon, ...props }: Props) => {
  return (
    <button
      className="flex w-full items-center justify-between border-b border-gray-400 px-2 py-6 text-lg font-semibold transition-colors duration-200 ease-in-out hover:text-[#00b1ff] active:text-[#00b1ff]"
      {...props}
    >
      <div className="flex items-center gap-2">
        {icon}
        {children}
      </div>
      <RightBracketIcon />
    </button>
  );
};
