interface Props {
  seafoodPercentage: string;
}

export const DictionaryTitle = ({ seafoodPercentage }: Props) => {
  return (
    <div id="dictionary-title" className="flex flex-col gap-2 pb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-[1.375rem] font-bold leading-8">나의 물질 도감</h2>
        <div className="flex items-center justify-center rounded-full bg-gray-700 px-4">
          <span className="font-medium leading-6 text-white">
            {seafoodPercentage}%
          </span>
        </div>
      </div>
      <p className="text-sm font-normal leading-5 text-gray-600">
        직접 채취한 해산물들을 확인할 수 있습니다
      </p>
    </div>
  );
};
