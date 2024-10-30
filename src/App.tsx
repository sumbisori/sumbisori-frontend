import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './routes';
import Mobile from './layouts/Mobile';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Mobile>
        <Router />
      </Mobile>
    </QueryClientProvider>
  );
}

export default App;
