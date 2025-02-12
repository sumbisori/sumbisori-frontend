import { useEffect, useRef, useCallback } from 'react';
import { IMAGE_PATHS } from '@/constant';
import { ReservationHaenyeoPlaces } from '@/api/haenyeoPlaces';

interface UseNaverMapProps {
  places: ReservationHaenyeoPlaces[];
  onPinClick: (placeId: number) => void;
}

export const useNaverMap = ({ places, onPinClick }: UseNaverMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const Naver = window.naver;
  const NaverMaps = window.naver.maps;

  // 지도 기본 설정 상수들을 정의합니다.
  const initialPosition = new NaverMaps.LatLng(
    33.37310402515643,
    126.54168511624414,
  );
  const initialZoom = 9;
  const customIconUrl = `${IMAGE_PATHS.MAP}/sumbi_map.svg`;

  // 지도 초기화 함수
  const initMap = useCallback(() => {
    if (!mapContainerRef.current) return;

    const mapOptions = {
      center: initialPosition,
      zoom: initialZoom,
    };
    const map = new NaverMaps.Map(mapContainerRef.current, mapOptions);
    mapInstanceRef.current = map;
  }, [initialPosition, initialZoom, NaverMaps]);

  // 마커 추가 함수
  const addMarkers = useCallback(() => {
    if (!mapInstanceRef.current) return;

    // 기존 마커 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    places.forEach((place) => {
      const marker = new NaverMaps.Marker({
        position: new NaverMaps.LatLng(place.latitude, place.longitude),
        map: mapInstanceRef.current,
        icon: {
          url: customIconUrl,
          size: new NaverMaps.Size(40, 40),
          anchor: new NaverMaps.Point(20, 40),
          scaledSize: new NaverMaps.Size(40, 40),
        },
      });

      NaverMaps.Event.addListener(marker, 'click', () => {
        onPinClick(place.placeId);
        const position = marker.getPosition();
        mapInstanceRef.current.panTo(position);
        setTimeout(() => {
          mapInstanceRef.current.setCenter(position);
          mapInstanceRef.current.setZoom(11);
          NaverMaps.Event.trigger(mapInstanceRef.current, 'resize');
        }, 600);
      });

      markersRef.current.push(marker);
    });
  }, [places, onPinClick, customIconUrl, NaverMaps]);

  // 현재 위치로 이동하는 함수
  const handleRecenterToCurrentLocation = useCallback(() => {
    if (navigator.geolocation && mapInstanceRef.current) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPosition = new NaverMaps.LatLng(latitude, longitude);

          // 지도 중심 이동 및 확대
          mapInstanceRef.current.setCenter(currentPosition);
          mapInstanceRef.current.setZoom(16);

          // 기존 현재 위치 마커 제거
          markersRef.current = markersRef.current.filter((marker) => {
            if (marker.__isCurrentLocationMarker) {
              marker.setMap(null);
              return false;
            }
            return true;
          });

          // 현재 위치 마커 추가
          const currentLocationMarker = new NaverMaps.Marker({
            position: currentPosition,
            map: mapInstanceRef.current,
          });
          currentLocationMarker.__isCurrentLocationMarker = true;
          markersRef.current.push(currentLocationMarker);
        },
        (error) => {
          console.error('현재 위치를 가져올 수 없습니다:', error);
        },
        { enableHighAccuracy: true },
      );
    } else {
      console.error('Geolocation API를 지원하지 않는 브라우저입니다.');
    }
  }, [NaverMaps]);

  // 초기 위치(제주 전체)로 이동하는 함수
  const handleRecenter = useCallback(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(initialPosition);
      mapInstanceRef.current.setZoom(initialZoom);
      NaverMaps.Event.trigger(mapInstanceRef.current, 'resize');
    } else {
      console.error('Naver Maps API가 로드되지 않았습니다.');
    }
  }, [initialPosition, initialZoom, NaverMaps]);

  // 지도 초기화 및 정리
  useEffect(() => {
    if (!Naver || !NaverMaps) {
      console.error('Naver Maps API가 로드되지 않았습니다.');
      return;
    }
    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
      }
    };
  }, [initMap, Naver, NaverMaps]);

  // 장소(마커) 업데이트
  useEffect(() => {
    if (mapInstanceRef.current) {
      addMarkers();
    }
  }, [places, addMarkers]);

  return {
    mapContainerRef,
    handleRecenterToCurrentLocation,
    handleRecenter,
  };
};
