import { useEffect, useState } from 'react';
import {
  MyPageReservationType,
  getReservationCount,
  getReservationList,
} from '../../api/myPage';
import { SwitchReservationStatus } from '../../components/SwitchReservationStatus';
import { MyPageReservationCard } from '../../components/MyPageReservationCard';

export const MyPageReservation = () => {
  const [status, setStatus] = useState<'PENDING' | 'END'>('PENDING');
  const [reservations, setReservations] = useState<MyPageReservationType[]>([]);
  const [reservationCounts, setReservationCounts] = useState({
    pendingCount: 0,
    endCount: 0,
  });
  const fetchReservations = async () => {
    try {
      const response = await getReservationList(status);
      setReservations(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReservationCounts = async () => {
    try {
      const response = await getReservationCount();
      setReservationCounts(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [status]);

  useEffect(() => {
    fetchReservationCounts();
  }, []);

  return (
    <div>
      <div className="flex w-full justify-center">
        <SwitchReservationStatus
          status={status}
          onStatusChange={setStatus}
          pendingCount={
            status === 'PENDING'
              ? reservationCounts.pendingCount
              : reservationCounts.endCount
          }
          endCount={0}
        />
      </div>
      {reservations.length === 0 && (
        <div className="flex h-[400px] w-full flex-col items-center justify-center text-lg font-bold text-gray-900">
          <img src="/images/haenyeo.png"></img>
          예약정보가 없습니다
        </div>
      )}
      {/* {reservations.map((reservation) => (
        <MyPageReservationCard key={reservation.id} 
          imageSrc={reservation.}
        />
      ))} */}
      <div className="h-[5px] w-full bg-[#F7F7FA]"></div>

      {/* <MyPageReservationCard /> */}
    </div>
  );
};
