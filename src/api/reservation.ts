import { instance } from './instance';

interface ReservationHaenyeoPlace {
  value: string;
  name: string;
  address: string;
  price: number;
  desc: string;
  imageUrl: string;
  availableDate: string[];
  x: number;
  y: number;
}

const getReservationHaenyeoPlace = async (): Promise<
  ReservationHaenyeoPlace[]
> => {
  return await instance.get(`/reservation/haenyeo-place`);
};

export { getReservationHaenyeoPlace };
