import { ReservationHaenyeoPlaces } from '@/api/reservation';
import { useEffect, useRef } from 'react';

interface NaverMapProps {
  places: ReservationHaenyeoPlaces[];
  onPinClick: (placeId: string) => void;
}

export const NaverMap = ({ places, onPinClick }: NaverMapProps) => {
  const naverMapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]); // 마커를 저장할 레퍼런스

  const Naver = window.naver;
  const NaverMaps = window.naver.maps;

  const customIconUrl = '/src/assets/icons/sumbi_map.svg';

  const initMap = () => {
    const container = document.getElementById('map');
    const mapOptions = {
      center: new NaverMaps.LatLng(33.37310402515643, 126.54168511624414),
      zoom: 9,
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
    <div
      id="map"
      className="z-10 h-[calc(100vh-4.438rem)] w-full min-w-80 max-w-[37.5rem]"
    />
  );
};
