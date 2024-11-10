import { useState } from 'react';

interface DropdownItem {
  displayName: string;
  value: number | null;
}

interface DropdownProps {
  value: number | null;
  items: DropdownItem[];
  onChange: (value: number) => void;
  placeholder?: string;
  className?: string;
}

export const Dropdown = ({
  value,
  items,
  onChange,
  placeholder,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedItem = items.find((item) => item.value === value);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-left shadow-sm focus:outline-none"
      >
        {selectedItem ? (
          <span>{selectedItem.displayName}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <span className="float-right ml-2">
          <svg
            className={`size-4 transition-transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      {isOpen && (
        <ul className="hide-scroll absolute left-0 z-10 mt-1 h-40 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                if (item.value) {
                  onChange(item.value);
                  setIsOpen(false);
                }
              }}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                value === item.value ? 'bg-gray-200' : ''
              }`}
            >
              {item.displayName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
