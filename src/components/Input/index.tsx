interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ inputLabel, value, onChange, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-2.5">
      <label className="block text-[0.875rem] font-semibold text-gray-900">
        {inputLabel}
      </label>
      <input
        value={value}
        onChange={onChange}
        className="h-10 w-full rounded-md border border-gray-050 bg-gray-100 px-4 text-[0.875rem] text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
        {...props}
      ></input>
    </div>
  );
};
