import { useNavigate } from 'react-router-dom';
import { MyPageButton } from '../MyPageButton';
import { API_URL } from '@/api/instance';
import ReservationListIcon from '@/icons/my_page/reservation_list.svg?react';
import ReviewListIcon from '@/icons/my_page/review_list.svg?react';
import SettingIcon from '@/icons/my_page/setting.svg?react';
import LogoutIcon from '@/icons/my_page/logout.svg?react';
import { routes } from '@/routes/src/routes';
import { toast } from '@/components/Toast';
export const MyPageContent = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    window.location.href = `${API_URL}/oauth2/authorization/kakao/logout`;
  };
  return (
    <div className="px-4 py-3">
      <MyPageButton
        icon={<ReservationListIcon />}
        onClick={() => {
          navigate(routes.journals);
        }}
      >
        체험 일지
      </MyPageButton>
      <MyPageButton
        icon={<ReviewListIcon />}
        onClick={() => {
          toast.info('준비중입니다.');
        }}
      >
        리뷰 모아보기
      </MyPageButton>
      <MyPageButton
        icon={<SettingIcon />}
        onClick={() => {
          toast.info('준비중입니다.');
        }}
      >
        설정
      </MyPageButton>
      <MyPageButton icon={<LogoutIcon />} onClick={handleLogout}>
        로그아웃
      </MyPageButton>
    </div>
  );
};
