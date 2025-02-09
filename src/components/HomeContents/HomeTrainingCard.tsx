import { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  view: ReactNode;
  label: string;
  type?: 'button' | 'content';
}

export const HomeTrainingCard = ({
  type = 'content',
  view,
  label,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className={`flex aspect-square size-full w-full min-w-[3.125rem] cursor-pointer items-center justify-center rounded-2xl border border-gray-card-border bg-gray-card hover:bg-gray-200`}
        {...props}
      >
        {view}
      </div>
      <div className="flex w-full justify-center whitespace-nowrap text-[0.875rem] text-charcoal-gray">
        {label}
      </div>
    </div>
  );
};
