import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import { SmallButton } from '@/components/SmallButton';
import { routes } from '@/routes/src/routes';
import { useNavigate } from 'react-router-dom';
import ArrowRightIcon from '@/icons/arrow-right2.svg?react';

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
      <NavigatorHeader title="체험 일지" onCloseClick={handleCloseClick} />
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src={'/assets/images/journal-create/complete.png'}
            alt="완료"
            className="size-64"
          />
          <div className="flex flex-col items-center justify-center gap-2">
            <h3 className="whitespace-nowrap text-2xl font-bold">
              체험일지 작성 완료!
            </h3>
            <p className="whitespace-nowrap text-sm text-gray-700">
              체험일지와 함께 도감이 등록되었어요!
            </p>
          </div>
        </div>
        <div className="mt-40">
          <SmallButton selected onClick={handleReviewClick}>
            <div className="flex items-center gap-2">
              <p>리뷰 작성하러가기</p>
              <ArrowRightIcon className="size-6 text-blue-700" />
            </div>
          </SmallButton>
        </div>
      </div>
    </div>
  );
};
