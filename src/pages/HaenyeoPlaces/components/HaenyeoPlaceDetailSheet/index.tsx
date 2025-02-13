import { motion } from 'framer-motion';
import { HaenyeoPlaceDetail } from '@/api/haenyeoPlaces';
import PhoneIcon from '@/icons/phone.svg?react';
import MarkLinkIcon from '@/icons/mark-link.svg?react';
import { RoundedButton } from '@/components/RoundedButton';
import { useRef } from 'react';
import { getPlacePrice } from '@/util/getPlacePrice';
import { useModalController } from '@/contexts/src/ModalContext';
import { HaenyeoPlaceReservationMethodModal } from '../../../HaenyeoPlacesDetail/components/HaenyeoPlaceReservationMethodModal';
import DownArrowIcon from '@/icons/down-arrow.svg?react';

interface Props {
  selectedPlace: HaenyeoPlaceDetail;
  onMoreInfo: () => void;
}

export function HaenyeoPlaceDetailSheet({ selectedPlace, onMoreInfo }: Props) {
  const { openModal } = useModalController();

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

  const mainContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="absolute bottom-0 left-0 z-100 w-full min-w-full-layout max-w-full-layout">
        <motion.div
          {...animation}
          ref={mainContainerRef}
          className="relative flex flex-col justify-between rounded-t-xl bg-white px-5 pb-4 pt-11 shadow-lg"
        >
          <img
            src={selectedPlace.imageUrl}
            alt="place-image"
            className="absolute -top-14 left-4 size-[4.813rem] rounded-[1.25rem] border-[5px] border-white object-cover shadow-sm"
          />

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-xl font-bold">{selectedPlace.name}</p>
                <p className="truncate text-sm">{selectedPlace.address}</p>
              </div>
              <div className="flex w-full items-center justify-between">
                <span className="text-xl font-bold">
                  {getPlacePrice(
                    selectedPlace.minPrice,
                    selectedPlace.maxPrice,
                  )}
                  원
                </span>
                <div className="flex gap-4">
                  <PhoneIcon
                    className="cursor-pointer"
                    onClick={() => handlePhoneClick(selectedPlace.phoneNumber)}
                  />
                  <MarkLinkIcon
                    className="cursor-pointer"
                    onClick={() => handleLinkClick(selectedPlace.link)}
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
                styleClass="flex-1 flex justify-center items-center gap-1"
                onClick={onMoreInfo}
              >
                기본정보 더보기
                <DownArrowIcon className="stroke-black" />
              </RoundedButton>
              <RoundedButton
                buttonType="primary"
                onClick={handleOpenReservation}
              >
                예약방법
              </RoundedButton>
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
}

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};
