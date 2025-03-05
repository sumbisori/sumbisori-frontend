interface Props {
  className?: string;
}

export const Spinner = ({ className }: Props) => {
  return (
    <div className={clsx('flex items-center justify-center', className)}>
      <div className="size-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"></div>
    </div>
  );
};
