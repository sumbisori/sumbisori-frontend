import { ModalProvider } from './src/ModalContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from '@/query';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ModalProvider>{children}</ModalProvider>
      <ReactQueryDevtools />
    </QueryProvider>
  );
};
