import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';

interface HeaderVisibilityContextType {
  showHeader: boolean;
}

const HeaderVisibilityContext = createContext<HeaderVisibilityContextType>({
  showHeader: true,
});

interface HeaderVisibilityProviderProps {
  children: ReactNode;
}

export const HeaderVisibilityProvider = ({
  children,
}: HeaderVisibilityProviderProps) => {
  const [showHeader, setShowHeader] = useState(true);
  const prevScrollPos = useRef(window.scrollY);
  const location = useLocation();

  useEffect(() => {
    setShowHeader(true);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (window.scrollY + windowHeight >= docHeight - 10) {
        return;
      }

      if (currentScrollPos > prevScrollPos.current && currentScrollPos > 50) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      prevScrollPos.current = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderVisibilityContext.Provider value={{ showHeader }}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
};

export const useHeaderVisibility = () => {
  const context = useContext(HeaderVisibilityContext);
  if (!context) {
    throw new Error(
      'useHeaderVisibility must be used within a HeaderVisibilityProvider',
    );
  }
  return context;
};
