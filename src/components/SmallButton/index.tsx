import { ReactNode } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: ReactNode;
  className?: string;
}

export const SmallButton = ({
  selected = false,
  children,
  className = 'px-7 py-2',
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center whitespace-nowrap rounded-lg border',
        !selected &&
          'border-gray-500 bg-white text-gray-500 hover:bg-gray-100 active:bg-gray-100',
        selected &&
          'border-blue-700 bg-blue-500/15 text-blue-700 hover:bg-blue-500/20 active:bg-blue-500/20',
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
