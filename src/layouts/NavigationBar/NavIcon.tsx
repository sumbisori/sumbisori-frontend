import { ReactElement, SVGProps } from 'react';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: ReactElement<SVGProps<SVGSVGElement>>;
  label: string;
  isActive?: boolean;
}

export const NavIcon = ({ icon, label, isActive = false, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'flex cursor-pointer flex-col items-center justify-center pb-2.5 transition-colors duration-200 ease-in-out hover:text-[#ffffff] active:text-[#ffffff]',
        isActive ? 'text-white' : 'text-gray-500',
      )}
      {...props}
    >
      <div>{icon}</div>

      <p className={`flex w-9 justify-center text-xs`}>{label}</p>
    </button>
  );
};
