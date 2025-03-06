import { https } from '../instance';

export const getJournalCreatePlace = async () => {
  const response = await https.get('/places');
  return response.data;
};
