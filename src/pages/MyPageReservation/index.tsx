import { useEffect, useState } from 'react';
import {
  MyPageReservationType,
  getReservationCount,
  getReservationList,
} from '@/api/myPage';
import { SwitchReservationStatus } from '@/pages/MyPageReservation/components/SwitchReservationStatus';
import { MyPageReservationCard } from '@/pages/MyPageReservation/components/MyPageReservationCard';
import { useNavigate } from 'react-router-dom';
import { cancelReservation, completeReservation } from '@/api/haenyeoPlaces';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';
import { IMAGE_PATHS } from '@/constant';

export const MyPageReservation = () => {
  const { handleError } = useErrorHandler();

  const navigate = useNavigate();
  const [status, setStatus] = useState<'PENDING' | 'END'>('PENDING');
  const [reservations, setReservations] = useState<MyPageReservationType[]>([]);
  const [reservationCounts, setReservationCounts] = useState({
    pendingCount: 0,
    endCount: 0,
  });

  const handleComplete = async (reservationId: number) => {
    try {
      await completeReservation(reservationId);
      fetchReservations();
      fetchReservationCounts();
    } catch (error) {
      handleError(error);
    }
  };

  const handleCancel = async (reservationId: number) => {
    try {
      await cancelReservation(reservationId);
      fetchReservations();
      fetchReservationCounts();
    } catch (error) {
      handleError(error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await getReservationList(status);
      setReservations(response);
    } catch (error) {
      handleError(error);
    }
  };

  const fetchReservationCounts = async () => {
    try {
      const response = await getReservationCount();
      setReservationCounts(response);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [status]);

  useEffect(() => {
    fetchReservationCounts();
  }, []);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex w-full justify-center">
        <SwitchReservationStatus
          status={status}
          onStatusChange={setStatus}
          pendingCount={reservationCounts.pendingCount}
          endCount={reservationCounts.endCount}
        />
      </div>

      {reservations.length === 0 && (
        <div className="h-[25rem]">
          <ImageWithTextAlert
            src={`${IMAGE_PATHS.ROOT}/haenyeo_sad.png`}
            alt="해녀"
            text="예약 정보가 없습니다"
          />
        </div>
      )}
      <div className="flex flex-col overflow-auto">
        {reservations.map((reservation) => (
          <MyPageReservationCard
            key={reservation.id}
            reservationId={reservation.id}
            imageSrc={reservation.imageUrl}
            title={reservation.name}
            address={reservation.address}
            fullDate={reservation.reservationDate}
            people={reservation.peopleCount}
            status={reservation.status}
            onComplete={handleComplete}
            onCancel={handleCancel}
          />
        ))}
      </div>
      <div className="h-[0.313rem] w-full bg-gray-050"></div>
    </div>
  );
};
