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
  placeId: null,
  weather: null,
  photo: null,
  seafood: null,
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
