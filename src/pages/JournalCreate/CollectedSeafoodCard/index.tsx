import { JournalCollectedSeafood } from '@/api/journalCreate/types';
import { Divider } from '@/components/Divider';
import { ProgressBar } from '@/components/ProgressBar';
import { SeafoodImage } from '@/components/SeafoodImage';
import SparkIcon from '@/icons/journal/spark.svg?react';
import { useState, useEffect } from 'react';

interface Props {
  collectedSeafood: JournalCollectedSeafood;
}

export const CollectedSeafoodCard = ({ collectedSeafood }: Props) => {
  const { analysisStatus, seafoods } = collectedSeafood;
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
      const timer1 = setTimeout(() => setProgressPercentage(20), 1000);
      const timer2 = setTimeout(() => setProgressPercentage(40), 2000);
      const timer3 = setTimeout(() => setProgressPercentage(60), 3000);
      const timer4 = setTimeout(() => setProgressPercentage(80), 4000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
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
      {analysisStatus === 'success' && seafoods.length > 0 && (
        <>
          <Divider />
          <div className="flex flex-col gap-1.5">
            <h5 className="font-medium">분석 결과</h5>
            <div className="grid grid-cols-3 gap-x-[1.313rem] gap-y-1">
              {seafoods.map((seafood) => (
                <div
                  key={seafood.englishName}
                  className="flex flex-col items-center justify-center"
                >
                  <SeafoodImage
                    seafoodName={seafood.englishName}
                    variant="img"
                    className="size-[5.625rem]"
                  />
                  <p className="w-full rounded border border-gray-300 bg-gray-50 px-2.5 py-[0.313rem] text-center text-sm font-medium">
                    {seafood.koreanName} x {seafood.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {analysisStatus === 'success' && seafoods.length === 0 && (
        <div className="flex flex-col gap-1.5">
          <h5 className="font-medium">분석 결과</h5>
          <p className="text-sm text-gray-500">해산물이 없습니다.</p>
        </div>
      )}
    </div>
  );
};
