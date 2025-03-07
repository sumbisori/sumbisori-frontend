interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  buttonType: 'primary' | 'white' | 'gray';
}

export const RoundedButton = ({
  children,
  buttonType,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={clsx(
        'whitespace-nowrap rounded-[1.25rem] border px-4 py-2.5 leading-none',
        BUTTON_VARIANTS[buttonType],
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
  white:
    'bg-white hover:bg-gray-100 active:bg-gray-100 border-gray-300 text-black',
  gray: 'bg-gray-100 hover:bg-gray-200 active:bg-gray-200 border-gray-400 text-black',
};
