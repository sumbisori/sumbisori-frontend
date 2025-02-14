import {
  HaenyeoPlaceDetail,
  HaenyeoPlacesLocations,
} from '@/api/haenyeoPlaces';
import { useEffect, useRef } from 'react';
import MyLocationIcon from '@/icons/my-location.svg?react';
import ResetFocus from '@/icons/reset-focus.svg?react';
import { IconButton } from '@/components/IconButton';
import { motion } from 'framer-motion';
import LeftIcon from '@/icons/left.svg?react';
import { IMAGE_PATHS } from '@/constant';

interface NaverMapProps {
  selectedPlace?: HaenyeoPlaceDetail | null;
  places: HaenyeoPlacesLocations[];
  onPinClick: (placeId: number) => void;
  onBack: () => void;
}

export const NaverMap = ({
  selectedPlace,
  places,
  onPinClick,
  onBack,
}: NaverMapProps) => {
  const naverMapInstance = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);

  const NaverMaps = window.naver.maps;

  const customIconUrl = `${IMAGE_PATHS.MAP}/sumbi_map.svg`;

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

      NaverMaps.Event.addListener(marker, 'click', (e: any) => {
        onPinClick(place.placeId);
      });

      markersRef.current.push(marker);
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentPosition = new NaverMaps.LatLng(latitude, longitude);

          // 지도 중심을 현재 위치로 이동
          if (naverMapInstance.current) {
            naverMapInstance.current.setCenter(currentPosition);
            naverMapInstance.current.setZoom(16);
          }

          // 현재 위치를 나타내는 마커 추가
          const currentLocationMarker = new NaverMaps.Marker({
            position: currentPosition,
            map: naverMapInstance.current,
          });

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
    }
  };

  const moveToSelectedPlace = () => {
    if (naverMapInstance.current && selectedPlace) {
      const position = new NaverMaps.LatLng(
        selectedPlace.latitude,
        selectedPlace.longitude,
      );
      naverMapInstance.current.panTo(position);
      setTimeout(() => {
        if (naverMapInstance.current) {
          naverMapInstance.current.setZoom(11);
          naverMapInstance.current.autoResize();
        }
      }, 600);
    }
  };

  // 제주도 전체 지도로 이동하는 함수
  const handleRecenter = () => {
    if (naverMapInstance.current) {
      naverMapInstance.current.setCenter(initialPosition);
      naverMapInstance.current.setZoom(initialZoom);
      naverMapInstance.current.autoResize();
    }
  };

  // 지도 초기화 및 정리
  const handleSheetBack = () => {
    onBack();
    setTimeout(() => {
      if (selectedPlace) {
        handleRecenter();
      }
    }, 50);
  };

  useEffect(() => {
    initMap();
    return () => {
      if (naverMapInstance.current) {
        naverMapInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    addMarkers();
  }, [places]);

  useEffect(() => {
    moveToSelectedPlace();
  }, [selectedPlace]);

  const bottomOffset = selectedPlace ? 18 : 1;

  return (
    <motion.div className={`relative size-full flex-1`}>
      <div id="map" className="size-full" />
      <div
        id="map-controls"
        style={{ bottom: `${bottomOffset}rem` }}
        className="absolute z-10 flex w-full items-center gap-2 px-4"
      >
        <IconButton onClick={getCurrentLocation}>
          <MyLocationIcon className="size-6" />
        </IconButton>
        <IconButton onClick={handleRecenter}>
          <ResetFocus className="size-6" />
        </IconButton>
      </div>

      {selectedPlace && (
        <div
          id="map-controls2"
          className="absolute left-0 top-header-height z-10 flex w-full items-center justify-between gap-2 px-4"
        >
          <IconButton onClick={handleSheetBack} className="size-6">
            <LeftIcon />
          </IconButton>
        </div>
      )}
    </motion.div>
  );
};
