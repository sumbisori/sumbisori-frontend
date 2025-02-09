import { ReactNode } from 'react';

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  type?: 'button' | 'content';
  size?: string;
  className?: string;
}

export const SquareGrayCard = ({
  children,
  type = 'content',
  size = '100%',
  className = '',
  ...props
}: Props) => {
  return (
    <div
      className={`flex aspect-square min-w-[3.125rem] cursor-pointer items-center justify-center rounded-2xl border border-gray-card-border bg-gray-card ${type === 'button' ? 'hover:bg-gray-200' : ''} ${className} `}
      style={{
        width: size,
        height: size,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
