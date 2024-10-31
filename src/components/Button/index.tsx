interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: Props) => {
  return (
    <button {...props} className="rounded-md bg-blue-500 px-4 py-2 text-white">
      {children}
    </button>
  );
};
