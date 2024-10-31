import React, { useEffect } from 'react';
import { Background } from '../../layouts/Background';
import { Button } from '../../components/Button';

export const DictionaryRegistration = () => {
  return (
    <Background>
      <div className="flex size-full flex-col items-center justify-center bg-white">
        <div className="mb-4 text-[22px] font-bold">사진을 등록해주세요</div>
        <div className="mb-4 flex size-[201px] items-center justify-center rounded-lg bg-gray-300">
          <div
            className="size-[36px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/icons/Image_Icon.svg)',
            }}
          ></div>
        </div>
        <div className="mb-12 flex flex-row"></div>
        <button className="h-[47px] w-[201px] rounded-lg border border-gray-400 bg-gray-050 text-base font-medium text-gray-600">
          등록하기
        </button>
      </div>
    </Background>
  );
};
