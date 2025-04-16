import { useNavigate } from 'react-router-dom';
import LogoBlackIcon from '@/icons/sumbisori_logo_width_black.svg?react';
import LogoWhiteIcon from '@/icons/sumbisori_logo_width_white.svg?react';
import BellBlackIcon from '@/icons/Icon_bell_black.svg?react';
import BellWhiteIcon from '@/icons/Icon_bell_white.svg?react';
import ContourIcon from '@/icons/contour.svg?react';
import { useHeaderVisibility } from '@/contexts/src/HeaderVisibilityContext';
import { routes } from '@/routes/src/routes';
import { toast } from '@/components/Toast';

interface Props {
  type: 'dark' | 'light';
  caption: string | null;
  absolute: boolean;
}

export const Header = ({ type, caption, absolute }: Props) => {
  const { showHeader } = useHeaderVisibility();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(routes.home);
  };

  return (
    <header
      className={clsx(
        'z-100 flex h-header-height w-full min-w-full-layout max-w-full-layout justify-between px-5',
        {
          'absolute inset-x-0 top-0 m-auto': absolute,
          'fixed inset-x-0 top-0 m-auto bg-white transition-transform duration-300 ease-in-out':
            !absolute,
        },
        {
          'translate-y-0': showHeader,
          '-translate-y-full': !showHeader,
        },
      )}
    >
      <div className="flex items-center">
        {type === 'dark' ? (
          <LogoBlackIcon className="cursor-pointer" onClick={handleNavigate} />
        ) : (
          <LogoWhiteIcon className="cursor-pointer" onClick={handleNavigate} />
        )}
        {caption && (
          <div className="ml-2 flex items-center gap-2">
            <ContourIcon />
            <p className="text-[1.375rem] font-bold text-gray-900">{caption}</p>
          </div>
        )}
      </div>

      <button
        className="flex items-center"
        onClick={() => toast.info('준비중입니다.')}
      >
        {type === 'dark' ? (
          <BellBlackIcon className="cursor-pointer" />
        ) : (
          <BellWhiteIcon className="cursor-pointer" />
        )}
      </button>
    </header>
  );
};
