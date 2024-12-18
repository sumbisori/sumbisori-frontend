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
    <div className="flex flex-col gap-2.5">
      <label
        className="block text-[0.875rem] font-semibold text-gray-900"
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
          className="h-10 w-20 rounded-md border border-gray-050 bg-gray-100 px-4 text-[0.875rem] text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
          {...props}
        />
        <p className="text-[0.875rem]">명</p>
      </div>
    </div>
  );
};
