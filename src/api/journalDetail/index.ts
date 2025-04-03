import { https } from '../instance';
import { JournalDetailType, JournalDetailCollectionsType } from './types';

export const getJournalDetail = async (
  journalId: string,
): Promise<JournalDetailType> => {
  const response = await https.get(`/experiences/${journalId}`);
  return response.data;
};

export const getJournalDetailCollections = async (
  experienceId: number,
): Promise<JournalDetailCollectionsType> => {
  const response = await https.get(`/experiences/${experienceId}/collections`);
  return response.data;
};
