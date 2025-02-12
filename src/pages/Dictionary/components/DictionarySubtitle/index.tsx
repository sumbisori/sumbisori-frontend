import Skeleton from '../../../../components/Skeleton';

interface Props {
  seafoodCount: number;
  isLoading: boolean;
}

export const DictionarySubtitle = ({ seafoodCount, isLoading }: Props) => {
  return (
    <div
      id="dictionary-subtitle"
      className="flex w-full items-center justify-between border-b-2 border-gray-400 py-2.5"
    >
      <div className="flex items-center gap-2">
        <div className="h-[1.375rem] w-2 bg-gray-700" />
        <p className="text-sm font-medium leading-3 text-gray-800">
          도감 달성도
        </p>
      </div>
      {isLoading ? (
        <Skeleton variant="text" width={'30px'} />
      ) : (
        <div className="font-semibold">
          <span>{seafoodCount}/</span>
          <span className="text-gray-600">18</span>
        </div>
      )}
    </div>
  );
};
