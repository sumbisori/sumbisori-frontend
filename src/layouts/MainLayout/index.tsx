import { NavigationBar } from '@/layouts/NavigationBar';
import { Header } from '@/layouts/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Props {
  hasNavigation?: boolean;
  hasHeader?: boolean;
}

export default function MainLayout({
  hasNavigation = true,
  hasHeader = true,
}: Props) {
  const location = useLocation();

  const getHeaderType = (
    pathname: string,
  ): {
    type: 'light' | 'dark';
    caption: string | undefined;
    absolute: boolean;
  } => {
    if (pathname === '/home')
      return {
        type: 'dark',
        caption: undefined,
        absolute: false,
      };
    if (pathname === '/haenyeo-places')
      return {
        type: 'dark',
        caption: undefined,
        absolute: true,
      };
    if (pathname.includes('/reservation-create'))
      return {
        type: 'dark',
        caption: '예약',
        absolute: false,
      };
    if (pathname === '/dictionary')
      return {
        type: 'dark',
        caption: '물질도감',
        absolute: false,
      };

    if (pathname === '/my-page')
      return {
        type: 'dark',
        caption: '마이',
        absolute: false,
      };

    if (pathname === '/my-page/reservation')
      return {
        type: 'dark',
        caption: '예약정보 조회',
        absolute: false,
      };

    if (pathname === '/dictionary/registration')
      return {
        type: 'dark',
        caption: '도감 등록',
        absolute: false,
      };

    if (pathname.includes('/dictionary/confirm'))
      return {
        type: 'dark',
        caption: '도감 등록',
        absolute: false,
      };

    return {
      type: 'light',
      caption: undefined,
      absolute: false,
    };
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
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <Outlet />
      </motion.div>
      {hasNavigation && <NavigationBar />}
    </div>
  );
}
