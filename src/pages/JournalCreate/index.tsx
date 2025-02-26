import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { SelectCalendar } from './SelectCalendar';
import { LargeButton } from '@/components/LargeButton';
import dayjs from '@/util/dayjs';
import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import { routes } from '@/routes/src/routes';

type Step = 'calendar' | 'place' | 'weather' | 'photo' | 'seafood' | 'register';

export const JournalCreate = () => {
  const { step } = useParams();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const navigate = useNavigate();
  const params = useParams();

  const stepList: Step[] = [
    'calendar',
    'place',
    'weather',
    'photo',
    'seafood',
    'register',
  ];

  const handleBackClick = () => {
    const currentStep = params.step as Step;
    const currentIndex = stepList.indexOf(currentStep);
    if (currentIndex > 0) {
      const previousStep = stepList[currentIndex - 1];
      navigate(routes.journalCreate(previousStep));
    }
  };

  const handleNextClick = () => {
    const currentStep = params.step as Step;
    const currentIndex = stepList.indexOf(currentStep);
    if (currentIndex < stepList.length - 1) {
      const nextStep = stepList[currentIndex + 1];
      navigate(routes.journalCreate(nextStep));
    }
  };

  const handleCompleteClick = () => {
    navigate(routes.home);
  };

  const handleCloseClick = () => {
    navigate(routes.dictionary);
  };

  if (!step || !stepList.includes(step as Step)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="flex h-full min-h-screen flex-col bg-gray-050 pt-header-height">
      <NavigatorHeader
        title="일기 작성"
        onBackClick={step === 'calendar' ? undefined : handleBackClick}
        onCloseClick={handleCloseClick}
      />
      <div className="flex-1">
        {step === 'calendar' && (
          <SelectCalendar value={selectedDate} onChange={setSelectedDate} />
        )}
      </div>
      <div className="mt-auto px-5 pb-5">
        <LargeButton
          onClick={step === 'register' ? handleCompleteClick : handleNextClick}
        >
          {step === 'register' ? '등록' : '다음'}
        </LargeButton>
      </div>
    </div>
  );
};
