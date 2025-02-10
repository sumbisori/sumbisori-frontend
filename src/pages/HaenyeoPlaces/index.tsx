import { useState } from 'react';
import { HaenyeoPlaceDetailSheet } from '@/components/HaenyeoPlaceDetailSheet';
import {
  ReservationHaenyeoPlace,
  ReservationHaenyeoPlaces,
  getReservationHaenyeoPlace,
  getReservationHaenyeoPlaces,
} from '@/api/haenyeoPlaces';
import { NaverMap } from './NaverMap';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/query';

export type ShowModalType = 'none' | 'small' | 'full';

export const HaenyeoPlaces = () => {
  const [showModal, setShowModal] = useState<ShowModalType>('none');
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);

  const { data: haenyeoPlaces } = useQuery<ReservationHaenyeoPlaces[]>({
    queryKey: [queryKeys.haenyeoPlaces],
    queryFn: getReservationHaenyeoPlaces,
    initialData: [],
  });

  const { data: selectedPlace } = useQuery<ReservationHaenyeoPlace | null>({
    queryKey: [queryKeys.selectedHaenyeoPlace, selectedPlaceId],
    queryFn: () => {
      if (!selectedPlaceId) return Promise.resolve(null);
      return getReservationHaenyeoPlace(selectedPlaceId);
    },
    enabled: !!selectedPlaceId,
  });

  // 핀 클릭 핸들러
  const handlePinClick = async (placeId: number) => {
    setSelectedPlaceId(placeId);
    setShowModal('small');
  };

  const handleBack = () => {
    if (showModal === 'full') {
      setShowModal('small');
    }
    if (showModal === 'small') {
      setSelectedPlaceId(null);
      setShowModal('none');
    }
  };

  const handleClose = () => {
    setSelectedPlaceId(null);
    setShowModal('none');
  };

  return (
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
        <HaenyeoPlaceDetailSheet
          selectedPlace={selectedPlace}
          showModal={showModal}
          onMoreInfo={() => setShowModal('full')}
        />
      )}
    </div>
  );
};
