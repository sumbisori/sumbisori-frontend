import { useMemo, useState } from 'react';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  minLength?: number;
  maxLength?: number;
  className?: string;
}

export const Textarea = ({
  placeholder,
  value = '',
  onChange,
  maxLength = 150,
  minLength = 0,
  className,
  ...props
}: Props) => {
  const [textLength, setTextLength] = useState(0);
  const isOverMaxLength = useMemo(
    () => textLength > maxLength,
    [textLength, maxLength],
  );
  const isOverMinLength = useMemo(
    () => textLength >= minLength,
    [textLength, minLength],
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length > maxLength) {
      return;
    }
    setTextLength(newValue.length);
    onChange?.(e);
  };

  return (
    <div
      className={clsx(
        'flex max-h-[11.875rem] min-h-[10.188rem] flex-col gap-2 rounded-2xl border border-gray-100 bg-white',
        className,
      )}
    >
      <textarea
        className="size-full flex-1 resize-none rounded-2xl px-5 pt-6 text-black focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {/* 글자수 측정 */}
      <div className="w-full pb-4 pr-4 text-end text-xs">
        <span
          className={clsx(
            isOverMaxLength || !isOverMinLength
              ? 'text-red-500'
              : 'text-blue-700',
          )}
        >
          {textLength}
        </span>
        <span className="text-gray-500">/ {maxLength}</span>
      </div>
    </div>
  );
};
