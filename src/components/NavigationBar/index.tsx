import { NavIcon } from './NavIcon';

export const NavigationBar = () => {
  // tailwind
  return (
    <nav className="absolute inset-x-0 bottom-0 z-10 flex w-[393px] justify-between bg-gray-800 px-[24px] pt-[7px] text-white">
      <NavIcon label="홈" />
      <NavIcon label="예약" />
      <NavIcon label="도감" />
      <NavIcon label="마이" />
    </nav>
  );
};
