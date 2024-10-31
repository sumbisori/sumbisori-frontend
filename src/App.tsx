import { Router } from './routes';
import Mobile from './layouts/Mobile';
import { Providers } from './contexts';

function App() {
  return (
    <Providers>
      <Mobile>
        <Router />
      </Mobile>
    </Providers>
  );
}

export default App;
