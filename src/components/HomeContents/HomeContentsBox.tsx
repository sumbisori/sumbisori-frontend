import { forwardRef, ReactNode } from 'react';

interface HomeContentsBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  view: ReactNode;
  title: string;
  icon?: ReactNode;
  contentClassName?: string;
}

export const HomeContentsBox = forwardRef<HTMLDivElement, HomeContentsBoxProps>(
  (
    { view, title, icon, contentClassName, ...props }: HomeContentsBoxProps,
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className="scroll-mt-[4.688rem] rounded-[1.25rem] bg-white"
        {...props}
      >
        <div className="flex items-center justify-between p-5">
          <h2 className="text-[1.25rem] font-bold leading-6">{title}</h2>
          {icon}
        </div>
        <div className={`${contentClassName} p-5`}>{view}</div>
      </div>
    );
  },
);
