import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getHaenyeoPlaceDetail } from '@/api/haenyeoPlaces';
import { LargeButton } from '@/components/LargeButton';
import { queryKeys } from '@/query';
import PhoneIcon from '@/icons/phone.svg?react';
import MarkLinkIcon from '@/icons/mark-link.svg?react';
import { getPlacePrice } from '@/util/getPlacePrice';
import { IconButton } from '@/components/IconButton';
import LeftIcon from '@/icons/left.svg?react';
import MdCloseIcon from '@/icons/line-md_close.svg?react';
import { Spinner } from '@/components/Spinner';
import { useModalController } from '@/contexts/src/ModalContext';
import { HaenyeoPlaceReservationMethodModal } from '@/pages/HaenyeoPlacesDetail/components/HaenyeoPlaceReservationMethodModal';
import { HaenyeoPlaceOperationInfo } from './components/HaenyeoPlaceOperationInfo';
import { HaenyeoPlaceFacilities } from './components/HaenyeoPlaceFacilities';
import { HaenyeoPlaceInquiries } from './components/HaenyeoPlaceInquiries';
import { routes } from '@/routes/src/routes';
import { TopDetailPageHeader } from '@/layouts/TopDetailPageHeader';
import { HaenyeoPlaceDetail } from '@/api/haenyeoPlaces/types';

export const HaenyeoPlacesDetail = () => {
  const { openModal, closeModal } = useModalController();
  const navigate = useNavigate();
  const { placeId } = useParams();

  const {
    data: selectedPlace,
    isPending,
    isError,
  } = useQuery<HaenyeoPlaceDetail | null>({
    queryKey: [queryKeys.haenyeoPlaceDetail, placeId],
    queryFn: () => {
      if (!placeId) return Promise.resolve(null);
      return getHaenyeoPlaceDetail(parseInt(placeId, 10));
    },
    enabled: !!placeId,
  });

  const handlePhoneClick = (phoneNumber: string) => {
    closeModal('reservation-method');
    setTimeout(() => {
      if (window.confirm(`${phoneNumber}로 전화를 거시겠습니까?`)) {
        window.open(`tel:${phoneNumber}`);
      }
    }, 100);
  };

  const handleLinkClick = (link: string | null) => {
    if (!link) return;
    closeModal('reservation-method');
    setTimeout(() => {
      if (window.confirm('네이버 지도를 열겠습니까?')) {
        window.open(link, '_blank');
      }
    }, 100);
  };

  const handleOpenReservation = () => {
    openModal('reservation-method');
  };

  if (isPending) {
    return (
      <div className="relative flex h-screen items-center justify-center">
        <div
          id="map-controls2"
          className="absolute left-0 top-header-height z-10 flex w-full items-center justify-between gap-2 px-4"
        >
          <IconButton
            onClick={() =>
              navigate(routes.haenyeoPlaces + `?placeId=${placeId}`)
            }
          >
            <LeftIcon className="size-6" />
          </IconButton>
          <IconButton onClick={() => navigate(routes.haenyeoPlaces)}>
            <MdCloseIcon className="size-6" />
          </IconButton>
        </div>
        <Spinner />
      </div>
    );
  }

  if (isError || !selectedPlace) {
    return <Navigate to={routes['not-found']} replace />;
  }

  return (
    <div className="flex min-h-layout-nav-height flex-col">
      {/* 배경 이미지 */}
      <div id="place-detail-image-container" className="relative w-full">
        <img
          src={selectedPlace.imageUrl}
          alt="place-image"
          className="h-[342px] w-full object-cover"
        />
      </div>

      {/* 상단 버튼 */}
      <TopDetailPageHeader
        onBackClick={() =>
          navigate(routes.haenyeoPlaces + `?placeId=${placeId}`)
        }
        onCloseClick={() => navigate(routes.haenyeoPlaces)}
      />

      {/* 메인 컨텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        {/* 체험 상세정보 헤더 */}
        <div className="bg-white p-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-xl font-bold">{selectedPlace.name}</p>
            <p className="text-sm">{selectedPlace.address}</p>
          </motion.div>
          <div id="expanded-place-button-container" className="my-3 flex gap-4">
            <button
              className="flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 hover:bg-gray-100 active:bg-gray-100"
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

        {/* 체험 상세정보 */}
        <div className="bg-gray-200 px-4 pb-custom-72px-spacer pt-6">
          <motion.div
            className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6"
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

            <HaenyeoPlaceOperationInfo
              operationInfo={selectedPlace.details.operationInfo}
            />
            <HaenyeoPlaceFacilities
              facilities={selectedPlace.details.facilities}
            />
            <HaenyeoPlaceInquiries
              inquiries={selectedPlace.details.inquiries}
            />
          </motion.div>
        </div>

        {/* 예약방법 버튼 */}
        <div className="fixed inset-x-0 bottom-nav-height z-10 m-auto flex w-full min-w-full-layout max-w-full-layout px-5 pb-5 pt-3">
          <LargeButton onClick={handleOpenReservation}>예약방법</LargeButton>
        </div>
      </div>

      {/* 예약방법 모달 */}
      <HaenyeoPlaceReservationMethodModal
        selectedPlace={selectedPlace}
        onPhoneClick={handlePhoneClick}
        onLinkClick={handleLinkClick}
      />
    </div>
  );
};
