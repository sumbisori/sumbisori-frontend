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
import { SelectPhoto } from './SelectPhoto';
import { SelectCollectedSeafood } from './SelectCollectedSeafood';
import { Register } from './Register';
import { Complete } from './Complete';

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

  // 한단계 건너뛰는 함수 최종 전 단계면 'register' 단계로 감
  const handleSkipClick = (e: MouseEvent) => {
    e.preventDefault();
    const currentStep = params.step as JournalStep;
    const currentIndex = stepList.indexOf(currentStep);

    // 현재 단계가 최종 전 단계(seafood)인 경우 register로 이동
    if (currentIndex === stepList.length - 2) {
      navigate(routes.journalCreate('register'));
      return;
    }

    // 그 외의 경우 다음다음 단계로 이동
    if (currentIndex < stepList.length - 2) {
      const skipToStep = stepList[currentIndex + 2];
      navigate(routes.journalCreate(skipToStep));
    }
  };

  const handleCompleteClick = (e: MouseEvent) => {
    e.preventDefault();
    navigate(routes.journalCreate('complete'));
  };

  const handleNextDisabled = () => {
    if (step === 'calendar') {
      return !journalForm.date;
    }
    // 장소 선택 최초값 null 이고 필수값
    if (step === 'place') {
      return !journalForm.place;
    }
    // 날씨 선택 최초값 null 이고 필수값
    if (step === 'weather') {
      return !journalForm.weather || !journalForm.companion;
    }
    // 체험 사진은 빈 배열 허용, 체험 만족도는 1 이상 5 이하 필수값, 체험 후기는 최소 10글자 이상
    if (step === 'photo') {
      const isSatisfactionValid =
        journalForm.satisfaction &&
        journalForm.satisfaction >= 1 &&
        journalForm.satisfaction <= 5;
      const isExperienceValid = journalForm.experience.length >= 10;
      return !isSatisfactionValid || !isExperienceValid;
    }
    // 해산물 사진은 빈 배열 불가 but 입력하지 않으면 건너뛰기 버튼
    if (step === 'seafood') {
      return journalForm.collectedSeafoods.length === 0;
    }
    return false;
  };

  useEffect(() => {
    return () => {
      resetJournal();
    };
  }, []);

  if (step === 'complete') {
    return <Complete />;
  }

  if (!step || !stepList.includes(step as JournalStep)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <div className="relative flex h-full min-h-screen flex-col pt-[4.5rem]">
      <NavigatorHeader
        title="체험 일지"
        onBackClick={step === 'calendar' ? undefined : handleBackClick}
        onCloseClick={handleCloseClick}
        stepBar={
          step === 'complete'
            ? undefined
            : {
                current: stepList.indexOf(step as JournalStep) + 1,
                total: stepList.length,
              }
        }
        className={step === 'register' ? 'bg-gray-100' : 'bg-white'}
      />
      <form className="flex flex-1 flex-col bg-gray-050 pb-[4.5rem]">
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
              selectedPlace={journalForm.place}
              onPlaceChange={(place) =>
                updateJournal({
                  place: place,
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
          {step === 'photo' && (
            <SelectPhoto
              photos={journalForm.photos}
              onPhotosChange={(photos) =>
                updateJournal({
                  photos,
                })
              }
              experience={journalForm.experience}
              onExperienceChange={(experience) =>
                updateJournal({
                  experience,
                })
              }
              satisfaction={journalForm.satisfaction}
              onSatisfactionChange={(satisfaction) =>
                updateJournal({
                  satisfaction,
                })
              }
            />
          )}
          {step === 'seafood' && (
            <SelectCollectedSeafood
              collectedSeafoods={journalForm.collectedSeafoods}
              onCollectedSeafoodsChange={(collectedSeafoods) =>
                updateJournal({
                  collectedSeafoods,
                })
              }
            />
          )}
          {step === 'register' && <Register />}
        </div>
        {step === 'seafood' && (
          <div className="fixed inset-x-0 bottom-[4.5rem] z-10 m-auto flex w-full min-w-full-layout max-w-full-layout items-center justify-center">
            <button
              className="text-gray-600 underline"
              type="button"
              onClick={handleSkipClick}
            >
              건너뛰기
            </button>
          </div>
        )}
        <div className="fixed inset-x-0 bottom-0 z-10 m-auto flex w-full min-w-full-layout max-w-full-layout px-5 pb-5 pt-3">
          <LargeButton
            onClick={
              step === 'register' ? handleCompleteClick : handleNextClick
            }
            type={step === 'register' ? 'submit' : 'button'}
            disabled={handleNextDisabled()}
          >
            {step === 'register' ? '등록' : '다음'}
          </LargeButton>
        </div>
      </form>
    </div>
  );
};
