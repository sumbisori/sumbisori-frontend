import { FullPageLogo } from '@/layouts/FullPageLogo';
import { Outlet } from 'react-router-dom';

interface Props {
  children?: React.ReactNode;
}

export const MobileLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <FullPageLogo />
      <section
        className={`m-auto flex min-h-full w-full min-w-full-layout max-w-full-layout flex-col bg-gray-000`}
      >
        {children ? children : <Outlet />}
      </section>
    </div>
  );
};
