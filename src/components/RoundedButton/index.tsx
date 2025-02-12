interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  styleClass?: string;
  buttonType: 'primary' | 'secondary';
}

export const RoundedButton = ({
  children,
  buttonType,
  styleClass,
  ...props
}: Props) => {
  return (
    <button
      className={`whitespace-nowrap rounded-[1.25rem] border px-4 py-2.5 leading-none ${BUTTON_VARIANTS[buttonType]} ${styleClass}`}
      {...props}
    >
      {children}
    </button>
  );
};

const BUTTON_VARIANTS = {
  primary: 'bg-blue-700 hover:bg-blue-800  border-blue-700 text-white',
  secondary: 'bg-white hover:bg-gray-100  border-gray-300 text-black',
};
