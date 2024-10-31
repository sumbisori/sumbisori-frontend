import { useNavigate } from 'react-router-dom';

interface Props {
  type?: 'dark' | 'light';
}

export const Header = ({ type = 'light' }: Props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
  };
  return (
    <nav className="absolute inset-x-0 top-0 z-10 flex w-[393px] justify-between p-[18px]">
      <img
        src={
          type === 'dark'
            ? '/icons/sumbisori_logo_width_black.svg'
            : '/icons/sumbisori_logo_width_white.svg'
        }
        alt="Logo"
        className="cursor-pointer"
        onClick={handleNavigate}
      />

      <img
        src={
          type === 'dark'
            ? '/icons/Icon_bell_black.svg'
            : '/icons/Icon_bell_white.svg'
        }
        alt="Menu"
        className="cursor-pointer"
      />
    </nav>
  );
};
