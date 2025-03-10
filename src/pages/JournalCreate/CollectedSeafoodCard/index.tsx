import { JournalCollectedSeafood } from '@/api/journalCreate/types';
import { Divider } from '@/components/Divider';
import { ProgressBar } from '@/components/ProgressBar';
import SparkIcon from '@/icons/journal/spark.svg?react';
interface Props {
  collectedSeafood: JournalCollectedSeafood;
}

export const CollectedSeafoodCard = ({ collectedSeafood }: Props) => {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white p-4">
      <div className="flex items-center gap-5">
        <div className="flex-1 shrink-0">
          <img
            src={URL.createObjectURL(collectedSeafood.file)}
            alt={collectedSeafood.file.name}
            className="aspect-square size-full rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-1">
            <SparkIcon />
            <p className="text-sm font-medium">AI 분석 중...</p>
          </div>
          <ProgressBar value={35} max={100} />
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-1.5">
        <h5 className="font-medium">분석 결과</h5>
        {/* 해산물들이 들어갈 위치 */}
      </div>
    </div>
  );
};
