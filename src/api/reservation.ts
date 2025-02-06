import { https } from './instance';

export interface ReservationHaenyeoPlaces {
  placeId: number;
  latitude: number;
  longitude: number;
}

export interface ReservationHaenyeoPlace {
  placeId: number;
  name: string;
  address: string;
  price: number;
  details: HaenyeoPlaceDetail[];
  imageUrl: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  link: string;
}

interface HaenyeoPlaceDetail {
  title: string;
  description: string;
}

export interface PostReservation {
  placeId: number;
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

const getSelectedHaenyeoPlace = async (
  placeId: number,
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
  getSelectedHaenyeoPlace as getReservationHaenyeoPlace,
  postReservation,
  completeReservation,
  cancelReservation,
};
