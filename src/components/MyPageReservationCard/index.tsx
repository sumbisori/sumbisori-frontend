import { TimeLabel } from '../TimeLabel/TimeLabel';

interface Props {
  imageSrc: string;
  title: string;
  address: string;
  fullDate: number;
  people: number;
}

export const MyPageReservationCard = ({
  imageSrc,
  title,
  address,
  fullDate,
  people,
}: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex gap-2">
        <img src={imageSrc} alt="img" className="size-[72px] rounded-lg" />
        <div className="flex h-[72px] flex-col">
          <p className="text-[20px] font-semibold tracking-tight">{title}</p>
          <p className="text-[12px]">{address}</p>
          <p className="text-[16px] font-bold">
            {fullDate}·{people}명
          </p>
        </div>
      </div>
      <div>
        <TimeLabel>예약 변경</TimeLabel>
        <TimeLabel>예약 취소</TimeLabel>
      </div>
      {/* <div>
        <TimeLabel>리뷰 작성</TimeLabel>
        <TimeLabel>도감 등록</TimeLabel>
      </div> */}
    </div>
  );
};
