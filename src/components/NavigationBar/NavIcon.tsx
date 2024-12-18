import { ReactNode } from 'react';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
}

export const NavIcon = ({ icon, label, isActive = false, ...props }: Props) => {
  return (
    <button
      className="group flex cursor-pointer flex-col items-center justify-center pb-2.5"
      {...props}
    >
      {/* Icon with conditional active styling */}
      <div className={isActive ? 'text-[#ffffff]' : 'text-gray-500'}>
        {icon}
      </div>
      {/* Label with conditional active styling */}
      <p
        className={`flex w-9 justify-center text-[0.75rem] transition-colors duration-300 ease-in-out ${isActive ? 'text-[#ffffff]' : 'text-gray-500'} group-hover:text-[#ffffff]`}
      >
        {label}
      </p>
    </button>
  );
};
