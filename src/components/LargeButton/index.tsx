interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const LargeButton = ({ children, ...props }: Props) => {
  return (
    <button
      className="w-full rounded-md bg-[#007AFF] py-2 text-[16px] text-white"
      {...props}
    >
      {children}
    </button>
  );
};
