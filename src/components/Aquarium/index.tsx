import { useRef } from 'react';
import { SeafoodCollected } from '@/api/home';
import { useAquarium } from '@/hooks/useAquarium';

interface AquariumProps {
  seafoods: SeafoodCollected[];
}

export const Aquarium = ({ seafoods }: AquariumProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useAquarium(containerRef, canvasRef, seafoods);

  return (
    <div
      ref={containerRef}
      className="relative h-[25.625rem] w-full rounded-b-2xl"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
