import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  buttonType?: 'primary' | 'secondary';
  className?: string;
}

export const LargeButton = ({
  children,
  buttonType = 'primary',
  className,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        'flex w-full justify-center rounded-md py-2 text-base focus:outline-none',
        props.disabled
          ? 'w-full cursor-not-allowed rounded-md border border-gray-500 bg-gray-100 py-2 text-base text-gray-500'
          : BUTTON_VARIANTS[buttonType],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const BUTTON_VARIANTS = {
  primary:
    'bg-blue-700 hover:bg-blue-800 active:bg-blue-800 border-blue-700 text-white',
  secondary:
    'border-blue-700 bg-blue-500/15 text-blue-700 hover:bg-blue-500/20 active:bg-blue-500/20',
};
