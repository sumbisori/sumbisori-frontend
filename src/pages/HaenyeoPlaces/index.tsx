import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  HaenyeoPlaceDetail,
  HaenyeoPlacesLocations,
} from '@/api/haenyeoPlaces/types';
import { getHaenyeoPlaceDetail, getPlacesLocations } from '@/api/haenyeoPlaces';
import { queryKeys } from '@/query';
import { HaenyeoPlaceDetailSheet } from '@/pages/HaenyeoPlaces/components/HaenyeoPlaceDetailSheet';
import { NaverMap } from '@/pages/HaenyeoPlaces/components/NaverMap';
import { routes } from '@/routes/src/routes';

export const HaenyeoPlaces = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const placeIdParam = searchParams.get('placeId');
  const selectedPlaceId = placeIdParam ? parseInt(placeIdParam, 10) : null;

  const { data: haenyeoPlaces } = useQuery<HaenyeoPlacesLocations[]>({
    queryKey: [queryKeys.haenyeoPlacesLocations],
    queryFn: getPlacesLocations,
    initialData: [],
  });

  const { data: selectedPlace } = useQuery<HaenyeoPlaceDetail | null>({
    queryKey: [queryKeys.haenyeoPlaceDetail, selectedPlaceId],
    queryFn: () => {
      if (!selectedPlaceId) return Promise.resolve(null);
      return getHaenyeoPlaceDetail(selectedPlaceId);
    },
    enabled: !!selectedPlaceId,
  });

  const handlePinClick = (placeId: number) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      placeId: placeId.toString(),
    });
  };

  const handleBack = () => {
    setSearchParams(
      Object.fromEntries(
        Object.entries(searchParams).filter(([key]) => key !== 'placeId'),
      ),
    );
  };

  const handleMoreInfo = () => {
    if (!selectedPlaceId) return;
    navigate(routes.haenyeoPlacesDetail(selectedPlaceId));
  };

  return (
    <div className="relative h-layout-nav-height">
      <NaverMap
        selectedPlace={selectedPlace}
        places={haenyeoPlaces}
        onPinClick={handlePinClick}
        onBack={handleBack}
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
