import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from './ModalContext';
import { ReduxProvider } from '@/store/provider';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider>
        <ModalProvider>{children}</ModalProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};
