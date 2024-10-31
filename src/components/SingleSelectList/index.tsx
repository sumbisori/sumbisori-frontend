import { useState } from 'react';
import { SeafoodAll } from '../../api/dictionaryRegistration';

interface Props {
  value: string | number;
  items: SeafoodAll[];
  onChange?: (value: string | number) => void;
}

export default function SingleDropdown(props: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function onLabelButtonClick() {
    setIsOpen(!isOpen);
  }

  function labelChange(newLabel: string | number) {
    setIsOpen(false);
    if (props.onChange) {
      props.onChange(newLabel);
    }
  }

  return (
    <div className="w-full">
      <div className={'relative inline-block h-[36px] w-full'}>
        <button
          className="inline-flex size-full items-center justify-center rounded-md border border-gray-400 text-sm font-bold text-gray-900 hover:bg-gray-50"
          onClick={onLabelButtonClick}
        >
          {props.items.find((item) => item.value === props.value)?.name ||
            '채취물 종류'}
          <div
            className="relative size-[16px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/icons/arrow_bottom.svg)',
            }}
          ></div>
        </button>

        {isOpen ? (
          <div className="hide-scroll absolute right-0 flex h-[100px] w-full flex-col overflow-auto rounded-md border border-gray-400 bg-white transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
            {props.items.map((item, index) => {
              return (
                <button
                  onClick={() => labelChange(item.value)}
                  key={index}
                  className="h-[36px] text-center hover:bg-gray-050"
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
