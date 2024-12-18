import { useEffect, useState } from 'react';
import { LocationPin } from './LocationPin';
import { Modal } from '../../components/Modal';
import { useModalContext } from '../../contexts/ModalContext';
import { ReservationInfo } from '../../components/ReservationInfo/ReservationInfo';
import { useNavigate } from 'react-router-dom';
import { LargeButton } from '../../components/LargeButton';
import {
  ReservationHaenyeoPlaces,
  getReservationHaenyeoPlaces,
} from '../../api/reservation';
import { KakaoMap } from './KakaoMap';
import { useErrorHandler } from '../../hooks/useErrorHandler';

export const Reservation = () => {
  const { handleError } = useErrorHandler();
  const [selectedPin, setSelectedPin] = useState<string | null>(null);
  const { openModal } = useModalContext();
  const navigate = useNavigate();
  const [haenyeoPlaces, setHaenyeoPlaces] = useState<
    ReservationHaenyeoPlaces[]
  >([]);
  const fetchHaenyeoPlaces = async () => {
    try {
      const response = await getReservationHaenyeoPlaces();
      setHaenyeoPlaces(response);
    } catch (error) {
      handleError(error);
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
    (place) => place.placeId === selectedPin,
  );

  return (
    <>
      <div className="h-full items-center justify-center">
        <KakaoMap places={haenyeoPlaces} onPinClick={handlePinClick} />
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
              <p className="text-[1rem] font-bold">체험 상세정보</p>
              <div className="h-40 grow overflow-auto whitespace-pre-line rounded-md bg-gray-200 p-2 text-[0.875rem]">
                {selectedPlace.desc}
              </div>
            </div>

            <div className="shrink-0">
              <LargeButton onClick={handleNavigate}>예약</LargeButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
