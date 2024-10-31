import { useNavigate } from 'react-router-dom';

interface Props {
  type?: 'dark' | 'light' | 'reservation';
}

export const Header = ({ type = 'light' }: Props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
  };
  return (
    <nav className="absolute inset-x-0 top-0 z-10 flex w-[393px] justify-between p-[18px]">
      <div className="flex items-center">
        <img
          src={
            type === 'dark' || type === 'reservation'
              ? '/icons/sumbisori_logo_width_black.svg'
              : '/icons/sumbisori_logo_width_white.svg'
          }
          alt="Logo"
          className="cursor-pointer"
          onClick={handleNavigate}
        />
        {type === 'reservation' && (
          <div className="ml-2 flex items-center gap-2">
            <img src={'/icons/contour.svg'} alt="contour" />
            <p className="text-[22px] font-bold text-gray-900">예약</p>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <img
          src={
            type === 'dark' || type === 'reservation'
              ? '/icons/Icon_bell_black.svg'
              : '/icons/Icon_bell_white.svg'
          }
          alt="Menu"
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
};
