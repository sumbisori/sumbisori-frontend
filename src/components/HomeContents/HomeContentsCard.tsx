import { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  view: ReactNode;
  label: string;
  sizeType: 'lg' | 'md';
  type?: 'button' | 'content';
}

export const HomeContentsCard = ({
  type = 'content',
  view,
  label,
  sizeType,
  ...props
}: Props) => {
  const buttonTypeStyle =
    type === 'button' ? 'cursor-pointer hover:bg-gray-200' : '';
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className={`flex w-full ${SIZE_TYPE_VARIANT[sizeType]} items-center justify-center rounded-2xl border border-gray-card-border bg-gray-card ${buttonTypeStyle}`}
        {...props}
      >
        {view}
      </div>
      <p className="flex w-full justify-center whitespace-nowrap text-[0.875rem] text-charcoal-gray">
        {label}
      </p>
    </div>
  );
};

const SIZE_TYPE_VARIANT = {
  lg: 'size-full aspect-[3/2] min-w-[5.625rem]',
  md: 'size-full aspect-square min-w-[3.75rem] ',
};
