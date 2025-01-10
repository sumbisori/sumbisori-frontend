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
    <div>
      <div className="p-[1.125rem]">
        <div className="grid grid-cols-3 gap-3 rounded-lg border border-orange-200 bg-white p-3">
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
              className={` ${selectedSeafood.count > 0 ? '' : 'grayscale'} relative size-[9.375rem] self-center bg-cover bg-center bg-no-repeat`}
              style={{
                backgroundImage:
                  'url(/src/assets/images/Seafoods/' +
                  selectedSeafood.englishName +
                  '.svg)',
              }}
            />
            <div
              className={`${selectedSeafood.count > 0 ? 'border-orange-200' : 'border-gray-200'} w-full rounded-lg border py-0.5 text-center text-[1.125rem] font-bold`}
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
        </AlertBox>
      )}
    </div>
  );
};
