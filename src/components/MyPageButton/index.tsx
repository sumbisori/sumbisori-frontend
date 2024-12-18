interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon: string;
}

export const MyPageButton = ({ children, icon, ...props }: Props) => {
  return (
    <button
      className="flex w-full items-center justify-between border-b border-gray-500 px-4 py-6 text-[1.125rem] font-semibold transition-colors duration-200 ease-in-out hover:text-[#00b1ff]"
      {...props}
    >
      <div className="flex gap-4">
        <img src={`/icons/my_page/${icon}.svg`} />
        {children}
      </div>
      <img src="/icons/right-bracket.svg" />
    </button>
  );
};
