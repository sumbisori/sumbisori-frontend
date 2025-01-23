import { https } from './instance';

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
  const response = await https.get(`/places`);
  return response.data;
};

const getReservationHaenyeoPlace = async (
  placeId: string,
): Promise<ReservationHaenyeoPlace> => {
  const response = await https.get(`/places/${placeId}`);
  return response.data;
};

const postReservation = async (data: PostReservation) => {
  const res = await https.post(`/reservations`, data);
  return res.data;
};

const completeReservation = async (reservationId: number) => {
  const res = await https.post(`/reservations/${reservationId}/complete`);
  return res.data;
};

const cancelReservation = async (reservationId: number) => {
  const res = await https.delete(`/reservations/${reservationId}`);
  return res.data;
};

export {
  getReservationHaenyeoPlaces,
  getReservationHaenyeoPlace,
  postReservation,
  completeReservation,
  cancelReservation,
};
