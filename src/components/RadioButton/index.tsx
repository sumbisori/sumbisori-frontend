interface Props {
  selected: boolean;
  onClick: () => void;
}

export const RadioButton = ({ selected, onClick }: Props) => {
  return (
    <button
      className="relative inline-flex size-6 cursor-pointer items-center justify-center"
      onClick={onClick}
      type="button"
    >
      <div
        className={clsx(
          'absolute size-5 rounded-full border-2',
          selected ? 'border-blue-700' : 'border-gray-600',
        )}
      />

      {selected && (
        <div className="absolute size-2.5 rounded-full bg-blue-700" />
      )}
    </button>
  );
};
