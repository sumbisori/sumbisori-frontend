import { useNavigate } from 'react-router-dom';

interface Props {
  type?: 'dark' | 'light';
  caption?: string;
  absolute: boolean;
}

export const Header = ({ type = 'light', caption, absolute }: Props) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/home');
  };
  return (
    <header
      className={`flex w-full min-w-80 max-w-[37.5rem] justify-between p-[1.125rem] ${
        absolute ? 'absolute inset-x-0 top-0 z-20 m-auto' : 'relative'
      }`}
      style={{
        textAlign: 'center', // 텍스트 정렬
        lineHeight: 'normal', // 텍스트의 줄 간격을 고정
      }}
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
            <p className="text-[1.375rem] font-bold text-gray-900">{caption}</p>
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
    </header>
  );
};
