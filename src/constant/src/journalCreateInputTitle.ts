import { JournalStep } from '@/api/journalCreate/types';

export const JOURNAL_CREATE_INPUT_TITLE = (step: JournalStep) => {
  switch (step) {
    case 'calendar':
      return {
        title: '물질은 언제했나요?',
        subtitle: '최근 체험한 내용을 뒤짚어보아요',
      };
    case 'place':
      return {
        title: '어디서 하셨나요?',
        subtitle: '최근 체험한 내용을 되짚어보아요',
      };
    case 'weather':
      return {
        title: '그날의 날씨는 어땠나요?',
        subtitle: '최근 체험한 내용을 되짚어보아요',
      };
    case 'photo':
      return {
        title: '남기고 싶은 내용이 있나요?',
        subtitle: '사진/영상 또는 글로 남겨보아요',
      };
    case 'seafood':
      return {
        title: '어떤 해산물을 수확하셨나요?',
        subtitle: '직접 채취한 해산물의 사진을 올려주세요!',
      };
    default:
      return {
        title: '',
        subtitle: '',
      };
  }
};
