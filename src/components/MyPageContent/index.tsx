import { MyPageButton } from '../MyPageButton';

export const MyPageContent = () => {
  return (
    <div className="p-[18px]">
      <MyPageButton>예약 정보 조회</MyPageButton>
      <MyPageButton>리뷰 모아보기</MyPageButton>
      <MyPageButton>설정</MyPageButton>
    </div>
  );
};
