interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const LargeButton = ({ children, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'flex w-full justify-center rounded-md py-2 text-base',
        props.disabled
          ? 'w-full cursor-not-allowed rounded-md border border-gray-500 bg-gray-100 py-2 text-base text-gray-500'
          : 'flex w-full justify-center rounded-md border border-blue-700 bg-blue-700 py-2 text-base text-white hover:bg-blue-800 active:bg-blue-800',
      )}
      {...props}
    >
      {children}
    </button>
  );
};
