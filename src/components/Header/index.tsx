import { useNavigate } from 'react-router-dom';

interface Props {
  type?: 'dark' | 'light';
  caption?: string;
  absolute: boolean;
}

export const Header = ({ type = 'light', caption, absolute }: Props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/');
  };
  return (
    <nav
      className={`flex w-[393px] justify-between p-[18px] ${
        absolute ? 'absolute' : 'relative'
      }`}
    >
      <div className="flex items-center">
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
        {caption && (
          <div className="ml-2 flex items-center gap-2">
            <img src={'/icons/contour.svg'} alt="contour" />
            <p className="text-[22px] font-bold text-gray-900">{caption}</p>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <img
          src={
            type === 'dark'
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
