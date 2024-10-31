import React, { useEffect, useState } from 'react';
import { Background } from '../../layouts/Background';
import { Button } from '../../components/Button';
import Example from '../../components/SingleSelectList';
import SingleDropdown from '../../components/SingleSelectList';
import {
  DictionarySeafoodAll,
  getSeafoodAll,
} from '../../api/dictionaryRegistration';

export const DictionaryRegistration = () => {
  const [seafoods, setSeafoods] = useState<DictionarySeafoodAll[]>([]);

  async function fetchSeafoods() {
    try {
      const res = await getSeafoodAll();
      setSeafoods(res);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchSeafoods();
  }, []);

  return (
    <>
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
        <div className="mb-12 flex w-[201px] flex-row justify-between">
          <div className="w-[125px]">
            <SingleDropdown
              label="채취물 종류"
              items={[
                { id: 0, name: '성게' },
                { id: 1, name: '전복' },
                { id: 2, name: '뿔소라' },
              ]}
            ></SingleDropdown>
          </div>
          <div className="w-[69px]">
            <SingleDropdown
              label="0개"
              items={[
                { id: 0, name: '0개' },
                { id: 1, name: '1개' },
                { id: 2, name: '2개' },
              ]}
            ></SingleDropdown>
          </div>
        </div>
        <button className="h-[47px] w-[201px] rounded-lg border border-gray-400 bg-gray-050 text-base font-medium text-gray-600">
          등록하기
        </button>
      </div>
    </>
  );
};
