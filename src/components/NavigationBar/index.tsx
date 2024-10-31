import { useNavigate } from 'react-router-dom';
import { NavIcon } from './NavIcon';

export const NavigationBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="absolute inset-x-0 bottom-0 z-10 flex w-[393px] justify-between bg-gray-800 px-[24px] pt-[7px] text-white">
      <NavIcon label="홈" onClick={() => navigate('/')} />
      <NavIcon label="예약" onClick={() => navigate('/reservation')} />
      <NavIcon label="도감" onClick={() => navigate('/dictionary')} />
      <NavIcon label="마이" onClick={() => navigate('/my')} />
    </nav>
  );
};
