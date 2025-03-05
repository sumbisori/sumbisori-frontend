import StarIcon from '@/icons/journal/star.svg?react';

interface Props {
  satisfaction: number;
  onSatisfactionChange: (satisfaction: number) => void;
}

export const SatisfactionStars = ({
  satisfaction,
  onSatisfactionChange,
}: Props) => {
  const handleStarClick = (index: number) => {
    onSatisfactionChange(index + 1);
  };

  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <button
          key={index}
          onClick={() => handleStarClick(index)}
          type="button"
        >
          <StarIcon
            className={clsx(
              'size-9 transition-all duration-300',
              index + 1 <= satisfaction
                ? 'fill-blue-700 stroke-blue-700'
                : 'fill-none stroke-gray-500',
            )}
          />
        </button>
      ))}
    </div>
  );
};
