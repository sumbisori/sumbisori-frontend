import { ButtonHTMLAttributes } from 'react';
import ArrowRight from '@/icons/arrow_right.svg?react';

interface HomeChangeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const HomeChangeButton = ({ ...props }: HomeChangeButtonProps) => {
  return (
    <button
      {...props}
      className="flex h-[1.375rem] items-center justify-center gap-0.5 rounded-s-sm border border-gray-400 px-2.5"
    >
      <p className="text-[0.75rem]">변경</p>
      <ArrowRight />
    </button>
  );
};
