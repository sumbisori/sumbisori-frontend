import { motion } from 'framer-motion';
import { ReservationHaenyeoPlace } from '@/api/reservation';
import { LargeButton } from '../LargeButton';
import PhoneIcon from '@/icons/phone.svg?react';
import MarkLinkIcon from '@/icons/mark-link.svg?react';
import { RoundedButton } from '../RoundedButton';
interface Props {
  selectedPlace: ReservationHaenyeoPlace;
}

export function BottomSheet({ selectedPlace }: Props) {
  const handlePhoneClick = () => {
    window.open(`tel:${selectedPlace.phoneNumber}`);
  };

  const handleLinkClick = () => {
    window.open(selectedPlace.link, '_blank');
  };
  return (
    <motion.div
      {...modalAnimation}
      className="absolute bottom-0 left-0 z-100 w-full min-w-full-layout max-w-full-layout"
    >
      <div
        className={`relative flex flex-col justify-between rounded-t-xl bg-white px-5 pb-4 pt-11 shadow-lg`}
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
              <p className="text-[1.25rem] font-bold">{selectedPlace.name}</p>
              <p className="truncate text-[0.875rem]">
                {selectedPlace.address}
              </p>
            </div>
            <div className="flex w-full items-center justify-between">
              <span className="text-[1.25rem] font-bold">
                {selectedPlace.price.toLocaleString()}원
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
          <div id="button-container" className="flex w-full flex-nowrap gap-2">
            <RoundedButton buttonType="secondary" styleClass="flex-1">
              기본정보 더보기
            </RoundedButton>
            <RoundedButton buttonType="primary">예약하기</RoundedButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const modalAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};
