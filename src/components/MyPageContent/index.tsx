import { useNavigate } from 'react-router-dom';
import { MyPageButton } from '../MyPageButton';
import { AlertBox } from '../AlertBox';
import { useModalContext } from '../../contexts/ModalContext';

export const MyPageContent = () => {
  const { openModal } = useModalContext();
  const navigate = useNavigate();
  return (
    <div className="p-[18px]">
      <MyPageButton
        onClick={() => {
          navigate('/my-page/reservation');
        }}
      >
        예약 정보 조회
      </MyPageButton>
      <MyPageButton
        onClick={() => {
          openModal('not-yet');
        }}
      >
        리뷰 모아보기
      </MyPageButton>
      <MyPageButton
        onClick={() => {
          openModal('not-yet');
        }}
      >
        설정
      </MyPageButton>
      <AlertBox id="not-yet">
        <div className="flex size-full flex-col items-center justify-center text-center text-lg font-bold text-gray-900">
          <img src="/images/haenyeo.png"></img>
          아직 준비 중인 서비스입니다. 조금만 기다려주세요!
        </div>
      </AlertBox>
    </div>
  );
};
