import { useDictionaryAquarium } from '@/hooks/useDictionaryAquarium';
import { useRef } from 'react';

interface Props {
  favoriteSeafoodName: string;
}

export const DictionaryAquarium = ({ favoriteSeafoodName }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDictionaryAquarium(containerRef, canvasRef, favoriteSeafoodName);
  return (
    <div
      ref={containerRef}
      className="relative aspect-7/3 w-full rounded-b-2xl"
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
