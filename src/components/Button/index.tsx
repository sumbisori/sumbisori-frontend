interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ children, size = 'md', ...props }: Props) => {
  return (
    <button {...props} className="rounded-md bg-primary px-4 py-2 text-white">
      {children}
    </button>
  );
};

const BUTTON_VARIANTS = {
  disabled: '',
  default: '',
  hover: '',
  pressed: '',
};

const BUTTON_SIZES = {
  sm: '',
  md: '',
  lg: '',
};
