export const Divider = ({ className }: { className?: string }) => {
  return (
    <div id="divider" className={clsx('h-px w-full bg-gray-200', className)} />
  );
};
