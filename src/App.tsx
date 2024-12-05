import { Router } from './routes';
import MainLayout from './layouts/MainLayout';
import { Providers } from './contexts';

function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}

export default App;
