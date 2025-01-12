import { useNavigate, useLocation } from 'react-router-dom';
import { NavIcon } from './NavIcon';
import { useState } from 'react';
import NavIcon1Active from '@/icons/nav/nav_icon1_active.svg?react';
import NavIcon1Inactive from '@/icons/nav/nav_icon1_inactive.svg?react';
import NavIcon2Active from '@/icons/nav/nav_icon2_active.svg?react';
import NavIcon2Inactive from '@/icons/nav/nav_icon2_inactive.svg?react';
import NavIcon3Active from '@/icons/nav/nav_icon3_active.svg?react';
import NavIcon3Inactive from '@/icons/nav/nav_icon3_inactive.svg?react';
import NavIcon4Active from '@/icons/nav/nav_icon4_active.svg?react';
import NavIcon4Inactive from '@/icons/nav/nav_icon4_inactive.svg?react';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [hovered, setHovered] = useState<string | null>(null);

  const navItems = [
    {
      label: '홈',
      path: '/home',
      activeIcon: <NavIcon1Active />,
      inactiveIcon: <NavIcon1Inactive />,
    },
    {
      label: '예약',
      path: '/reservation',
      activeIcon: <NavIcon2Active />,
      inactiveIcon: <NavIcon2Inactive />,
    },
    {
      label: '도감',
      path: '/dictionary',
      activeIcon: <NavIcon3Active />,
      inactiveIcon: <NavIcon3Inactive />,
    },
    {
      label: '마이',
      path: '/my-page',
      activeIcon: <NavIcon4Active />,
      inactiveIcon: <NavIcon4Inactive />,
    },
  ];

  return (
    <nav className="z-20">
      <div className="fixed inset-x-0 bottom-0 m-auto flex h-nav-height w-full min-w-full-layout max-w-full-layout justify-between bg-gray-800 px-6 pt-[0.438rem] text-white">
        {navItems.map((item, index) => (
          <NavIcon
            key={index}
            label={item.label}
            onClick={() => navigate(item.path)}
            onMouseEnter={() => setHovered(item.path)}
            onMouseLeave={() => setHovered(null)}
            isActive={location.pathname.startsWith(item.path)}
            icon={
              location.pathname.startsWith(item.path) || hovered === item.path
                ? item.activeIcon
                : item.inactiveIcon
            }
          />
        ))}
      </div>
    </nav>
  );
};
