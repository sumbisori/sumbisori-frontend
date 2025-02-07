import { motion } from 'framer-motion';
import { ReservationHaenyeoPlace } from '@/api/reservation';
import PhoneIcon from '@/icons/phone.svg?react';
import MarkLinkIcon from '@/icons/mark-link.svg?react';
import { RoundedButton } from '../RoundedButton';
import { LargeButton } from '../LargeButton';
import { useRef } from 'react';
import { ShowModalType } from '@/pages/Reservation';
import { getPlacePrice } from '@/util/getPlacePrice';

interface Props {
  selectedPlace: ReservationHaenyeoPlace;
  showModal: ShowModalType;
  onMoreInfo: () => void;
}

export function HaenyeoPlaceDetailSheet({
  selectedPlace,
  showModal,
  onMoreInfo,
}: Props) {
  const handlePhoneClick = () => {
    window.open(`tel:${selectedPlace.phoneNumber}`);
  };

  const handleLinkClick = () => {
    window.open(selectedPlace.link, '_blank');
  };

  const mainContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={
        showModal === 'small'
          ? // 기본 모드: 하단에 고정
            'absolute bottom-0 left-0 z-100 w-full min-w-full-layout max-w-full-layout'
          : // 확장 모드: 지도 위 전체를 덮도록
            'absolute inset-0 z-100 bg-white'
      }
    >
      <>
        {showModal === 'small' && (
          // 기본 모드 레이아웃
          <motion.div
            {...unExpandedAnimation}
            ref={mainContainerRef}
            className="relative flex flex-col justify-between rounded-t-xl bg-white px-5 pb-4 pt-11 shadow-lg"
          >
            <div className="absolute -top-14 left-4 rounded-2xl border border-[#F6F6F6] bg-white p-1">
              <img
                src={selectedPlace.imageUrl}
                alt="place-image"
                className="size-[4.813rem] rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-[1.25rem] font-bold">
                    {selectedPlace.name}
                  </p>
                  <p className="truncate text-[0.875rem]">
                    {selectedPlace.address}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-[1.25rem] font-bold">
                    {getPlacePrice(
                      selectedPlace.minPrice,
                      selectedPlace.maxPrice,
                    )}
                    원
                  </span>
                  <div className="flex gap-4">
                    <PhoneIcon
                      className="cursor-pointer"
                      onClick={handlePhoneClick}
                    />
                    <MarkLinkIcon
                      className="cursor-pointer"
                      onClick={handleLinkClick}
                    />
                  </div>
                </div>
              </div>
              <div
                id="button-container"
                className="flex w-full flex-nowrap gap-2"
              >
                <RoundedButton
                  buttonType="secondary"
                  styleClass="flex-1"
                  onClick={onMoreInfo}
                >
                  기본정보 더보기
                </RoundedButton>
                <RoundedButton buttonType="primary" onClick={handleLinkClick}>
                  예약하기
                </RoundedButton>
              </div>
            </div>
          </motion.div>
        )}
        {showModal === 'full' && (
          // 확장 모드 레이아웃

          <motion.div {...expandedAnimation} className="flex flex-col">
            {/* 상단 이미지 300px 높이 */}
            <img
              src={selectedPlace.imageUrl}
              alt="place-image"
              className="h-[300px] w-full object-cover"
            />
            <div className="px-5 pb-4 pt-6">
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-[1.25rem] font-bold">
                    {selectedPlace.name}
                  </p>
                  <p className="truncate text-[0.875rem]">
                    {selectedPlace.address}
                  </p>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span className="text-[1.25rem] font-bold">
                    {getPlacePrice(
                      selectedPlace.minPrice,
                      selectedPlace.maxPrice,
                    )}
                    원
                  </span>
                  <div className="flex gap-4">
                    <PhoneIcon
                      className="cursor-pointer"
                      onClick={handlePhoneClick}
                    />
                    <MarkLinkIcon
                      className="cursor-pointer"
                      onClick={handleLinkClick}
                    />
                  </div>
                </div>
              </div>
              <div
                id="button-container"
                className="mt-4 flex w-full flex-nowrap gap-2"
              >
                <LargeButton>예약하기</LargeButton>
              </div>
            </div>
          </motion.div>
        )}
      </>
    </div>
  );
}

const unExpandedAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

const expandedAnimation = {
  initial: { y: '100%', opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: '100%', opacity: 0 },
  transition: { duration: 0.3 },
};
