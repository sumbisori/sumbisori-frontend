import { parseCompanionType } from '@/util/parseCompanionType';
import { parseWeather } from '@/util/parseWeather';
import { useState } from 'react';
import OutlinePictureIcon from '@/icons/outline-picture.svg?react';
import { Image } from '@/components/Image';

interface Props {
  imageUrl: string;
  title: string;
  date: string;
  companionType: string;
  weather: string;
  onClick?: () => void;
}

export const Grid1Card = ({
  imageUrl,
  title,
  date,
  companionType,
  weather,
  onClick,
}: Props) => {
  return (
    <div
      className="flex shrink-0 items-start gap-4 border-b border-gray-200 py-4"
      onClick={onClick}
    >
      <Image
        src={imageUrl}
        alt="journal-image"
        className={`aspect-square size-[6.875rem] rounded-xl border border-gray-200`}
      />

      <div className="flex flex-col gap-1.5">
        <div className="text-base font-medium text-gray-500">{date}</div>
        <div className="whitespace-nowrap text-lg font-bold">{title}</div>
        <div className="text-sm text-blue-700">
          #{parseCompanionType(companionType)} #{parseWeather(weather)}
        </div>
      </div>
    </div>
  );
};
