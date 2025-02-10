import {
  ReservationHaenyeoPlace,
  ReservationHaenyeoPlaces,
} from '@/api/haenyeoPlaces';
import { useEffect, useRef } from 'react';
import MyLocationIcon from '@/icons/my-location.svg?react';
import ResetFocus from '@/icons/reset-focus.svg?react';
import { IconButton } from '@/components/IconButton';
import { motion } from 'framer-motion';
import LeftIcon from '@/icons/left.svg?react';

interface NaverMapProps {
  selectedPlace?: ReservationHaenyeoPlace | null;
  places: ReservationHaenyeoPlaces[];
  onPinClick: (placeId: number) => void;
  onBack: () => void;
  onClose: () => void;
}

export const NaverMap = ({
  selectedPlace,
  places,
  onPinClick,
  onBack,
  onClose,
}: NaverMapProps) => {
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
        // // 중심으로 이동 후 zoom하기
        // const position = marker.getPosition();
        // naverMapInstance.current.panTo(position);

        // setTimeout(() => {
        //   // naverMapInstance.current.setCenter(position);
        //   naverMapInstance.current.setZoom(11);
        //   naverMapInstance.current.autoResize();
        // }, 600);
      });

      markersRef.current.push(marker);
    });
  };

  const handleRecenterToCurrentLocation = () => {
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
  const handleRecenter = () => {
    if (naverMapInstance.current) {
      naverMapInstance.current.setCenter(initialPosition);
      naverMapInstance.current.setZoom(initialZoom);
      naverMapInstance.current.autoResize();
    } else {
      console.error('Naver Maps API가 로드되지 않았습니다.');
    }
  };

  // 지도 초기화 및 정리
  const handleSheetBack = () => {
    onBack();
    setTimeout(() => {
      if (selectedPlace) {
        naverMapInstance.current.setCenter(initialPosition);
        naverMapInstance.current.setZoom(initialZoom);
      }
      naverMapInstance.current.autoResize();
    }, 50);
  };

  const handleSheetClose = () => {
    onClose();
    setTimeout(() => {
      naverMapInstance.current.setCenter(initialPosition);
      naverMapInstance.current.setZoom(initialZoom);
      naverMapInstance.current.autoResize();
    }, 50);
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

  useEffect(() => {
    if (selectedPlace) {
      const position = new NaverMaps.LatLng(
        selectedPlace.latitude,
        selectedPlace.longitude,
      );
      naverMapInstance.current.panTo(position);
      setTimeout(() => {
        // naverMapInstance.current.setCenter(position);
        naverMapInstance.current.setZoom(11);
        naverMapInstance.current.autoResize();
      }, 600);
    }
  }, [selectedPlace]);

  const bottomOffset = selectedPlace ? 18 : 1;

  return (
    <motion.div className={`relative size-full flex-1`}>
      <div id="map" className="size-full" />
      <div
        id="map-controls"
        style={{ bottom: `${bottomOffset}rem` }}
        className="absolute z-20 flex w-full items-center gap-2 px-4"
      >
        <IconButton onClick={handleRecenterToCurrentLocation}>
          <MyLocationIcon className="size-6" />
        </IconButton>
        <IconButton onClick={handleRecenter}>
          <ResetFocus className="size-6" />
        </IconButton>
      </div>

      {selectedPlace && (
        <div
          id="map-controls2"
          className="absolute left-0 top-[3.75rem] z-200 flex w-full items-center justify-between gap-2 px-4"
        >
          <IconButton onClick={handleSheetBack} className="size-6">
            <LeftIcon />
          </IconButton>
          {/* {showModal === 'full' && (
            <IconButton onClick={handleSheetClose}>
              <MdCloseIcon className="size-6" />
            </IconButton>
          )} */}
        </div>
      )}
    </motion.div>
  );
};
