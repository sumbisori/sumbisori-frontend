import { useRef } from 'react';
import { SeafoodCollected } from '@/api/home';
import { useAquarium } from '@/hooks/useAquarium';
import DictionaryIcon from '@/icons/dictionary.svg?react';
import { useNavigate } from 'react-router-dom';
interface AquariumProps {
  seafoods: SeafoodCollected[];
}

export const Aquarium = ({ seafoods }: AquariumProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useAquarium(containerRef, canvasRef, seafoods);

  return (
    <div
      ref={containerRef}
      className="relative h-[25.625rem] w-full rounded-b-2xl"
    >
      <canvas ref={canvasRef} className="size-full" />
      <div
        className="absolute bottom-4 left-4 z-10 flex cursor-pointer items-center gap-1"
        onClick={() => navigate('/dictionary')}
      >
        <DictionaryIcon className="size-6" />
        <div className="text-xl font-medium">
          <span className="text-white">
            {seafoods.filter((seafood) => seafood.count > 0).length}
          </span>
          <span className="text-blue-300">/18</span>
        </div>
      </div>
    </div>
  );
};
