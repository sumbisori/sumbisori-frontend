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
  details: HaenyeoPlaceDetailInfo;
  imageUrl: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  link: string;
  reservationLink: null;
}

export interface HaenyeoPlaceDetailInfo {
  operationInfo: HaenyeoPlaceOperationInfoType[];
  facilities: HaenyeoPlaceFacilityType[];
  inquiries: HaenyeoPlaceInquiryType[];
}

export interface HaenyeoPlaceFacilityType {
  title: string;
  iconUrl: string;
}

export interface HaenyeoPlaceOperationInfoType {
  title: string;
  content: string | null;
  iconUrl: string;
  description: string | null;
}

export interface HaenyeoPlaceInquiryType {
  title: string;
  content: string;
  iconUrl: string;
}

export interface PostReservation {
  placeId: number;
  personName: string;
  selectedAvailableDate: string;
  selectedTime: string;
  peopleCount: string | number;
  phone: string;
}

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
  getPlacesLocations as getPlacesLoactions,
  getHaenyeoPlaceDetail,
  postReservation,
  completeReservation,
  cancelReservation,
};
