import { useRef, useState } from 'react';
import { SeafoodCard } from '@/components/SeafoodCard';
import { Dialog } from '@/components/Dialog';
import { DictionarySeafood, getSeafoods } from '@/api/dictionary';
import { useModalController } from '@/contexts/src/ModalContext';
import { IMAGE_PATHS } from '@/constant';
import Skeleton from '@/components/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';

import { useDictionaryAquarium } from '@/hooks/useDictionaryAquarium';

export const Dictionary = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDictionaryAquarium(containerRef, canvasRef, 'SeaUrchin');
  const { openModal } = useModalController();
  const [selectedSeafood, setSelectedSeafood] =
    useState<DictionarySeafood | null>(null);

  const {
    data: seafoods,
    isLoading,
    isError,
    error,
  } = useQuery<DictionarySeafood[]>({
    queryKey: [queryKeys.seafoods],
    queryFn: getSeafoods,
  });

  const handleSeafoodClick = (seafood: DictionarySeafood) => {
    setSelectedSeafood(seafood);
    openModal(`seafood-${seafood.koreanName}`);
  };

  return (
    <div>
      <div
        ref={containerRef}
        className="relative aspect-7/3 w-full rounded-b-2xl"
      >
        <canvas ref={canvasRef} className="size-full" />
      </div>
      <div className="p-[1.125rem]">
        <div></div>
        <div className="grid grid-cols-3 gap-3 rounded-lg p-3">
          {isLoading &&
            Array.from({ length: 18 }).map((_, index) => (
              <Skeleton
                key={index}
                className="aspect-square"
                width="100%"
                height="100%"
              />
            ))}

          {isError && (
            <div className="col-span-3 text-center text-red-500">
              {error instanceof Error
                ? error.message
                : '데이터를 불러오는 중 에러가 발생했습니다.'}
            </div>
          )}

          {!isLoading &&
            !isError &&
            seafoods &&
            seafoods.map((seafood) => (
              <SeafoodCard
                key={seafood.seafoodId}
                isNew={false}
                seafoodName={seafood.englishName}
                counts={seafood.count}
                name={seafood.koreanName}
                onClick={() => handleSeafoodClick(seafood)}
              />
            ))}
        </div>
      </div>

      {selectedSeafood && (
        <Dialog id={`seafood-${selectedSeafood.koreanName}`}>
          <div className="flex h-full flex-col justify-between">
            <div
              className={`${selectedSeafood.count > 0 ? '' : 'grayscale'} relative size-[9.375rem] self-center bg-cover bg-center bg-no-repeat`}
              style={{
                backgroundImage: `url(${IMAGE_PATHS.SEAFOOD}/${selectedSeafood.englishName}.svg)`,
              }}
            />
            <div
              className={`${selectedSeafood.count > 0 ? 'border-orange-200' : 'border-gray-200'} w-full rounded-lg border py-0.5 text-center text-lg font-bold`}
            >
              {selectedSeafood.koreanName}
            </div>
            <div className="min-h-20 border-b-2 py-3 text-center text-[0.938rem]">
              {selectedSeafood.count > 0 ? selectedSeafood.description : '???'}
            </div>
            <div className="text-center text-sm">
              채취시기 |{' '}
              {selectedSeafood.insDt
                ? selectedSeafood.insDt
                : '아직 잡지 못했어요'}
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};
