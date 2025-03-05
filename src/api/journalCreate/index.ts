import { https } from '../instance';

export const getJournalCreatePlace = async () => {
  const response = await https.get('/places');
  return response.data;
};

export const getJournalCreateImageUrl = async (image: File) => {
  const randomIndex = Math.floor(Math.random() * 5);
  return {
    imageUrl: `https://placehold.co/600x400`,
  };
};
