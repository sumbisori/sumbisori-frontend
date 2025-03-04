import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { SelectCalendar } from './SelectCalendar';
import { LargeButton } from '@/components/LargeButton';
import dayjs from '@/util/dayjs';
import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import { routes } from '@/routes/src/routes';
import { SelectPlace } from './SelectPlace';
import { SelectWeather } from './SelectWeather';
import { SelectPhoto } from './SelecrPhoto';
import { SelectSeafood } from './SelecrSeafood';
import { Register } from './Register';
import { JournalForm, JournalStep } from '@/api/journalCreate/types';

export const JournalCreate = () => {
  const { step } = useParams();
  const [form, setForm] = useState<JournalForm>({
    date: dayjs(),
    placeId: 1,
    weather: null,
    photo: null,
    seafood: null,
  });
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

  const handleNextClick = () => {
    const currentStep = params.step as JournalStep;
    const currentIndex = stepList.indexOf(currentStep);
    if (currentIndex < stepList.length - 1) {
      const nextStep = stepList[currentIndex + 1];
      navigate(routes.journalCreate(nextStep));
    }
  };

  const handleCompleteClick = () => {
    navigate(routes.home);
  };

  if (!step || !stepList.includes(step as JournalStep)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="flex h-full min-h-screen flex-col pt-header-height">
      <div className="bg-white">
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
      </div>
      <form className="flex flex-1 flex-col bg-gray-050">
        <div className="flex-1">
          {step === 'calendar' && (
            <SelectCalendar
              value={form.date}
              onChange={(date) =>
                setForm({
                  ...form,
                  date,
                })
              }
            />
          )}
          {step === 'place' && (
            <SelectPlace
              selectedPlace={form.placeId}
              onPlaceChange={(place) => setForm({ ...form, placeId: place })}
            />
          )}
          {step === 'weather' && <SelectWeather />}
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
