import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
export type ErrorResponse = {
  message: string[];
  name: string;
  status: number;
};

export const useErrorHandler = () => {
  const navigate = useNavigate();

  // 500 에러 처리 필요함
  const handleError = (err: unknown) => {
    if (isAxiosError<ErrorResponse>(err)) {
      const { name, status, message } = err.response?.data || {};
      const defaultMessage = '알 수 없는 오류가 발생했습니다.';

      if (err.code === 'ERR_NETWORK') {
        alert('네트워크 오류가 발생했습니다.');
        return;
      }

      if (name === 'AUTHENTICATION_REQUIRED') {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      if (status === 500) {
        alert(defaultMessage);
        return;
      }
    }
  };

  return { handleError };
};
