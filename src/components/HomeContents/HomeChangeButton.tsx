import { ButtonHTMLAttributes } from 'react';

interface HomeChangeButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const HomeChangeButton = ({ ...props }: HomeChangeButtonProps) => {
  return (
    <button
      {...props}
      className="flex h-[22px] items-center justify-center gap-[2px] rounded-s-sm border border-gray-400 px-[10px]"
    >
      <p className="text-[12px]">변경</p>
      <img src="/icons/arrow_right.svg" />
    </button>
  );
};
