import { NavigationBar } from '@/layouts/NavigationBar';
import { Header } from '@/layouts/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { routes } from '@/routes/src/routes';

interface Props {
  hasNavigation?: boolean;
  hasHeader?: boolean;
  children?: React.ReactNode;
}

export default function MainLayout({
  hasNavigation = true,
  hasHeader = true,
  children,
}: Props) {
  const location = useLocation();

  const getHeaderType = (
    pathname: string,
  ): {
    type: 'light' | 'dark';
    caption: string | null;
    absolute: boolean;
  } => {
    switch (pathname) {
      case routes.home:
        return {
          type: 'dark',
          caption: null,
          absolute: false,
        };
      case routes.haenyeoPlaces:
        return {
          type: 'dark',
          caption: null,
          absolute: true,
        };
      case routes.dictionary:
        return {
          type: 'dark',
          caption: '물질도감',
          absolute: false,
        };
      case routes.myPage:
        return {
          type: 'dark',
          caption: '마이',
          absolute: false,
        };
      default:
        return {
          type: 'dark',
          caption: null,
          absolute: false,
        };
    }
  };

  const headerType = useMemo(
    () => getHeaderType(location.pathname),
    [location.pathname],
  );

  return (
    <div
      className={clsx(
        hasHeader && !headerType.absolute ? 'pt-header-height' : '',
        hasNavigation ? 'pb-nav-height' : '',
      )}
    >
      {hasHeader && (
        <Header
          type={headerType.type}
          caption={headerType.caption}
          absolute={headerType.absolute}
        />
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children ? children : <Outlet />}
      </motion.div>
      {hasNavigation && <NavigationBar />}
    </div>
  );
}
