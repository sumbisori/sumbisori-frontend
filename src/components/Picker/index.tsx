import clsx from 'clsx';
import { useEffect, useRef } from 'react';

interface Props {
  options: any[];
  optionKey?: string;
  optionValue?: string;
  selectedOption: any;
  onSelect: (option: any) => void;
  emptyText?: string;
  className?: string;
}

export const Picker = ({
  options,
  optionKey,
  optionValue,
  selectedOption,
  onSelect,
  emptyText = '선택 가능한 옵션이 없습니다',
  className,
}: Props) => {
  const selectedOptionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedOptionRef.current) {
      selectedOptionRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, [selectedOption]);

  return (
    <div className={clsx('flex h-[280px] w-full', className)}>
      <div className="flex-1 overflow-auto border-r">
        {options.map((option) => (
          <button
            key={optionKey ? option[optionKey] : option}
            ref={selectedOption === option ? selectedOptionRef : null}
            onClick={() => onSelect(option)}
            className={clsx(
              'w-full p-4 text-center hover:bg-gray-100 active:bg-gray-100',
              selectedOption === option ? 'bg-gray-100 font-semibold' : '',
            )}
          >
            {optionValue ? option[optionValue] : option}
          </button>
        ))}
        {options.length === 0 && (
          <button className="w-full p-4 text-center text-gray-400">
            {emptyText}
          </button>
        )}
      </div>
    </div>
  );
};
