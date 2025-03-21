import { https } from '../instance';
import { HaenyeoPlaceDetail, HaenyeoPlacesLocations } from './types';

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

export { getPlacesLocations, getHaenyeoPlaceDetail };
