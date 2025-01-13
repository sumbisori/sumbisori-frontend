import { Router } from '@/routes';
import { Providers } from '@/contexts';

function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export default App;
