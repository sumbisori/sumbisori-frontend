import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from '@tanstack/react-query';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from '@/pages/ErrorPage';

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
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            resetKeys={[queryClient]}
            FallbackComponent={ErrorPage}
          >
            {children}
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
