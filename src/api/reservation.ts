import { instance, secureInstance } from './instance';

export interface ReservationHaenyeoPlaces {
  placeId: string;
  name: string;
  address: string;
  price: number;
  desc: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

export interface ReservationHaenyeoPlace {
  placeId: string;
  name: string;
  address: string;
  price: number;
  desc: string;
  imageUrl: string;
  availableDate: string[];
  latitude: number;
  longitude: number;
}

export interface PostReservation {
  placeId: string;
  personName: string;
  selectedAvailableDate: string;
  selectedTime: string;
  peopleCount: string | number;
  phone: string;
}

const getReservationHaenyeoPlaces = async (): Promise<
  ReservationHaenyeoPlaces[]
> => {
  const response = await instance.get(`/places`);
  return response.data;
};

const getReservationHaenyeoPlace = async (
  placeId: string,
): Promise<ReservationHaenyeoPlace> => {
  const response = await instance.get(`/places/${placeId}`);
  return response.data;
};

const postReservation = async (data: PostReservation) => {
  const res = await secureInstance.post(`/reservations`, data);
  return res.data;
};

export {
  getReservationHaenyeoPlaces,
  getReservationHaenyeoPlace,
  postReservation,
};
