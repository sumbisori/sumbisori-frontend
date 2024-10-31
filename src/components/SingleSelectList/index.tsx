import { useState } from 'react';

interface Item {
  id: number;
  name: string;
}

interface Probs {
  label: string;
  items: Item[];
}

export default function SingleDropdown(prob: Probs) {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState(prob.label);

  function onLabelButtonClick() {
    setIsOpen(!isOpen);
  }

  function labelChange(newLabel: string) {
    setLabel(newLabel);
    setIsOpen(false);
  }

  return (
    <div className="w-full">
      <div className={'relative inline-block h-[36px] w-full'}>
        <button
          className="inline-flex size-full items-center justify-center rounded-md border border-gray-400 text-sm font-bold text-gray-900 hover:bg-gray-50"
          onClick={onLabelButtonClick}
        >
          {label}
          <div
            className="relative size-[16px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/icons/arrow_bottom.svg)',
            }}
          ></div>
        </button>

        {isOpen ? (
          <div className="absolute right-0 flex w-full flex-col rounded-md border border-gray-400 bg-white transition focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
            {prob.items.map((item, index) => {
              return (
                <button
                  onClick={() => labelChange(item.name)}
                  key={index}
                  className="h-[36px] text-center"
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
