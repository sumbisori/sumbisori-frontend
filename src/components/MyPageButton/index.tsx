interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const MyPageButton = ({ children, ...props }: Props) => {
  return (
    <button
      className="flex w-full items-center justify-between border-b border-gray-500 p-[10px] text-[18px] font-semibold transition-colors duration-200 ease-in-out hover:text-[#00b1ff]"
      {...props}
    >
      {children}
      <img src="/icons/right-bracket.svg" />
    </button>
  );
};
