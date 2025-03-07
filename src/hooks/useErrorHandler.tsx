import { ErrorResponse } from '@/api/types';
import { toast } from '@/components/Toast';
import { ERROR_MESSAGE } from '@/constant/src/error';
import { routes } from '@/routes/src/routes';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useErrorHandler = () => {
  const navigate = useNavigate();

  const handleError = (err: unknown) => {
    if (isAxiosError<ErrorResponse>(err)) {
      const { name, status, message } = err.response?.data || {};

      if (err.code === 'ERR_NETWORK') {
        toast.error(ERROR_MESSAGE.ERR_NETWORK);
        return;
      }

      if (name === 'AUTHENTICATION_REQUIRED') {
        toast.warning(ERROR_MESSAGE.AUTHENTICATION_REQUIRED);
        navigate(routes.login, { replace: true });
        return;
      }

      if (status === 500) {
        toast.error(ERROR_MESSAGE.DEFAULT_ERROR);
        return;
      }
    }
  };

  return { handleError };
};
