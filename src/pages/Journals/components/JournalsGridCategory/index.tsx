import GridIcon1 from '@/icons/journal/grid1.svg?react';
import GridIcon2 from '@/icons/journal/grid2.svg?react';
import GridIcon3 from '@/icons/journal/grid3.svg?react';

interface Props {
  viewMode: 'grid2' | 'grid3' | 'grid1';
  onViewModeChange: (mode: 'grid2' | 'grid3' | 'grid1') => void;
  totalElements: number;
}

export const JournalsGridCategory = ({
  viewMode,
  onViewModeChange,
  totalElements,
}: Props) => {
  const activeGridStyle = (mode: 'grid2' | 'grid3' | 'grid1') => {
    return clsx(
      viewMode === mode ? 'text-gray-600' : 'text-gray-300',
      'cursor-pointer hover:text-gray-600',
    );
  };

  return (
    <div id="journal-title" className="flex items-center justify-between">
      <h3 className="text-xl font-bold">체험 일지({totalElements}건)</h3>
      <div className="flex items-center gap-0.5">
        <GridIcon2
          className={activeGridStyle('grid2')}
          onClick={() => onViewModeChange('grid2')}
        />
        <GridIcon3
          className={activeGridStyle('grid3')}
          onClick={() => onViewModeChange('grid3')}
        />
        <GridIcon1
          className={activeGridStyle('grid1')}
          onClick={() => onViewModeChange('grid1')}
        />
      </div>
    </div>
  );
};
