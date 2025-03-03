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
import { InputTitle } from './InputTitle';
import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { StepBar } from './StepBar';
import { motion } from 'framer-motion';
import { JournalForm, JournalStep } from '@/api/journal/types';

export const JournalCreate = () => {
  const { step } = useParams();
  const [form, setForm] = useState<JournalForm>({
    date: dayjs(),
    place: null,
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
    <div className="flex h-full min-h-screen flex-col bg-gray-050 pt-header-height">
      <div className="bg-white">
        <NavigatorHeader
          title="체험 일지"
          onBackClick={step === 'calendar' ? undefined : handleBackClick}
          onCloseClick={handleCloseClick}
          className="bg-white"
        />
        <StepBar
          current={stepList.indexOf(step as JournalStep) + 1}
          total={stepList.length}
        />
        <InputTitle
          title={JOURNAL_CREATE_INPUT_TITLE(step).title}
          subtitle={JOURNAL_CREATE_INPUT_TITLE(step).subtitle}
        />
      </div>
      <form className="flex flex-1 flex-col">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
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
              place={form.place}
              onPlaceChange={(place) => setForm({ ...form, place })}
            />
          )}
          {step === 'weather' && <SelectWeather />}
          {step === 'photo' && <SelectPhoto />}
          {step === 'seafood' && <SelectSeafood />}
          {step === 'register' && <Register />}
        </motion.div>
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
