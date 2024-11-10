interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon: string;
}

export const MyPageButton = ({ children, icon, ...props }: Props) => {
  return (
    <button
      className="flex w-full items-center justify-between border-b border-gray-500 px-[16px] py-[24px] text-[18px] font-semibold transition-colors duration-200 ease-in-out hover:text-[#00b1ff]"
      {...props}
    >
      <div className="flex gap-[10px]">
        <img src={`/icons/my_page/${icon}.svg`} />
        {children}
      </div>
      <img src="/icons/right-bracket.svg" />
    </button>
  );
};
