import { useNavigate } from 'react-router-dom';
import { MyPageButton } from '../MyPageButton';
import { Dialog } from '../../../../components/Dialog';
import { useModalController } from '@/contexts/src/ModalContext';
import { API_URL } from '@/api/instance';
import ReservationListIcon from '@/icons/my_page/reservation_list.svg?react';
import ReviewListIcon from '@/icons/my_page/review_list.svg?react';
import SettingIcon from '@/icons/my_page/setting.svg?react';
import LogoutIcon from '@/icons/my_page/logout.svg?react';
import { ImageWithTextAlert } from '../../../../components/ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';
import { routes } from '@/routes/src/routes';

export const MyPageContent = () => {
  const { openModal } = useModalController();
  const navigate = useNavigate();
  const handleLogout = async () => {
    window.location.href = `${API_URL}/oauth2/authorization/kakao/logout`;
  };
  return (
    <div className="p-[1.125rem]">
      <MyPageButton
        icon={<ReservationListIcon />}
        onClick={() => {
          navigate(routes.myPageReservation);
        }}
      >
        예약 정보 조회
      </MyPageButton>
      <MyPageButton
        icon={<ReviewListIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      >
        리뷰 모아보기
      </MyPageButton>
      <MyPageButton
        icon={<SettingIcon />}
        onClick={() => {
          openModal('not-yet');
        }}
      >
        설정
      </MyPageButton>
      <MyPageButton icon={<LogoutIcon />} onClick={handleLogout}>
        로그아웃
      </MyPageButton>
      <Dialog id="not-yet">
        <ImageWithTextAlert
          src={`${IMAGE_PATHS.ROOT}/haenyeo.png`}
          alt="해녀"
          text={`아직 준비 중인 서비스입니다. \n 조금만 기다려주세요!`}
        />
      </Dialog>
    </div>
  );
};
