import { https } from '../instance';
import { JournalDetail } from './types';

export const getJournalDetail = async (
  journalId: string,
): Promise<JournalDetail> => {
  const response = await https.get(`/experiences/${journalId}`);
  return response.data;
};
