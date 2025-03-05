interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const LargeButton = ({ children, ...props }: Props) => {
  return (
    <button
      className={clsx(
        props.disabled
          ? 'w-full cursor-not-allowed rounded-md bg-gray-400 py-2 text-base text-white'
          : 'flex w-full justify-center rounded-md bg-blue-700 py-2 text-base text-white hover:bg-blue-800 active:bg-blue-800',
      )}
      {...props}
    >
      {children}
    </button>
  );
};
