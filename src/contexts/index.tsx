import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from './ModalContext';

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>{children}</ModalProvider>
    </QueryClientProvider>
  );
};
