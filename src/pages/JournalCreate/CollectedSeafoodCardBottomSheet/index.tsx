import {
  JournalCollectedSeafood,
  SeafoodsTypeList,
} from '@/api/journalCreate/types';
import { Picker } from '@/components/Picker';
import { useState, useEffect } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

interface Props {
  collectedSeafood: JournalCollectedSeafood;
  seafoods: SeafoodsTypeList[];
  onSeafoodsChange: (seafoods: JournalCollectedSeafood) => void;
  open: boolean;
  onDismiss: () => void;
}

export const CollectedSeafoodCardBottomSheet = ({
  collectedSeafood,
  seafoods,
  onSeafoodsChange,
  open,
  onDismiss,
}: Props) => {
  const [selectedSeafood, setSelectedSeafood] =
    useState<SeafoodsTypeList | null>(null);
  const [selectedCount, setSelectedCount] = useState<number>(1);

  const filteredSeafoods = seafoods.filter(
    (seafood) =>
      !collectedSeafood?.seafoods?.some(
        (selected) => selected.seafoodId === seafood.seafoodId,
      ),
  );

  const handleSave = () => {
    if (selectedSeafood && collectedSeafood) {
      const updatedSeafoods = {
        ...collectedSeafood,
        seafoods: [
          ...(collectedSeafood.seafoods || []),
          {
            seafoodId: selectedSeafood.seafoodId,
            koreanName: selectedSeafood.koreanName,
            englishName: selectedSeafood.englishName,
            count: selectedCount,
          },
        ],
      };
      onSeafoodsChange(updatedSeafoods);
      onDismiss();
    }
  };

  // 첫번째 해산물로 초기화
  useEffect(() => {
    if (open && filteredSeafoods.length > 0) {
      setSelectedSeafood(filteredSeafoods[0]);
      setSelectedCount(1);
    }
  }, [open]);

  if (!collectedSeafood) {
    return null;
  }

  return (
    <BottomSheet
      open={open}
      onDismiss={onDismiss}
      header={
        <div className="flex items-center justify-between px-6 py-4">
          <button
            className="text-sm hover:text-gray-600 focus:outline-none active:text-gray-600"
            type="button"
            onClick={onDismiss}
            tabIndex={open ? 0 : -1}
          >
            취소
          </button>
          <button
            className="text-sm hover:text-gray-600 focus:outline-none active:text-gray-600"
            type="button"
            onClick={handleSave}
            tabIndex={open ? 0 : -1}
          >
            저장
          </button>
        </div>
      }
      scrollLocking={false}
    >
      <div className="flex">
        <Picker
          options={filteredSeafoods}
          optionKey="englishName"
          optionValue="koreanName"
          selectedOption={selectedSeafood}
          onSelect={setSelectedSeafood}
          emptyText="추가할 수 있는 해산물이 없습니다"
        />
        <Picker
          options={Array.from({ length: 20 }, (_, index) => index + 1)}
          selectedOption={selectedCount}
          onSelect={setSelectedCount}
          emptyText="수량을 선택해주세요"
        />
      </div>
    </BottomSheet>
  );
};
