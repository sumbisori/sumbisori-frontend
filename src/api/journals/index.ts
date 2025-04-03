import { https } from '../instance';
import { JournalsRequest, JournalsResponse, Pagination } from './types';

export const getJournals = async ({
  page,
  size,
  sort,
}: JournalsRequest): Promise<Pagination<JournalsResponse[]>> => {
  const response = await https.get('/experiences', {
    params: { page, size, sort },
  });

  return response.data;
};
