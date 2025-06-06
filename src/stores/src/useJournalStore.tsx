import { create } from 'zustand';
import { JournalForm } from '@/api/journalCreate/types';

interface JournalStore {
  journalForm: JournalForm;
  updateJournal: (updates: Partial<JournalForm>) => void;
  resetJournal: () => void;
}

const initialJournalForm: JournalForm = {
  experienceDate: null,
  place: null,
  weather: null,
  companionType: null,
  impression: '',
  files: [],
  satisfaction: null,
  collections: [],
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
