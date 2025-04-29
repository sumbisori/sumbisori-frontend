import { BadgeDetail } from '@/api/myPageBadge/types';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { SumbiBadge } from '@/components/SumbiBadge';
import { LargeButton } from '@/components/LargeButton';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query/src/queryKeys';
import { getBadgeDetail } from '@/api/myPageBadge';
import { BadgeInfoBottomSheetSkeleton } from '../BadgeInfoBottomSheetSkeleton';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';
import { parseBadgeType } from '@/util/parseBadgeType';

interface BadgeInfoBottomSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedBadgeId: number;
}

export const BadgeInfoBottomSheet = ({
  open,
  setOpen,
  selectedBadgeId,
}: BadgeInfoBottomSheetProps) => {
  const [showInitialAnimation, setShowInitialAnimation] = useState(false);
  const [flippedBadgeId, setFlippedBadgeId] = useState<number | null>(null);

  const {
    data: badgeDetail,
    isPending,
    isError,
  } = useQuery<BadgeDetail>({
    queryKey: [queryKeys.myPageBadgeDetail, selectedBadgeId],
    queryFn: () => {
      if (!selectedBadgeId) throw new Error();
      return getBadgeDetail(selectedBadgeId);
    },
    enabled: !!selectedBadgeId,
  });

  const acquiredBadgeCount = useMemo(() => {
    return (
      badgeDetail?.badgeLevelDetails.filter((detail) => detail.isAcquired)
        .length ?? 0
    );
  }, [badgeDetail?.badgeLevelDetails]);

  const totalBadgeCount = useMemo(() => {
    return badgeDetail?.badgeLevelDetails.length ?? 0;
  }, [badgeDetail?.badgeLevelDetails]);

  // 모든 뱃지를 획득한 경우는 isAllAcquired 처리
  const isAllAcquired = useMemo(() => {
    return acquiredBadgeCount === totalBadgeCount;
  }, [acquiredBadgeCount, totalBadgeCount]);

  // 하나의 뱃지라도 획득한 경우는 isSomeAcquired 처리
  const isSomeAcquired = useMemo(() => {
    return acquiredBadgeCount > 0;
  }, [acquiredBadgeCount]);

  // 하나의 뱃지도 획득하지 못한 경우는 isNotAcquired 처리
  const isNotAcquired = useMemo(() => {
    return acquiredBadgeCount === 0;
  }, [acquiredBadgeCount]);

  const parseBadgeNotice = () => {
    if (isNotAcquired) {
      return '아직 획득하지 못했어요';
    }
    if (badgeDetail?.badgeType === 'RANKED') {
      switch (acquiredBadgeCount) {
        case 1:
          return '동배지를 획득하셨네요!';
        case 2:
          return '은배지를 추가 획득하셨네요!';
        case 3:
          return '모든 배지를 획득하셨네요!';
        default:
          return '아직 획득하지 못했어요';
      }
    }
    if (isAllAcquired && totalBadgeCount === 1) {
      return '배지를 획득하셨네요!';
    }
    if (isAllAcquired) {
      return <span className="text-blue-700">모든 배지를 획득하셨네요!</span>;
    }
    return '배지를 획득하셨네요';
  };

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

  useEffect(() => {
    if (!open) {
      setFlippedBadgeId(null);
    }
  }, [open]);

  if (isPending) {
    return <BadgeInfoBottomSheetSkeleton />;
  }

  if (isError) {
    return (
      <ImageWithTextAlert
        src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
        alt="haenyeo_sad"
        text="배지 정보를 불러오는데 실패했어요."
      />
    );
  }

  return (
    <BottomSheet
      open={open}
      onDismiss={() => {
        setFlippedBadgeId(null);
        setOpen(false);
      }}
      scrollLocking={false}
      header={<div></div>}
    >
      <div className="flex flex-col items-center gap-9 px-6 py-9">
        <h3 className="text-xl font-semibold text-gray-700">
          {parseBadgeNotice()}
        </h3>

        <div className="flex w-full flex-col items-center gap-4">
          <div className="flex w-full flex-col items-center gap-6">
            <div className="flex w-full flex-col items-center gap-8">
              <div id="badge-animation-container" className="flex items-center">
                {badgeDetail.badgeLevelDetails.map(
                  (badgeLevelDetail, index) => (
                    <SumbiBadge
                      key={badgeLevelDetail.badgeLevelId}
                      type={
                        badgeLevelDetail.isAcquired
                          ? parseBadgeType(
                              badgeDetail.badgeType,
                              badgeLevelDetail.level,
                            )
                          : 'default'
                      }
                      size={'large'}
                      className={clsx(
                        'relative',
                        index > 0 && '-ml-8',
                        index === 0 && 'z-30',
                        index === 1 && 'z-20',
                        index === 2 && 'z-10',
                      )}
                      enableAnimation={true}
                      backLevelDescriptionText={
                        badgeLevelDetail.levelDescription
                      }
                      backAcquisitionDateText={badgeLevelDetail.acquisitionDate}
                      initialFlip={showInitialAnimation}
                      isFlipped={
                        flippedBadgeId === badgeLevelDetail.badgeLevelId
                      }
                      onFlip={() => {
                        if (badgeLevelDetail.isAcquired) {
                          setFlippedBadgeId(
                            flippedBadgeId === badgeLevelDetail.badgeLevelId
                              ? null
                              : badgeLevelDetail.badgeLevelId,
                          );
                        }
                      }}
                    />
                  ),
                )}
              </div>
              <div className="flex flex-col items-center gap-2">
                <h3
                  className={clsx(
                    'text-3xl font-medium',
                    isSomeAcquired ? 'text-black' : 'text-gray-500',
                  )}
                >
                  {badgeDetail.name}
                </h3>
                <p
                  className={clsx(
                    'text-center text-base',
                    isSomeAcquired ? 'text-black' : 'text-gray-500',
                  )}
                >
                  {badgeDetail.description}
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col items-center rounded bg-gray-050 py-1 text-gray-800">
              획득방법: {badgeDetail.acquisition}
            </div>
          </div>
          <LargeButton
            buttonType="secondary"
            className="!py-4 font-semibold"
            disabled={isNotAcquired}
          >
            대표배지 설정하기
          </LargeButton>
        </div>
      </div>
    </BottomSheet>
  );
};
