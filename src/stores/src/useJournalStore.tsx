import { create } from 'zustand';
import dayjs from 'dayjs';
import { JournalForm } from '@/api/journalCreate/types';

interface JournalStore {
  journalForm: JournalForm;
  updateJournal: (updates: Partial<JournalForm>) => void;
  resetJournal: () => void;
}

const initialJournalForm: JournalForm = {
  date: dayjs(),
  place: null,
  weather: null,
  companion: null,
  experience: '',
  photos: [],
  satisfaction: null,
  collectedSeafoods: [],
};

export const useJournalStore = create<JournalStore>((set) => ({
  journalForm: initialJournalForm,
  updateJournal: (updates: Partial<JournalForm>) =>
    set((state: { journalForm: JournalForm }) => ({
      journalForm: { ...state.journalForm, ...updates },
    })),
  resetJournal: () =>
    set({
      journalForm: initialJournalForm,
    }),
}));
