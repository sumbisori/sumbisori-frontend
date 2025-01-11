import { ReservationHaenyeoPlaces } from '@/api/reservation';
import { useEffect, useRef } from 'react';
import MyLocationIcon from '@/icons/my-location.svg?react';

interface NaverMapProps {
  places: ReservationHaenyeoPlaces[];
  onPinClick: (placeId: string) => void;
}

export const NaverMap = ({ places, onPinClick }: NaverMapProps) => {
  const naverMapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]); // Stores the markers

  const Naver = window.naver;
  const NaverMaps = window.naver.maps;

  const customIconUrl = '/src/assets/icons/sumbi_map.svg';

  const initialPosition = useRef(
    new NaverMaps.LatLng(33.37310402515643, 126.54168511624414),
  ).current;

  const initialZoom = useRef(9).current;

  const initMap = () => {
    const container = document.getElementById('map');
    const mapOptions = {
      center: initialPosition,
      zoom: initialZoom,
    };

    const map = new NaverMaps.Map(container as HTMLElement, mapOptions);
    naverMapInstance.current = map;

    addMarkers();
  };

  const addMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    places.forEach((place) => {
      const marker = new NaverMaps.Marker({
        position: new NaverMaps.LatLng(place.latitude, place.longitude),
        map: naverMapInstance.current,
        icon: {
          url: customIconUrl,
          size: new NaverMaps.Size(40, 40),
          anchor: new NaverMaps.Point(20, 40),
          scaledSize: new NaverMaps.Size(40, 40),
        },
      });

      NaverMaps.Event.addListener(marker, 'click', () => {
        onPinClick(place.placeId);
      });

      markersRef.current.push(marker);
    });
  };

  const handleRecenter = () => {
    if (naverMapInstance.current) {
      naverMapInstance.current.setCenter(initialPosition);
      naverMapInstance.current.setZoom(initialZoom);
    } else {
      console.error('Naver Maps API가 로드되지 않았습니다.');
    }
  };

  useEffect(() => {
    if (!Naver || !NaverMaps) {
      console.error('Naver Maps API가 로드되지 않았습니다.');
      return;
    }

    initMap();

    return () => {
      if (naverMapInstance.current) {
        naverMapInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (naverMapInstance.current) {
      addMarkers();
    }
  }, [places]);

  return (
    <div className="relative h-layout-height w-full">
      <div id="map" className="z-10 size-full min-w-80 max-w-[37.5rem]" />
      <button
        onClick={handleRecenter}
        className="absolute bottom-4 left-4 z-20 cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
        aria-label="Re-center Map"
      >
        <MyLocationIcon className="size-6" />
      </button>
    </div>
  );
};
