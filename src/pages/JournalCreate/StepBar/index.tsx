interface Props {
  current: number;
  total: number;
}

export const StepBar = ({ current, total }: Props) => {
  const steps = Array.from({ length: total }, (_, index) => index + 1);
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${total}, 1fr)` }}
    >
      {steps.map((step) => (
        <div
          className={clsx(
            'h-1 rounded-3xl',
            step <= current ? 'bg-blue-500' : 'bg-gray-100',
          )}
          key={step}
        />
      ))}
    </div>
  );
};
