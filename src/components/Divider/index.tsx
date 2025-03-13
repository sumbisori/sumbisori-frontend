interface Props {
  className?: string;
  color?: string;
}

export const Divider = ({ className, color = 'bg-gray-200' }: Props) => {
  return <div id="divider" className={clsx(`h-px w-full`, color, className)} />;
};
