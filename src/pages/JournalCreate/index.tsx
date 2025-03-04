import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { LargeButton } from '@/components/LargeButton';
import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import { routes } from '@/routes/src/routes';
import { JournalStep } from '@/api/journalCreate/types';
import { useJournalStore } from '@/stores';
import { MouseEvent, useEffect } from 'react';
import { SelectCalendar } from './SelectCalendar';
import { SelectPlace } from './SelectPlace';
import { SelectWeather } from './SelectWeather';
import { SelectPhoto } from './SelecrPhoto';
import { SelectSeafood } from './SelecrSeafood';
import { Register } from './Register';

export const JournalCreate = () => {
  const { step } = useParams();
  const { journalForm, updateJournal, resetJournal } = useJournalStore();
  const navigate = useNavigate();
  const params = useParams();

  const stepList: JournalStep[] = [
    'calendar',
    'place',
    'weather',
    'photo',
    'seafood',
    'register',
  ];

  const handleBackClick = () => {
    const currentStep = params.step as JournalStep;
    const currentIndex = stepList.indexOf(currentStep);
    if (currentIndex > 0) {
      const previousStep = stepList[currentIndex - 1];
      navigate(routes.journalCreate(previousStep));
    }
  };

  const handleCloseClick = () => {
    navigate(routes.dictionary);
  };

  const handleNextClick = (e: MouseEvent) => {
    e.preventDefault();
    const currentStep = params.step as JournalStep;
    const currentIndex = stepList.indexOf(currentStep);
    if (currentIndex < stepList.length - 1) {
      const nextStep = stepList[currentIndex + 1];
      navigate(routes.journalCreate(nextStep));
    }
  };

  const handleCompleteClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(routes.home);
  };

  useEffect(() => {
    return () => {
      resetJournal();
    };
  }, []);

  if (!step || !stepList.includes(step as JournalStep)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="flex h-full min-h-screen flex-col pt-header-height">
      <NavigatorHeader
        title="체험 일지"
        onBackClick={step === 'calendar' ? undefined : handleBackClick}
        onCloseClick={handleCloseClick}
        className="bg-white"
        stepBar={{
          current: stepList.indexOf(step as JournalStep) + 1,
          total: stepList.length,
        }}
      />
      <form className="flex flex-1 flex-col bg-gray-050">
        <div className="flex-1">
          {step === 'calendar' && (
            <SelectCalendar
              value={journalForm.date}
              onChange={(date) =>
                updateJournal({
                  date,
                })
              }
            />
          )}
          {step === 'place' && (
            <SelectPlace
              selectedPlace={journalForm.placeId}
              onPlaceChange={(place) =>
                updateJournal({
                  placeId: place,
                })
              }
            />
          )}
          {step === 'weather' && (
            <SelectWeather
              selectedWeather={journalForm.weather}
              onWeatherChange={(weather) =>
                updateJournal({
                  weather,
                })
              }
              selectedCompanion={journalForm.companion}
              onCompanionChange={(companion) =>
                updateJournal({
                  companion,
                })
              }
            />
          )}
          {step === 'photo' && <SelectPhoto />}
          {step === 'seafood' && <SelectSeafood />}
          {step === 'register' && <Register />}
        </div>
        <div className="px-5 pb-5">
          <LargeButton
            onClick={
              step === 'register' ? handleCompleteClick : handleNextClick
            }
            type={step === 'register' ? 'submit' : 'button'}
          >
            {step === 'register' ? '등록' : '다음'}
          </LargeButton>
        </div>
      </form>
    </div>
  );
};
