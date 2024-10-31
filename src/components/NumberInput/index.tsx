interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumberInput = ({
  inputLabel,
  value,
  onChange,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <label
        className="block text-[14px] font-semibold text-gray-900"
        htmlFor={props.id}
      >
        {inputLabel}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          max={20}
          value={value}
          onChange={onChange}
          className="h-[40px] w-[80px] rounded-md border border-gray-050 bg-gray-100 px-4 text-[14px] text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
          {...props}
        />
        <p className="text-[14px]">명</p>
      </div>
    </div>
  );
};
