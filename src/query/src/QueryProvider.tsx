import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
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
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
