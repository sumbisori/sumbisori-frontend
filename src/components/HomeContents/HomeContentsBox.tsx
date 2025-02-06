import { forwardRef, ReactNode } from 'react';
import Skeleton from '../Skeleton';

interface HomeContentsBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  view: ReactNode;
  boxTitle: string | null;
  boxTitleLoading?: boolean;
  icon?: ReactNode;
  contentClassName?: string;
}

export const HomeContentsBox = forwardRef<HTMLDivElement, HomeContentsBoxProps>(
  (
    {
      view,
      boxTitle,
      icon,
      contentClassName,
      boxTitleLoading = false,
      ...props
    }: HomeContentsBoxProps,
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className="scroll-mt-[3.688rem] rounded-[1.25rem] bg-white"
        {...props}
      >
        <div className="flex items-center justify-between p-5">
          {boxTitleLoading ? (
            <Skeleton variant="text" width="100%" height="1.5rem" />
          ) : (
            <h2 className="text-[1.25rem] font-bold leading-6">{boxTitle}</h2>
          )}
          {icon}
        </div>
        <div className={`${contentClassName} px-5 pb-5`}>{view}</div>
      </div>
    );
  },
);

HomeContentsBox.displayName = 'HomeContentsBox';
