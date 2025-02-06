import { useEffect, useState } from 'react';
import { BottomSheet } from '@/components/BottomSheet';
import { useNavigate } from 'react-router-dom';
import {
  ReservationHaenyeoPlace,
  ReservationHaenyeoPlaces,
  getReservationHaenyeoPlace,
  getReservationHaenyeoPlaces,
} from '@/api/reservation';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { NaverMap } from './NaverMap';

export type ShowModalType = 'none' | 'small' | 'full';

export const Reservation = () => {
  const { handleError } = useErrorHandler();
  const navigate = useNavigate();
  const [haenyeoPlaces, setHaenyeoPlaces] = useState<
    ReservationHaenyeoPlaces[]
  >([]);
  const [selectedPlace, setSelectedPlace] =
    useState<ReservationHaenyeoPlace | null>(null);
  const [showModal, setShowModal] = useState<ShowModalType>('none');

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
  const handlePinClick = async (placeId: number) => {
    try {
      const place = await getReservationHaenyeoPlace(placeId);
      setSelectedPlace(place);
      setShowModal('small');
    } catch (error) {
      handleError(error);
    }
  };

  const handleBack = () => {
    if (showModal === 'full') {
      setShowModal('small');
    }
    if (showModal === 'small') {
      setSelectedPlace(null);
      setShowModal('none');
    }
  };

  const handleClose = () => {
    setSelectedPlace(null);
    setShowModal('none');
  };

  return (
    // 부모 컨테이너에 relative 추가
    <div className="relative h-layout-nav-height">
      <NaverMap
        selectedPlace={selectedPlace}
        places={haenyeoPlaces}
        onPinClick={handlePinClick}
        onBack={handleBack}
        onClose={handleClose}
        showModal={showModal}
      />
      {selectedPlace && (
        <BottomSheet
          selectedPlace={selectedPlace}
          showModal={showModal}
          onMoreInfo={() => setShowModal('full')}
        />
      )}
    </div>
  );
};
