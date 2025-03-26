import { useEffect } from 'react';
import StarIcon from '@/icons/journal/star.svg?react';
import { motion, useAnimation } from 'framer-motion';
import clsx from 'clsx';

interface Props {
  satisfaction: number;
  onSatisfactionChange?: (satisfaction: number) => void;
  readOnly?: boolean;
  starSize?: number;
}

export const SatisfactionStars = ({
  satisfaction,
  onSatisfactionChange,
  readOnly = false,
  starSize = 36,
}: Props) => {
  const animations = [
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
    useAnimation(),
  ];

  useEffect(() => {
    if (readOnly) return;
    animations.forEach((control, index) => {
      if (index < satisfaction) {
        control.start({
          scale: [1, 1.2, 1],
          transition: { duration: 0.3 },
        });
      } else {
        control.start({ scale: 1 });
      }
    });
  }, [satisfaction, readOnly]);

  const handleStarClick = (index: number) => {
    if (readOnly) return;
    onSatisfactionChange && onSatisfactionChange(index + 1);
  };

  return (
    <div className="flex gap-1">
      {animations.map((control, index) => (
        <motion.button
          key={index}
          onClick={() => handleStarClick(index)}
          type="button"
          className="active:outline-none"
        >
          <motion.div animate={control}>
            <StarIcon
              className={clsx(
                'transition-all duration-300',
                index + 1 <= satisfaction
                  ? 'fill-blue-700 stroke-blue-700'
                  : 'fill-none stroke-gray-500',
                readOnly && 'cursor-default',
              )}
              width={starSize}
              height={starSize}
            />
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
};
