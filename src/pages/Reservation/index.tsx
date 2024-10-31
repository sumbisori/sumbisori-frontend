import { useState } from 'react';
import { LocationPin } from './LocationPin';
import { Modal } from '../../components/Modal';
import { useModalContext } from '../../contexts/ModalContext';
import { ReservationInfo } from '../../components/ReservationInfo/ReservationInfo';
import { useNavigate } from 'react-router-dom';
import { LargeButton } from '../../components/LargeButton';

export const Reservation = () => {
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const { openModal } = useModalContext();
  const navigate = useNavigate();

  // 지도에 표시할 핀 위치 좌표
  const pinPositions = [
    { id: '1', x: 35, y: 30 },
    { id: '2', x: 50, y: 60 },
    { id: '3', x: 70, y: 40 },
    { id: '4', x: 80, y: 20 },
    { id: '5', x: 35, y: 75 },
  ];

  // 핀 클릭 핸들러
  const handlePinClick = (pinId: string) => {
    setSelectedPin(pinId);
    openModal(`reservation-${pinId}`);
  };

  const handleNavigate = () => {
    navigate(`/reservation-create/${selectedPin}`);
  };

  return (
    <div className="relative size-full bg-blue-100">
      <div className="flex size-full items-center justify-center">
        <img src="/icons/jeju_map.svg" alt="Map" className="size-full" />
        {pinPositions.map((position) => (
          <LocationPin
            key={position.id}
            x={position.x}
            y={position.y}
            onClick={() => handlePinClick(position.id)} // 핀 클릭 이벤트 전달
          />
        ))}
      </div>

      {/* 하단 팝업 */}
      <Modal id={`reservation-${selectedPin}`}>
        <div className="flex h-full flex-col gap-3">
          <ReservationInfo
            title="서귀포 사계어촌체험마을"
            address="안덕면 형제해안로 13-1 사계언촌게"
            price={50000}
            imageSrc="/images/example.png"
          />
          <div className="flex grow flex-col gap-2">
            <p className="text-[16px] font-bold">체험 상세정보</p>
            <div className="grow overflow-auto rounded-md bg-gray-200 p-2 text-[14px]">
              설명설명 설명설명 설명설명 설명설명 설명설명 설명설명 설명설명
              설명설명 설명설명 설명설명 설명설명 설명설명 설명설명 설명설명
              설명설명 설명설명 설명설명 설명설명 설명설명 설명설명 설명설명
            </div>
          </div>

          <div className="shrink-0">
            <LargeButton onClick={handleNavigate}>예약</LargeButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};
