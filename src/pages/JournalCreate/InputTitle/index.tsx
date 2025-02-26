interface Props {
  title: string;
  subtitle: string;
}

export const InputTitle = ({ title, subtitle }: Props) => {
  return (
    <div className="px-4 py-8">
      <div className="flex flex-col">
        <p className="text-2xl font-medium">{title}</p>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
};
