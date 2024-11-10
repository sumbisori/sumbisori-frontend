import { useEffect, useState } from 'react';
import { SeafoodCard } from '../../components/SeafoodCard';
import { AlertBox } from '../../components/AlertBox';
import { DictionarySeafood, getSeafoods } from '../../api/dictionary';
import { useModalContext } from '../../contexts/ModalContext';
import { useErrorHandler } from '../../hooks/useErrorHandler';

export const Dictionary = () => {
  const { openModal } = useModalContext();
  const { handleError } = useErrorHandler();
  const [seafoods, setSeafoods] = useState<DictionarySeafood[]>([]);
  const [selectedSeafood, setSelectedSeafood] =
    useState<DictionarySeafood | null>(null);
  const fetchSeafoods = async () => {
    try {
      const response = await getSeafoods();
      setSeafoods(response);
    } catch (error) {
      handleError(error);
    }
  };

  const handleSeafoodClick = (seafood: DictionarySeafood) => {
    setSelectedSeafood(seafood);
    openModal(`seafood-${seafood.koreanName}`);
  };

  useEffect(() => {
    fetchSeafoods();
  }, []);

  return (
    <div className="overflow-hidden">
      <div className="hide-scroll overflow-auto px-[18px] pb-[18px]">
        <div className="mt-4 grid grid-cols-3 justify-center gap-3 rounded-lg border border-orange-200 bg-white p-3">
          {seafoods.map((seafood) => (
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
        <AlertBox id={`seafood-${selectedSeafood.koreanName}`}>
          <div className="flex h-full flex-col justify-between">
            <div
              className={` ${selectedSeafood.count > 0 ? '' : 'grayscale'} relative size-[150px] self-center bg-cover bg-center bg-no-repeat`}
              style={{
                backgroundImage:
                  'url(/images/Seafoods/' +
                  selectedSeafood.englishName +
                  '.svg)',
              }}
            />
            <div
              className={`${selectedSeafood.count > 0 ? 'border-orange-200' : 'border-gray-200'} w-full rounded-lg border py-[2px] text-center text-[18px] font-bold`}
            >
              {selectedSeafood.koreanName}
            </div>
            <div className="min-h-[80px] border-b-2 py-3 text-center text-[15px]">
              {selectedSeafood.count > 0 ? selectedSeafood.description : '???'}
            </div>
            <div className="text-center text-sm">
              채취시기 |{' '}
              {selectedSeafood.insDt
                ? selectedSeafood.insDt
                : '아직 잡지 못했어요'}
            </div>
          </div>
        </AlertBox>
      )}
    </div>
  );
};
