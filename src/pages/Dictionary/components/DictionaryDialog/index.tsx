import { DictionarySeafood } from '@/api/dictionary/types';
import { Dialog } from '@/components/Dialog';
import { SeafoodImage } from '@/components/SeafoodImage';

interface Props {
  selectedSeafood: DictionarySeafood;
}

export const DictionaryDialog = ({ selectedSeafood }: Props) => {
  return (
    <Dialog id={`seafood-${selectedSeafood.koreanName}`}>
      <div className="flex h-full flex-col justify-between">
        <SeafoodImage
          className="size-32"
          seafoodName={selectedSeafood.englishName}
          grayscale={selectedSeafood.count === 0}
          variant="div"
        />
        <div
          className={clsx(
            'w-full rounded-lg border py-0.5 text-center text-lg font-bold',
            selectedSeafood.count > 0 ? 'border-orange-200' : 'border-gray-200',
          )}
        >
          {selectedSeafood.koreanName}
        </div>
        <div className="min-h-20 border-b-2 py-3 text-center text-[0.938rem]">
          {selectedSeafood.count > 0 ? selectedSeafood.description : '???'}
        </div>
        <div className="text-center text-sm">
          채취시기 |{' '}
          {selectedSeafood.insDt ? selectedSeafood.insDt : '아직 잡지 못했어요'}
        </div>
      </div>
    </Dialog>
  );
};
