import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, useDragControls } from 'framer-motion';
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
  const dragControls = useDragControls();

  const handleDragDown = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { y: number } },
  ) => {
    const threshold = 100; // 임계치 (px)
    if (info.offset.y > threshold) {
      navigate(`/haenyeo-places?placeId=${placeId}`);
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
    <>
      <div className="relative h-screen select-none bg-gray-100">
        {/* 항상 보이는 배경 이미지 레이어 */}
        <div id="place-detail-image-container">
          <motion.img
            src={selectedPlace.imageUrl}
            alt="place-image"
            className="h-[342px] w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
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
          style={{ top: 330, bottom: 0 }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          drag="y"
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragDown}
        >
          {/* 상단 정보 영역 */}
          <div className="rounded-t-2xl bg-white">
            <motion.div
              className="flex h-5 items-center justify-center"
              onPointerDown={(e) => dragControls.start(e)}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <DragHandleIcon
                className="cursor-grab stroke-gray-surface hover:stroke-gray-300"
                strokeWidth={5}
              />
            </motion.div>
            <motion.div
              className="flex flex-col gap-3 p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div>
                <p className="text-[1.25rem] font-bold">{selectedPlace.name}</p>
                <p className="text-[0.875rem]">{selectedPlace.address}</p>
              </div>
              <div id="expanded-place-button-container" className="flex gap-4">
                <motion.div
                  className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePhoneClick(selectedPlace.phoneNumber)}
                >
                  <PhoneIcon />
                  <p>전화</p>
                </motion.div>
                <motion.div
                  className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-100"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleLinkClick(selectedPlace.link)}
                >
                  <MarkLinkIcon />
                  <p>네이버지도</p>
                </motion.div>
              </div>
              <span className="text-[1.25rem] font-bold">
                {getPlacePrice(selectedPlace.minPrice, selectedPlace.maxPrice)}{' '}
                원
              </span>
            </motion.div>
          </div>

          {/* 내용 영역 */}
          <motion.div
            id="expanded-place-detail"
            className="flex flex-1 flex-col bg-gray-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <div className="px-4 py-6">
              <motion.div
                className="flex flex-col gap-4 rounded-2xl bg-white p-5"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.1 } },
                }}
              >
                <motion.h3
                  className="text-lg font-bold"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  체험 상세정보
                </motion.h3>
                <motion.div
                  className="flex flex-col gap-2"
                  variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {selectedPlace.details.map((detail, index) => (
                    <motion.div
                      className="flex flex-nowrap items-center gap-2"
                      key={detail.title + index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
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
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              id="button-container"
              className="px-5 pb-[1.563rem] pt-2.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <LargeButton onClick={handleOpenReservation}>
                예약방법
              </LargeButton>
            </motion.div>
          </motion.div>
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
