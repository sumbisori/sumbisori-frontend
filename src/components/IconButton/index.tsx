import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const IconButton = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className="cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
    >
      {children}
    </button>
  );
};
