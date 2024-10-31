import { useEffect, useState } from 'react';
import { SeafoodCard } from '../../components/SeafoodCard';
import { AlertBox } from '../../components/AlertBox';
import { DictionarySeafood, getDictionarySeafood } from '../../api/dictionary';

export const Dictionary = () => {
  const [seafoods, setSeafoods] = useState<DictionarySeafood[]>([]);
  const [selectedSeafood, setSelectedSeafood] =
    useState<DictionarySeafood | null>(null);
  const fetchSeafoods = async () => {
    try {
      const response = await getDictionarySeafood();
      setSeafoods(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeafoodClick = (seafood: DictionarySeafood) => {
    setSelectedSeafood(seafood);
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
              key={seafood.englishName}
              isNew={false}
              seafoodName={seafood.name}
              counts={seafood.count}
              onClick={() => handleSeafoodClick(seafood)}
            />
          ))}
        </div>
      </div>
      {selectedSeafood && (
        <AlertBox id={`seafood-${selectedSeafood.name}`}>
          <div className="flex flex-col gap-3">
            <div
              className="relative size-[100px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url(/imaghes/SeafoodCard/' + selectedSeafood.name + '.svg)',
              }}
            />
            <div className="text-sm">{selectedSeafood.desc}</div>
            <div className="text-sm">채취시기 | {selectedSeafood.insDt}</div>
          </div>
        </AlertBox>
      )}
    </div>
  );
};
