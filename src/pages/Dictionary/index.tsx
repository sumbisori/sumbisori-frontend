import { useEffect, useState } from 'react';
import { SeafoodCard } from '../../components/SeafoodCard';
import { AlertBox } from '../../components/AlertBox';
import { DictionarySeafood, getSeafoodMy } from '../../api/dictionary';
import { useModalContext } from '../../contexts/ModalContext';

export const Dictionary = () => {
  const { openModal } = useModalContext();
  const [seafoods, setSeafoods] = useState<DictionarySeafood[]>([]);
  const [selectedSeafood, setSelectedSeafood] =
    useState<DictionarySeafood | null>(null);
  const fetchSeafoods = async () => {
    try {
      const response = await getSeafoodMy();
      setSeafoods(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeafoodClick = (seafood: DictionarySeafood) => {
    setSelectedSeafood(seafood);
    openModal(`seafood-${seafood.name}`);
  };

  useEffect(() => {
    fetchSeafoods();
  }, []);

  const suffix =
    selectedSeafood && selectedSeafood?.count > 0 ? '-color' : '-black';

  return (
    <div className="overflow-hidden">
      <div className="hide-scroll overflow-auto px-[18px] pb-[18px]">
        <div className="mt-4 grid grid-cols-3 justify-center gap-3 rounded-lg border border-orange-200 bg-white p-3">
          {seafoods.map((seafood) => (
            <SeafoodCard
              key={seafood.englishName}
              isNew={false}
              seafoodName={seafood.englishName}
              counts={seafood.count}
              name={seafood.name}
              onClick={() => handleSeafoodClick(seafood)}
            />
          ))}
        </div>
      </div>
      {selectedSeafood && (
        <AlertBox id={`seafood-${selectedSeafood.name}`}>
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
              {selectedSeafood.name}
            </div>
            <div className="min-h-[80px] border-b-2 py-3 text-center text-[15px]">
              {selectedSeafood.count > 0
                ? selectedSeafood.description
                : '아직 수집하지 못했어요'}
            </div>
            <div className="text-center text-sm">
              채취시기 | {selectedSeafood.insDt ? selectedSeafood.insDt : '-'}
            </div>
          </div>
        </AlertBox>
      )}
    </div>
  );
};
