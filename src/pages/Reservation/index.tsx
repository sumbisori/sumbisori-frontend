import { useEffect, useState } from 'react';
import { BottomSheet } from '@/components/BottomSheet';
import { useModalController } from '@/contexts/ModalContext';
import { ReservationInfo } from '@/components/ReservationInfo/ReservationInfo';
import { useNavigate } from 'react-router-dom';
import { LargeButton } from '@/components/LargeButton';
import {
  ReservationHaenyeoPlace,
  ReservationHaenyeoPlaces,
  getReservationHaenyeoPlace,
  getReservationHaenyeoPlaces,
} from '@/api/reservation';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { NaverMap } from './NaverMap';

export const Reservation = () => {
  const { handleError } = useErrorHandler();
  const { openModal } = useModalController();
  const navigate = useNavigate();
  const [haenyeoPlaces, setHaenyeoPlaces] = useState<
    ReservationHaenyeoPlaces[]
  >([]);
  const [selectedPlace, setSelectedPlace] =
    useState<ReservationHaenyeoPlace | null>(null);

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
  const handlePinClick = async (placeId: string) => {
    try {
      const place = await getReservationHaenyeoPlace(placeId);
      setSelectedPlace(place);
      openModal(`reservation-${placeId}`);
    } catch (error) {
      handleError(error);
    }
  };

  const handleNavigate = () => {
    if (selectedPlace) {
      navigate(`/reservation/${selectedPlace.placeId}`);
    }
  };

  return (
    <>
      <div className="h-full items-center justify-center">
        <NaverMap places={haenyeoPlaces} onPinClick={handlePinClick} />
      </div>

      {/* 하단 팝업 */}
      {selectedPlace && (
        <BottomSheet id={`reservation-${selectedPlace.placeId}`}>
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
        </BottomSheet>
      )}
    </>
  );
};
