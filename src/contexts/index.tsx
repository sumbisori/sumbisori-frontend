import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ModalProvider } from './ModalContext';
import { ReduxProvider } from '@/store/provider';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const { handleError } = useErrorHandler();
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        handleError(error);
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <ModalProvider>{children}</ModalProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};
