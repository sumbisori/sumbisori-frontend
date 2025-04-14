import { Router } from '@/routes';
import { Providers } from '@/contexts';
import '@/styles/bottomSheet.css';

function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export default App;
