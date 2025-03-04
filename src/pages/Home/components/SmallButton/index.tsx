import { ReactNode } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  children: ReactNode;
  className?: string;
}

export const SmallButton = ({
  selected,
  children,
  className = 'px-7 py-2',
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center whitespace-nowrap rounded-lg border',
        !selected && 'border-gray-500 bg-white text-gray-500',
        selected && 'border-blue-700 bg-blue-50 text-blue-700',
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
