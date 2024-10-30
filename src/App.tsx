import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './routes';
import { Background } from './layouts/Background';
import Mobile from './layouts/Mobile';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Background>
        <Mobile>
          <Router />
        </Mobile>
      </Background>
    </QueryClientProvider>
  );
}

export default App;
