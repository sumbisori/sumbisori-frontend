import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import { SmallButton } from '@/components/SmallButton';
import { routes } from '@/routes/src/routes';
import { useNavigate } from 'react-router-dom';
import ArrowRightIcon from '@/icons/arrow-right2.svg?react';
import { motion } from 'framer-motion';
import { animationY } from '@/util/animationY';

export const Complete = () => {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate(routes.dictionary);
  };

  const handleReviewClick = () => {
    // 임시로 홈으로 이동
    navigate(routes.home);
  };

  return (
    <div className="relative flex h-full min-h-screen flex-col bg-gray-050 pt-header-height">
      <NavigatorHeader title="체험 일지" onRightClick={handleCloseClick} />
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              duration: 0.8,
              bounce: 0.4,
            }}
            src={'/assets/images/journal-create/complete.png'}
            alt="완료"
            className="size-64"
          />
          <motion.div
            className="flex flex-col items-center justify-center gap-2"
            {...animationY(0.5)}
          >
            <h3 className="whitespace-nowrap text-2xl font-bold">
              체험일지 작성 완료!
            </h3>
            <p className="whitespace-nowrap text-sm text-gray-700">
              체험일지와 함께 도감이 등록되었어요!
            </p>
          </motion.div>
        </div>
        <motion.div className="mt-40" {...animationY(0.8)}>
          <SmallButton
            selected
            onClick={handleReviewClick}
            className="px-5 py-3.5"
          >
            <div className="flex items-center gap-2">
              <p className="w-[8.25rem] text-center">체험일지 보기</p>
              <ArrowRightIcon className="size-6 text-blue-700" />
            </div>
          </SmallButton>
        </motion.div>
      </div>
    </div>
  );
};
