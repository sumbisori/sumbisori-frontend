import { https } from './instance';

export interface HaenyeoPlacesLocations {
  placeId: number;
  latitude: number;
  longitude: number;
}

export interface HaenyeoPlaceDetail {
  placeId: number;
  name: string;
  address: string;
  minPrice: number;
  maxPrice: number;
  details: HaenyeoPlaceDescription[];
  imageUrl: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  link: string;
  reservationLink: null | string;
}

interface HaenyeoPlaceDescription {
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

const getPlacesLoactions = async (): Promise<HaenyeoPlacesLocations[]> => {
  const response = await https.get(`/places/locations`);
  return response.data;
};

const getHaenyeoPlaceDetail = async (
  placeId: number,
): Promise<HaenyeoPlaceDetail> => {
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
  getPlacesLoactions,
  getHaenyeoPlaceDetail,
  postReservation,
  completeReservation,
  cancelReservation,
};
