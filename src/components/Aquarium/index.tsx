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
      className="relative aspect-square w-full rounded-b-2xl"
    >
      <canvas ref={canvasRef} className="size-full" />
      <div
        className="absolute bottom-4 left-4 z-20 flex cursor-pointer items-center gap-1"
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
      <div className="absolute inset-x-0 bottom-0 z-10 h-1/5 bg-gradient-to-t from-[rgba(55,63,97,0.8)] to-[rgba(116,122,150,0.00)] bg-blend-multiply"></div>
    </div>
  );
};
