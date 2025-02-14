import { useNavigate, useLocation } from 'react-router-dom';
import { NavIcon } from './NavIcon';
import NavIcon1Active from '@/icons/nav/nav_icon1.svg?react';
import NavIcon2Active from '@/icons/nav/nav_icon2.svg?react';
import NavIcon3Active from '@/icons/nav/nav_icon3.svg?react';
import NavIcon4Active from '@/icons/nav/nav_icon4.svg?react';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: '홈',
      path: '/home',
      icon: <NavIcon1Active />,
    },
    {
      label: '예약',
      path: '/haenyeo-places',
      icon: <NavIcon2Active />,
    },
    {
      label: '도감',
      path: '/dictionary',
      icon: <NavIcon3Active />,
    },
    {
      label: '마이',
      path: '/my-page',
      icon: <NavIcon4Active />,
    },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-100 m-auto flex h-nav-height w-full min-w-full-layout max-w-full-layout justify-between bg-gray-800 px-6 pt-[0.438rem] text-white">
      {navItems.map((item, index) => (
        <NavIcon
          key={index}
          label={item.label}
          onClick={() => navigate(item.path)}
          isActive={location.pathname.startsWith(item.path)}
          icon={item.icon}
        />
      ))}
    </nav>
  );
};
