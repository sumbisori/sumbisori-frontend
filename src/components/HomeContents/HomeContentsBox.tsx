import { ReactNode } from 'react';

interface HomeContentsBoxProps {
  content: ReactNode;
  title: string;
  icon?: ReactNode;
  contentClassName?: string;
}

export const HomeContentsBox = ({
  content,
  title,
  icon,
  contentClassName,
}: HomeContentsBoxProps) => {
  return (
    <div className="rounded-[1.25rem] bg-white">
      <div className="flex items-center justify-between p-5">
        <h2 className="text-[1.25rem] font-bold leading-6">{title}</h2>
        {icon}
      </div>
      <div className={`${contentClassName} p-5`}>{content}</div>
    </div>
  );
};
