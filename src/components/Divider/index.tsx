interface Props {
  className?: string;
  color?: string;
  height?: number;
}

export const Divider = ({
  className,
  color = 'bg-gray-200',
  height = 1,
}: Props) => {
  return (
    <div
      id="divider"
      className={clsx(`w-full`, color, className)}
      style={{
        height,
      }}
    />
  );
};
