interface Props {
  reservationId: number;
  imageSrc: string;
  title: string;
  address: string;
  fullDate: string;
  people: number;
  status: 'PENDING' | 'END';
  onComplete?: (reservationId: number) => void;
  onCancel?: (reservationId: number) => void;
  onReview?: (reservationId: number) => void;
  onRegister?: (reservationId: number) => void;
}

export const MyPageReservationCard = ({
  reservationId,
  imageSrc,
  title,
  address,
  fullDate,
  people,
  status,
  onComplete,
  onCancel,
  onReview,
  onRegister,
}: Props) => {
  return (
    <div className="flex w-full flex-col p-[18px]">
      <div className="flex gap-2">
        <img src={imageSrc} alt="img" className="size-[72px] rounded-lg" />
        <div className="flex h-[72px] flex-col">
          <p className="text-[20px] font-semibold tracking-tight">{title}</p>
          <p className="w-[266px] truncate text-[10px]">{address}</p>
          <p className="text-[16px] font-bold">
            {fullDate} · {people}명
          </p>
        </div>
      </div>
      {status === 'PENDING' && (
        <div className="flex items-center gap-2 py-2">
          <MyPageButton
            onClick={() => {
              onComplete?.(reservationId);
            }}
          >
            체험 완료
          </MyPageButton>
          <MyPageButton
            onClick={() => {
              onCancel?.(reservationId);
            }}
          >
            예약 취소
          </MyPageButton>
        </div>
      )}
      {status === 'END' && (
        <div className="flex items-center gap-2 py-2">
          <MyPageButton
            onClick={() => {
              onReview?.(reservationId);
            }}
          >
            리뷰 작성
          </MyPageButton>
          <MyPageButton
            onClick={() => {
              onRegister?.(reservationId);
            }}
          >
            도감 등록
          </MyPageButton>
        </div>
      )}
    </div>
  );
};

const MyPageButton = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className="w-full cursor-pointer rounded-md border border-[#gray-200] bg-gray-000 px-2 py-1 text-[16px] text-[#B1B1B1] transition-colors duration-200 ease-in-out hover:border-[#007AFF] hover:bg-[#ebf5ff] hover:text-[#007AFF]"
      {...props}
    >
      {children}
    </button>
  );
};
