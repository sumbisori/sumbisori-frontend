interface Props {
  children: React.ReactNode;
  className?: string;
  type: 'primary' | 'secondary';
}

export const Chip = ({ children, className, type }: Props) => {
  return (
    <div
      className={clsx(
        'w-fit rounded-3xl px-3 py-1 text-xs font-semibold',
        TYPE_VARIANTS[type],
        className,
      )}
    >
      {children}
    </div>
  );
};

const TYPE_VARIANTS = {
  primary: 'bg-blue-500/20 text-blue-700',
  secondary: 'bg-white text-blue-500',
};
