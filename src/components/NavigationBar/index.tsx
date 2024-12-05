import { useNavigate, useLocation } from 'react-router-dom';
import { NavIcon } from './NavIcon';
import { useState } from 'react';

export const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [hovered, setHovered] = useState<string | null>(null);

  const navItems = [
    { label: '홈', path: '/home', icon: 'nav_icon1' },
    { label: '예약', path: '/reservation', icon: 'nav_icon2' },
    { label: '도감', path: '/dictionary', icon: 'nav_icon3' },
    { label: '마이', path: '/my-page', icon: 'nav_icon4' },
  ];

  return (
    <nav className="z-20">
      <div className="fixed inset-x-0 bottom-0 m-auto flex h-[4.438rem] w-full min-w-[320px] max-w-[600px] justify-between bg-gray-800 px-[24px] pt-[7px] text-white">
        {navItems.map((item, index) => (
          <NavIcon
            key={index}
            label={item.label}
            onClick={() => navigate(item.path)}
            onMouseEnter={() => setHovered(item.path)}
            onMouseLeave={() => setHovered(null)}
            isActive={location.pathname.startsWith(item.path)}
            icon={
              <img
                src={`/icons/nav/${item.icon}${
                  location.pathname.startsWith(item.path) ||
                  hovered === item.path
                    ? '_active.svg'
                    : '_inactive.svg'
                }`}
                alt={item.label}
              />
            }
          />
        ))}
      </div>
    </nav>
  );
};
