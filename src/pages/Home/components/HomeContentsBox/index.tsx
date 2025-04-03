import { useHeaderVisibility } from '@/contexts/src/HeaderVisibilityContext';
import { forwardRef, ReactNode, useEffect, useState } from 'react';

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
    const { showHeader } = useHeaderVisibility();

    const [lateShowHeader, setLateShowHeader] = useState(showHeader);

    useEffect(() => {
      setTimeout(() => {
        setLateShowHeader(showHeader);
      }, 100);
    }, [showHeader]);

    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-[1.25rem] bg-white',

          lateShowHeader ? 'scroll-mt-[3.688rem]' : 'scroll-mt-[7.438rem]',
        )}
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
