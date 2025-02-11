import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ReservationHaenyeoPlace,
  getReservationHaenyeoPlace,
} from '@/api/haenyeoPlaces';
import { LargeButton } from '@/components/LargeButton';
import { queryKeys } from '@/query';
import PhoneIcon from '@/icons/phone.svg?react';
import MarkLinkIcon from '@/icons/mark-link.svg?react';
import { getPlacePrice } from '@/util/getPlacePrice';
import { SquareGrayCard } from '@/components/SquareGrayCard';
import { IconButton } from '@/components/IconButton';
import LeftIcon from '@/icons/left.svg?react';
import MdCloseIcon from '@/icons/line-md_close.svg?react';
import DragHandleIcon from '@/icons/drag-handle.svg?react';
import { Spinner } from '@/components/Spinner';
import { useModalController } from '@/contexts/src/ModalContext';
import { HaenyeoPlaceReservationMethodModal } from '@/components/HaenyeoPlaceReservationMethodModal';

export const HaenyeoPlacesDetail = () => {
  const { openModal } = useModalController();
  const navigate = useNavigate();
  const { placeId } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number } },
  ) => {
    const threshold = 100; // 임계치 (px)
    if (info.offset.y < -threshold) {
      setIsExpanded(true);
    } else if (info.offset.y > threshold) {
      if (!isExpanded) {
        navigate(`/haenyeo-places?placeId=${placeId}`);
      } else {
        setIsExpanded(false);
      }
    }
  };

  const {
    data: selectedPlace,
    isLoading,
    isError,
  } = useQuery<ReservationHaenyeoPlace | null>({
    queryKey: [queryKeys.selectedHaenyeoPlace, placeId],
    queryFn: () => {
      if (!placeId) return Promise.resolve(null);
      return getReservationHaenyeoPlace(parseInt(placeId, 10));
    },
    enabled: !!placeId,
  });

  const handlePhoneClick = (phoneNumber: string) => {
    window.open(`tel:${phoneNumber}`);
  };

  const handleLinkClick = (link: string | null) => {
    if (!link) return;
    window.open(link, '_blank');
  };

  const handleOpenReservation = () => {
    openModal('reservation-method');
  };

  const splitTextByTwo = (text: string) => {
    const matchedText = text.match(/.{1,2}/g);
    return matchedText ? matchedText.join('\n') : '';
  };

  if (isLoading) {
    return (
      <div className="relative flex h-screen items-center justify-center">
        <div
          id="map-controls2"
          className="absolute left-0 top-[3.75rem] z-200 flex w-full items-center justify-between gap-2 px-4"
        >
          <IconButton
            onClick={() => navigate(`/haenyeo-places?placeId=${placeId}`)}
            className="size-6"
          >
            <LeftIcon />
          </IconButton>
          <IconButton onClick={() => navigate('/haenyeo-places')}>
            <MdCloseIcon className="size-6" />
          </IconButton>
        </div>
        <Spinner />
      </div>
    );
  }

  if (isError || !selectedPlace) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    // 부모 컨테이너는 상대 위치
    <>
      <div className="relative h-screen select-none bg-gray-100">
        {/* 항상 보이는 배경 이미지 레이어 */}
        <div
          id="place-detail-image-container"
          className="relative h-[342px] w-full"
        >
          <img
            src={selectedPlace.imageUrl}
            alt="place-image"
            className="h-[342px] w-full object-cover"
          />
          <div
            id="map-controls2"
            className="absolute left-0 top-[3.75rem] z-10 flex w-full items-center justify-between gap-2 px-4"
          >
            <IconButton
              onClick={() => navigate(`/haenyeo-places?placeId=${placeId}`)}
              className="size-6"
            >
              <LeftIcon />
            </IconButton>
            <IconButton onClick={() => navigate('/haenyeo-places')}>
              <MdCloseIcon className="size-6" />
            </IconButton>
          </div>
        </div>

        {/* 상세 컨테이너 */}
        <motion.div
          id="place-detail-container"
          className="absolute inset-x-0 z-20 rounded-t-2xl"
          style={{ top: '330px', bottom: 0 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          animate={isExpanded ? 'expanded' : 'collapsed'}
          variants={{
            collapsed: { y: 0 },
            expanded: { y: -280 },
          }}
          transition={{ duration: 0.5 }}
        >
          {/* 상단 정보 영역 */}
          <div className={`rounded-t-2xl bg-white ${isExpanded ? '' : ''}`}>
            <div className="flex h-5 items-center justify-center">
              <DragHandleIcon
                className="cursor-pointer stroke-gray-surface hover:stroke-gray-300"
                strokeWidth={5}
              />
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div>
                <p className="text-[1.25rem] font-bold">{selectedPlace.name}</p>
                <p className="text-[0.875rem]">{selectedPlace.address}</p>
              </div>
              <div id="expanded-place-button-container" className="flex gap-4">
                <div
                  className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-100"
                  onClick={() => handlePhoneClick(selectedPlace.phoneNumber)}
                >
                  <PhoneIcon />
                  <p>전화</p>
                </div>
                <div
                  className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-100"
                  onClick={() => handleLinkClick(selectedPlace.link)}
                >
                  <MarkLinkIcon />
                  <p>네이버지도</p>
                </div>
              </div>
              <span className="text-[1.25rem] font-bold">
                {getPlacePrice(selectedPlace.minPrice, selectedPlace.maxPrice)}
                원
              </span>
            </div>
          </div>

          {/* 내용 영역 */}
          <div
            id="expanded-place-detail"
            className="flex flex-1 flex-col overflow-auto bg-gray-100"
          >
            <div className="px-4 py-6">
              <div className="flex flex-col gap-4 rounded-2xl bg-white p-5">
                <h3 className="text-lg font-bold">체험 상세정보</h3>
                <div className="flex flex-col gap-2">
                  {selectedPlace.details.map((detail, index) => (
                    <div
                      className="flex flex-nowrap items-center gap-2"
                      key={detail.title + index}
                    >
                      <SquareGrayCard
                        type="content"
                        className="whitespace-pre-wrap"
                        size="59px"
                      >
                        <span className="text-[0.875rem] font-medium">
                          {splitTextByTwo(detail.title)}
                        </span>
                      </SquareGrayCard>
                      <p className="flex-1 text-[0.875rem] text-gray-700">
                        {detail.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div id="button-container" className="px-5 pb-[1.563rem] pt-2.5">
              <LargeButton onClick={handleOpenReservation}>
                예약방법
              </LargeButton>
            </div>
          </div>
        </motion.div>
      </div>
      <HaenyeoPlaceReservationMethodModal
        selectedPlace={selectedPlace}
        onPhoneClick={handlePhoneClick}
        onLinkClick={handleLinkClick}
      />
    </>
  );
};
