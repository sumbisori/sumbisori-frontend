import { Badge } from '@/api/myPageBadge/types';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { SumbiBadge } from '@/components/SumbiBadge';
import { LargeButton } from '@/components/LargeButton';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface BadgeInfoBottomSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedBadge: Badge;
}

export const BadgeInfoBottomSheet = ({
  open,
  setOpen,
  selectedBadge,
}: BadgeInfoBottomSheetProps) => {
  const [showInitialAnimation, setShowInitialAnimation] = useState(false);

  useEffect(() => {
    if (open) {
      // BottomSheet가 열리고 0.5초 후에 애니메이션 시작
      const timer1 = setTimeout(() => {
        setShowInitialAnimation(true);
      }, 500);

      // 2.5초 후에 애니메이션 종료
      const timer2 = setTimeout(() => {
        setShowInitialAnimation(false);
      }, 2500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      // BottomSheet가 닫힐 때 애니메이션 상태 초기화
      setShowInitialAnimation(false);
    }
  }, [open]);

  return (
    <BottomSheet
      open={open}
      onDismiss={() => setOpen(false)}
      scrollLocking={false}
      header={<div></div>}
    >
      <div className="flex flex-col items-center gap-9 px-6 py-12">
        <p className="text-xl font-semibold text-gray-700">
          모든 배지를 획득하셨네요!
        </p>

        <div className="flex flex-col items-center gap-8">
          <div id="badge-animation-container" className="flex items-center">
            <SumbiBadge
              type={selectedBadge.isAcquired ? 'gold' : 'default'}
              size={128}
              className="relative z-30"
              enableAnimation={true}
              backText="금배지 획득!"
              initialFlip={showInitialAnimation}
              open={open}
            />
            <SumbiBadge
              type={selectedBadge.isAcquired ? 'silver' : 'default'}
              size={128}
              className="relative z-20 -ml-8"
              enableAnimation={true}
              backText="은배지 획득!"
              initialFlip={showInitialAnimation}
              open={open}
            />
            <SumbiBadge
              type={selectedBadge.isAcquired ? 'bronze' : 'default'}
              size={128}
              className="relative z-10 -ml-8"
              enableAnimation={true}
              backText="동배지 획득!"
              initialFlip={showInitialAnimation}
              open={open}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <h3
              className={clsx(
                'text-3xl',
                selectedBadge.isAcquired ? 'text-black' : 'text-gray-500',
              )}
            >
              {selectedBadge.badgeName}
            </h3>
            <p
              className={clsx(
                'text-base',
                selectedBadge.isAcquired ? 'text-black' : 'text-gray-500',
              )}
            >
              {/* {selectedBadge.badgeDescription} */}
            </p>
          </div>
        </div>

        <LargeButton buttonType="secondary" className="!py-4 font-semibold">
          대표배지 설정하기
        </LargeButton>
      </div>
    </BottomSheet>
  );
};
