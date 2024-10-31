import { instance, secureInstance } from './instance';

export interface ReservationHaenyeoPlace {
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

export interface PostReservation {
  place: string;
  personName: string;
  selectedAvailableDate: string;
  selectedTime: string;
  peopleCount: number;
  phone: string;
}

const getReservationHaenyeoPlaces = async (): Promise<
  ReservationHaenyeoPlace[]
> => {
  const response = await instance.get(`/reservation/haenyeo-place`);
  return response.data;
};

const getReservationHaenyeoPlace = async (
  value: string,
): Promise<ReservationHaenyeoPlace> => {
  const response = await instance.get(`/reservation/haenyeo-place/${value}`);
  return response.data;
};

const postReservation = async (data: PostReservation) => {
  const res = await secureInstance.post(`/reservation`, data);
  return res.data;
};

export {
  getReservationHaenyeoPlaces,
  getReservationHaenyeoPlace,
  postReservation,
};
