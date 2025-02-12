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
import { Spinner } from '@/components/Spinner';
import { useModalController } from '@/contexts/src/ModalContext';
import { HaenyeoPlaceReservationMethodModal } from '@/pages/HaenyeoPlacesDetail/components/HaenyeoPlaceReservationMethodModal';
import { BottomSheet } from '@/components/BottomSheet';

export const HaenyeoPlacesDetail = () => {
  const { openModal } = useModalController();
  const navigate = useNavigate();
  const { placeId } = useParams();
  const [bottomSheetOpen] = useState(true);

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
        <Spinner />
      </div>
    );
  }

  if (isError || !selectedPlace) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="relative">
      <style>{`
        :root {
          --rsbs-bg: #f0f0f5;
        }
      `}</style>
      {/* 항상 보이는 배경 이미지 레이어 */}
      <div
        id="place-detail-image-container"
        className="fixed inset-x-0 top-0 m-auto min-w-full-layout max-w-full-layout select-none"
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
      <BottomSheet
        open={bottomSheetOpen}
        blocking={false}
        customSnapPoints={['top', 'middle']}
        onDismiss={() => navigate(`/haenyeo-places?placeId=${placeId}`)}
        expandOnContentDrag={true}
        skipInitialTransition={true}
        header={
          <div className="bg-white p-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-xl font-bold">{selectedPlace.name}</p>
              <p className="text-sm">{selectedPlace.address}</p>
            </motion.div>
            <div
              id="expanded-place-button-container"
              className="my-3 flex gap-4"
            >
              <button
                className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-100"
                onClick={() => handlePhoneClick(selectedPlace.phoneNumber)}
              >
                <PhoneIcon />
                <p>전화</p>
              </button>
              <button
                className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-100"
                onClick={() => handleLinkClick(selectedPlace.link)}
              >
                <MarkLinkIcon />
                <p>네이버지도</p>
              </button>
            </div>
            <span className="text-xl font-bold">
              {getPlacePrice(selectedPlace.minPrice, selectedPlace.maxPrice)} 원
            </span>
          </div>
        }
        footer={
          <div className="bg-gray-100 p-4">
            <LargeButton onClick={handleOpenReservation}>예약방법</LargeButton>
          </div>
        }
      >
        <div className="flex flex-1 px-4 py-6">
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
                    <span className="text-sm font-medium">
                      {splitTextByTwo(detail.title)}
                    </span>
                  </SquareGrayCard>
                  <p className="flex-1 text-sm text-gray-700">
                    {detail.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </BottomSheet>
      {/* 예약방법 모달 */}
      <HaenyeoPlaceReservationMethodModal
        selectedPlace={selectedPlace}
        onPhoneClick={handlePhoneClick}
        onLinkClick={handleLinkClick}
      />
    </div>
  );
};
