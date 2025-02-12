import { useDictionaryAquarium } from '@/hooks/useDictionaryAquarium';
import { useRef } from 'react';

export const DictionaryAquarium = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDictionaryAquarium(containerRef, canvasRef, 'SeaUrchin');
  return (
    <div
      ref={containerRef}
      className="relative aspect-7/3 w-full rounded-b-2xl"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
