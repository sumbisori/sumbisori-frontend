import { forwardRef, ReactNode } from 'react';
import Skeleton from '../Skeleton';

interface HomeContentsBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  view: ReactNode;
  boxTitle: ReactNode;
  icon?: ReactNode;
  contentClassName?: string;
}

export const HomeContentsBox = forwardRef<HTMLDivElement, HomeContentsBoxProps>(
  (
    { view, boxTitle, icon, contentClassName, ...props }: HomeContentsBoxProps,
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className="scroll-mt-[3.688rem] rounded-[1.25rem] bg-white"
        {...props}
      >
        <div className="flex items-center justify-between p-5">
          <h2 className="w-full text-xl font-bold leading-6">{boxTitle}</h2>
          {icon}
        </div>
        <div className={`${contentClassName} px-5 pb-5`}>{view}</div>
      </div>
    );
  },
);

HomeContentsBox.displayName = 'HomeContentsBox';
