import { JournalCollectedSeafood } from '@/api/journalCreate/types';
import { Divider } from '@/components/Divider';
import { IconButton } from '@/components/IconButton';
import { ProgressBar } from '@/components/ProgressBar';
import { SeafoodImage } from '@/components/SeafoodImage';
import CharmPlusIcon from '@/icons/journal/charm-plus.svg?react';
import SparkIcon from '@/icons/journal/spark.svg?react';
import { useState, useEffect } from 'react';
import CloseIcon from '@/icons/journal/close.svg?react';

interface Props {
  collectedSeafood: JournalCollectedSeafood;
  editMode: boolean;
  onPlusClick: () => void;
  onSeafoodDelete: (imageIdentifier: string, seafoodId: number) => void;
}

export const CollectedSeafoodCard = ({
  collectedSeafood,
  editMode,
  onPlusClick,
  onSeafoodDelete,
}: Props) => {
  const { analysisStatus, collectionInfos } = collectedSeafood;
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    if (analysisStatus === 'success') {
      setProgressPercentage(100);
      return;
    }

    if (analysisStatus === 'failed') {
      setProgressPercentage(0);
      return;
    }

    if (analysisStatus === 'pending') {
      let progress = 0;
      const step = 5; // 5%씩 증가
      const maxProgress = 95; // 최대 95%까지만
      const stepCount = maxProgress / step; // 19단계 (0% -> 95%)
      const intervalTime = 5000 / stepCount; // 5초를 19단계로 나눔 (약 263ms)

      const timer = setInterval(() => {
        if (progress < maxProgress) {
          progress += step;
          setProgressPercentage(progress);
        } else {
          clearInterval(timer);
        }
      }, intervalTime);

      return () => {
        clearInterval(timer);
      };
    }
  }, [analysisStatus]);

  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl bg-white p-4">
      <div className="flex items-center gap-5">
        <div className="flex-1">
          <img
            src={URL.createObjectURL(collectedSeafood.file)}
            alt={collectedSeafood.file.name}
            className="aspect-square size-full rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 px-2">
          <div className="flex items-center gap-1">
            <SparkIcon />
            <p className="whitespace-nowrap text-sm font-medium">
              {analysisStatus === 'pending' && (
                <span className="text-gray-500">AI 분석 중..</span>
              )}
              {analysisStatus === 'failed' && (
                <span className="text-red-500">분석 실패</span>
              )}
              {analysisStatus === 'success' && <span>AI 분석완료</span>}
            </p>
          </div>

          <ProgressBar value={progressPercentage} max={100} />
        </div>
      </div>

      {analysisStatus === 'success' && (
        <>
          <Divider />
          <div className="flex flex-col gap-1.5">
            <h5 className="font-medium">분석 결과</h5>

            {collectionInfos.length === 0 ? (
              <p className="text-sm text-gray-500">해산물이 없습니다</p>
            ) : null}

            <div className="grid grid-cols-3 gap-x-[1.313rem] gap-y-4">
              {collectionInfos.length > 0 &&
                collectionInfos.map((seafood) => (
                  <div
                    key={seafood.englishName}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="relative flex size-[5.625rem] items-center justify-center">
                      <SeafoodImage
                        seafoodName={seafood.englishName}
                        variant="img"
                        className="size-3/5"
                      />
                      {editMode && (
                        <IconButton
                          className="absolute -right-1 -top-1 z-10"
                          variant="black"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSeafoodDelete(
                              collectedSeafood.imageIdentifier,
                              seafood.seafoodId,
                            );
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </div>
                    <p className="w-full rounded border border-gray-300 bg-gray-50 px-2.5 py-[0.313rem] text-center text-sm font-medium">
                      {seafood.koreanName} x {seafood.count}
                    </p>
                  </div>
                ))}

              {editMode && (
                <button
                  onClick={onPlusClick}
                  type="button"
                  className="flex h-[7.625rem] w-full items-center justify-center"
                >
                  <CharmPlusIcon />
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
