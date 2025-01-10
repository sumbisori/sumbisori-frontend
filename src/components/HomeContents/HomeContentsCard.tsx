import { ReactNode } from 'react';

interface Props {
  content: ReactNode;
  label: string;
  sizeType: 'lg' | 'md';
}

export const HomeContentsCard = ({ content, label, sizeType }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <div
        className={`flex w-full ${SIZE_TYPE_VARIANT[sizeType]} items-center justify-center rounded-2xl border border-gray-card-border bg-gray-card`}
      >
        {content}
      </div>
      <p className="flex w-full justify-center text-[0.875rem] text-charcoal-gray">
        {label}
      </p>
    </div>
  );
};

const SIZE_TYPE_VARIANT = {
  lg: 'max-w-32 min-w-[5.625rem]  h-[3.75rem]',
  md: 'size-[3.75rem]',
};
