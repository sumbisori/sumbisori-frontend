import { Router } from './routes';
import Mobile from './layouts/Mobile';
import { Providers } from './contexts';

function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export default App;
