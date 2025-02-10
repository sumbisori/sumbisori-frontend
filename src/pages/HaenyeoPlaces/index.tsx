import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ReservationHaenyeoPlace,
  ReservationHaenyeoPlaces,
  getReservationHaenyeoPlace,
  getReservationHaenyeoPlaces,
} from '@/api/haenyeoPlaces';
import { queryKeys } from '@/query';
import { HaenyeoPlaceDetailSheet } from '@/components/HaenyeoPlaceDetailSheet';
import { NaverMap } from '@/components/NaverMap';

export const HaenyeoPlaces = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const placeIdParam = searchParams.get('placeId');
  const selectedPlaceId = placeIdParam ? parseInt(placeIdParam, 10) : null;

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

  const handlePinClick = (placeId: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      placeId: placeId.toString(),
    });
  };

  const handleClose = () => {
    setSearchParams(
      Object.fromEntries(
        Object.entries(searchParams).filter(([key]) => key !== 'placeId'),
      ),
    );
  };

  const handleBack = () => {
    handleClose();
  };

  const handleMoreInfo = () => {
    if (!selectedPlaceId) return;
    navigate(`/haenyeo-places/${selectedPlaceId}`);
  };

  return (
    <div className="relative h-layout-nav-height">
      <NaverMap
        selectedPlace={selectedPlace}
        places={haenyeoPlaces}
        onPinClick={handlePinClick}
        onBack={handleBack}
        onClose={handleClose}
      />
      {selectedPlace && (
        <HaenyeoPlaceDetailSheet
          selectedPlace={selectedPlace}
          onMoreInfo={handleMoreInfo}
        />
      )}
    </div>
  );
};
