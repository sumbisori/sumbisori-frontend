import { ReservationHaenyeoPlaces } from '@/api/reservation';
import { useEffect, useRef } from 'react';
import MyLocationIcon from '@/icons/my-location.svg?react';

interface NaverMapProps {
  places: ReservationHaenyeoPlaces[];
  onPinClick: (placeId: string) => void;
}

export const NaverMap = ({ places, onPinClick }: NaverMapProps) => {
  const naverMapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const Naver = window.naver;
  const NaverMaps = window.naver.maps;

  const customIconUrl = '/assets/images/Map/sumbi_map.svg';

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

  // 현재 위치로 이동하는 함수
  const handleRecenterToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPosition = new NaverMaps.LatLng(latitude, longitude);

          // 지도 중심을 현재 위치로 이동
          if (naverMapInstance.current) {
            naverMapInstance.current.setCenter(currentPosition);
            naverMapInstance.current.setZoom(14); // 적절한 줌 레벨로 설정
          }

          // 기존 현재 위치 마커 제거
          if (
            markersRef.current.find(
              (marker) => marker.__isCurrentLocationMarker,
            )
          ) {
            markersRef.current = markersRef.current.filter((marker) => {
              if (marker.__isCurrentLocationMarker) {
                marker.setMap(null);
                return false;
              }
              return true;
            });
          }

          // 현재 위치를 나타내는 마커 추가
          const currentLocationMarker = new NaverMaps.Marker({
            position: currentPosition,
            map: naverMapInstance.current,
          });

          // Custom property to track this marker as the current location marker
          currentLocationMarker.__isCurrentLocationMarker = true;
          markersRef.current.push(currentLocationMarker);
        },
        (error) => {
          console.error('현재 위치를 가져올 수 없습니다:', error);
        },
        {
          enableHighAccuracy: true,
        },
      );
    } else {
      console.error('Geolocation API를 지원하지 않는 브라우저입니다.');
    }
  };

  // 제주도 전체 지도로 이동하는 함수
  // const handleRecenter = () => {
  //   if (naverMapInstance.current) {
  //     naverMapInstance.current.setCenter(initialPosition);
  //     naverMapInstance.current.setZoom(initialZoom);
  //   } else {
  //     console.error('Naver Maps API가 로드되지 않았습니다.');
  //   }
  // };

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
    <div className="relative h-layout-nav-height w-full">
      <div
        id="map"
        className="z-10 size-full min-w-full-layout max-w-full-layout"
      />
      <button
        onClick={handleRecenterToCurrentLocation}
        className="absolute bottom-4 left-4 z-20 cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
        aria-label="Re-center Map"
      >
        <MyLocationIcon className="size-6" />
      </button>
    </div>
  );
};
