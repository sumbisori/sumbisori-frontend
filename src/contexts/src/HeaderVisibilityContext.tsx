import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from 'react';

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // 페이지의 끝에 가까울 경우 헤더 상태 변경을 하지 않음
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
