import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store'; // RootState는 Redux store 타입
import { KakaoLogin } from '../../components/KakaoLogin';
import { login, setUserInfo } from '../../store/modules/user';
import { Background } from '../../layouts/Background';
import { SeafoodCard } from '../../components/SeafoodCard';

export const Dictionary = () => {
  return (
    <Background>
      <div className="flex size-full flex-col">
        <div className="h-24 bg-gray-600"></div>
        <div className="size-full bg-white p-4">
          <div className="grid grid-cols-3 gap-4 overflow-auto rounded-lg border border-orange-200 p-4">
            <SeafoodCard seafoodName={'Gastropods'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Oyster'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Net'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'SeaSquirt'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Octopus'} has={false} isNew={false} />
            <SeafoodCard
              seafoodName={'WaterBottle'}
              has={false}
              isNew={false}
            />
            <SeafoodCard seafoodName={'SeaMustard'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Rope'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Omphalius'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Vinyl'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Murex'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Conch'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Squid'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Abalone'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'SeaUrchin'} has={false} isNew={false} />
            <SeafoodCard seafoodName={'Clam'} has={false} isNew={false} />
            <SeafoodCard
              seafoodName={'SeaCucumber'}
              has={false}
              isNew={false}
            />
            <SeafoodCard seafoodName={'Mussel'} has={false} isNew={false} />
          </div>
        </div>
      </div>
    </Background>
  );
};
