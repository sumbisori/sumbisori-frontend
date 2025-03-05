import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'black';
}

export const IconButton = ({
  children,
  className,
  variant = 'default',
  ...props
}: Props) => {
  return (
    <button {...props} className={clsx(BUTTON_VARIANTS[variant], className)}>
      {children}
    </button>
  );
};

const BUTTON_VARIANTS = {
  default:
    'cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-100',
  black:
    'cursor-pointer rounded-full bg-[#2B2D3652] p-1.5 hover:bg-[#2B2D3680]',
};
