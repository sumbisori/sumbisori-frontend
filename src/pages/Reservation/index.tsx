import { useEffect, useState } from 'react';
import { LocationPin } from './LocationPin';
import { Modal } from '../../components/Modal';
import { useModalContext } from '../../contexts/ModalContext';
import { ReservationInfo } from '../../components/ReservationInfo/ReservationInfo';
import { useNavigate } from 'react-router-dom';
import { LargeButton } from '../../components/LargeButton';
import {
  ReservationHaenyeoPlace,
  getReservationHaenyeoPlaces,
} from '../../api/reservation';

export const Reservation = () => {
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const { openModal } = useModalContext();
  const navigate = useNavigate();
  const [haenyeoPlaces, setHaenyeoPlaces] = useState<ReservationHaenyeoPlace[]>(
    [],
  );
  const fetchHaenyeoPlaces = async () => {
    try {
      const response = await getReservationHaenyeoPlaces();
      setHaenyeoPlaces(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHaenyeoPlaces();
  }, []);

  // 핀 클릭 핸들러
  const handlePinClick = (pinId: string) => {
    setSelectedPin(pinId);
    openModal(`reservation-${pinId}`);
  };

  const handleNavigate = () => {
    if (selectedPin) {
      navigate(`/reservation-create/${selectedPin}`);
    }
  };

  const selectedPlace = haenyeoPlaces.find(
    (place) => place.value === selectedPin,
  );

  return (
    <div className="size-full bg-blue-100">
      <div className="flex size-full items-center justify-center">
        <img src="/icons/jeju_map.svg" alt="Map" className="size-full" />
        {haenyeoPlaces.map((place) => (
          <LocationPin
            key={place.value}
            x={place.x}
            y={place.y}
            onClick={() => handlePinClick(place.value)}
          />
        ))}
      </div>

      {/* 하단 팝업 */}
      {selectedPlace && (
        <Modal id={`reservation-${selectedPin}`}>
          <div className="flex h-full flex-col gap-3">
            <ReservationInfo
              title={selectedPlace.name}
              address={selectedPlace.address}
              price={selectedPlace.price}
              imageSrc={selectedPlace.imageUrl}
            />
            <div className="flex grow flex-col gap-2">
              <p className="text-[16px] font-bold">체험 상세정보</p>
              <div className="grow overflow-auto rounded-md bg-gray-200 p-2 text-[14px]">
                {selectedPlace.desc}
              </div>
            </div>

            <div className="shrink-0">
              <LargeButton onClick={handleNavigate}>예약</LargeButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
