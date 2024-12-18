interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const GrayButton = ({ children, ...props }: Props) => {
  return (
    <button
      {...props}
      className="flex h-11 w-[22rem] justify-between rounded bg-gray-050 px-4 py-2.5 text-subtitle-1 font-normal"
    >
      {children}
      <div
        className="size-6 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/icons/right-bracket.svg)',
        }}
      />
    </button>
  );
};
