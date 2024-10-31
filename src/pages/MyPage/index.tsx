import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; // RootState는 Redux store 타입
import { Background } from '../../layouts/Background';

export const Dictionary = () => {
  return (
    <Background>
      <div className="flex size-full flex-col">
        <div className="h-24 bg-gray-600"></div>
        <div className="size-full bg-white p-4">
          <div className="grid grid-cols-3 gap-4 overflow-auto rounded-lg border border-orange-200 p-4"></div>
        </div>
      </div>
    </Background>
  );
};
