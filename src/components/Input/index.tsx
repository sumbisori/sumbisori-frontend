interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  inputLabel: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ inputLabel, onChange, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <label
        className="block text-[14px] font-semibold text-gray-900"
        htmlFor={props.id}
      >
        {inputLabel}
      </label>
      <input
        onChange={onChange}
        className="h-[40px] w-full rounded-md border border-gray-050 bg-gray-100 px-4 text-[14px] text-gray-700 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
        {...props}
      ></input>
    </div>
  );
};
