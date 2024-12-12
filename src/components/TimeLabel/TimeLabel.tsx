interface TimeLabelProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected?: boolean;
}

export const TimeLabel = ({
  children,
  isSelected,
  ...props
}: TimeLabelProps) => {
  return (
    <button
      className={`${
        isSelected
          ? 'border border-[#007AFF] bg-[#ebf5ff] text-[#007AFF]'
          : 'border border-[#gray-200] bg-gray-000 text-[#B1B1B1]'
      } w-fit cursor-pointer rounded-md px-4 py-2 text-[0.75rem] transition-colors duration-200 ease-in-out hover:border-[#007AFF] hover:bg-[#ebf5ff] hover:text-[#007AFF]`}
      {...props}
    >
      {children}
    </button>
  );
};
