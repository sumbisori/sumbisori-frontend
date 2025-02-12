import {
  BottomSheet as SpringBottomSheet,
  BottomSheetProps,
} from 'react-spring-bottom-sheet';
import '@/styles/bottomSheet.css';
import { useMemo } from 'react';

type CustomSnapPoint = 'top' | 'middle' | 'bottom';

interface Props extends BottomSheetProps {
  children: React.ReactNode;
  customSnapPoints?: CustomSnapPoint[];
}

export const BottomSheet = ({
  children,
  customSnapPoints = ['top', 'middle', 'bottom'],
  ...props
}: Props) => {
  const snapPoints = useMemo(() => {
    return {
      top: window.innerHeight * 0.97 - 91,
      middle: window.innerHeight * 0.7 - 91,
      bottom: window.innerHeight * 0.3 - 91,
    };
  }, [window.innerHeight]);

  const getSnapPoints = (customSnapPoints: CustomSnapPoint[]) => {
    return customSnapPoints.map((point) => snapPoints[point]);
  };
  return (
    <SpringBottomSheet
      {...props}
      snapPoints={() => getSnapPoints(customSnapPoints)}
    >
      {children}
    </SpringBottomSheet>
  );
};
