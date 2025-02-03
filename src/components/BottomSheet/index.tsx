import { motion, PanInfo } from 'framer-motion';
import { ReservationInfo } from '../ReservationInfo/ReservationInfo';
import { ReservationHaenyeoPlace } from '@/api/reservation';
import { LargeButton } from '../LargeButton';
import { IconButton } from '../IconButton';

interface Props {
  selectedPlace: ReservationHaenyeoPlace;
}

export function BottomSheet({ selectedPlace }: Props) {
  return (
    <motion.div
      {...modalAnimation}
      drag="y"
      dragConstraints={{ top: 0, bottom: 200 }}
      className={`flex h-1/3 w-full min-w-full-layout max-w-full-layout flex-col justify-between rounded-t-lg bg-gray-050 shadow-lg`}
    >
      <div className="h-full overflow-auto px-4 pb-4 pt-6">
        <div className="flex h-full flex-col gap-3">
          <ReservationInfo
            title={selectedPlace.name}
            address={selectedPlace.address}
            price={selectedPlace.price}
            imageSrc={selectedPlace.imageUrl}
          />
          <div className="flex grow flex-col gap-2">
            <p className="text-[1rem] font-bold">체험 상세정보</p>
          </div>

          <div className="shrink-0">
            <LargeButton>예약</LargeButton>
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
