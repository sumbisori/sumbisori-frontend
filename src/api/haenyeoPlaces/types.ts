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
