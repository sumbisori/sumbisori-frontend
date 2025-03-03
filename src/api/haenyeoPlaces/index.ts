import { https } from '../instance';
import {
  HaenyeoPlaceDetail,
  HaenyeoPlacesLocations,
  PostReservation,
} from './types';

const getPlacesLocations = async (): Promise<HaenyeoPlacesLocations[]> => {
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
  getPlacesLocations,
  getHaenyeoPlaceDetail,
  postReservation,
  completeReservation,
  cancelReservation,
};
