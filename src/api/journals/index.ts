import { JournalsResponse } from './types';

export const getJournals = async (): Promise<JournalsResponse[]> => {
  return [
    {
      id: 1,
      imageUrl: 'https://placehold.co/600x400',
      title: '체험 일지 제목',
      date: '2025-03-15',
      companionType: 'FRIEND',
      weather: 'CLEAR_SKY',
    },
    {
      id: 2,
      imageUrl: 'https://placehold.co/600x400',
      title: '체험 일지 제목',
      date: '2025-03-15',
      companionType: 'ALONE',
      weather: 'BROKEN_CLOUDS',
    },
    {
      id: 3,
      imageUrl: '',
      title: '체험 일지 제목',
      date: '2025-03-15',
      companionType: 'COLLEAGUE',
      weather: 'RAIN',
    },
  ];
};
