import { ModalProvider } from './src/ModalContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryProvider } from '@/query';
import { HeaderVisibilityProvider } from './src/HeaderVisibilityContext';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <HeaderVisibilityProvider>
        <ModalProvider>{children}</ModalProvider>
      </HeaderVisibilityProvider>
      <ReactQueryDevtools />
    </QueryProvider>
  );
};
