import { useNavigate, useParams } from 'react-router-dom';
import { LargeButton } from '../../components/LargeButton';

export const DictionaryConfirm = () => {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="flex size-full items-center justify-center">
      <div className="flex w-full flex-col items-center justify-center">
        <div
          className={`relative size-[150px] self-center bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundImage: 'url(/images/Seafoods/' + params.seafood + '.svg)',
          }}
        />
        <div className="flex flex-col gap-3 text-center">
          <div className="text-[22px] font-bold">
            <span className="rounded-md border border-[#007AFF] px-[6px] py-[3px] font-bold text-[#007AFF]">
              {params.koreanName}
            </span>
            <span className="ml-2">가</span>
          </div>
          <div className="text-[22px] font-bold">등록 되었어요!</div>
        </div>
        <div className="mt-20 w-[200px]">
          <LargeButton onClick={() => navigate('/dictionary')}>
            물질도감 보러가기<img src="/icons/arrow-right2.svg"></img>
          </LargeButton>
        </div>
      </div>
    </div>
  );
};
