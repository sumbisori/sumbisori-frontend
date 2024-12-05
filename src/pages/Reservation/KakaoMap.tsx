import { MutableRefObject, useEffect, useRef } from 'react';

interface KakaoMapProps {
  places: {
    placeId: string;
    name: string;
    latitude: number;
    longitude: number;
  }[];
  onPinClick: (placeId: string) => void;
}

export const KakaoMap = ({ places, onPinClick }: KakaoMapProps) => {
  const mapRef = useRef<HTMLElement | null>(null);

  const initMap = () => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(
        33.37310402515643,
        126.54168511624414,
      ),
      level: 11,
    };

    const map = new window.kakao.maps.Map(container as HTMLElement, options);
    (mapRef as MutableRefObject<any>).current = map;

    places.forEach((place) => {
      const markerPosition = new window.kakao.maps.LatLng(
        place.latitude,
        place.longitude,
      );
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);

      window.kakao.maps.event.addListener(marker, 'click', () => {
        onPinClick(place.placeId);
      });
    });
  };

  useEffect(() => {
    window.kakao.maps.load(() => initMap());
  }, [places]);

  return (
    <div
      id="map"
      className="z-10 h-[calc(100vh-4.438rem)] w-full min-w-80 max-w-[37.5rem]"
    />
  );
};
