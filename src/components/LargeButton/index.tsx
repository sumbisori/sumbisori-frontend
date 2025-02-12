interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const LargeButton = ({ children, ...props }: Props) => {
  return (
    <button
      className={
        props.disabled
          ? 'w-full cursor-not-allowed rounded-md bg-gray-400 py-2 text-base text-white'
          : 'flex w-full justify-center rounded-md bg-[#007AFF] py-2 text-base text-white'
      }
      {...props}
    >
      {children}
    </button>
  );
};
