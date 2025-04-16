import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { LargeButton } from '@/components/LargeButton';
import { NavigatorHeader } from '@/layouts/NavigatorHeader';
import { routes } from '@/routes/src/routes';
import { JournalRequest, JournalStep } from '@/api/journalCreate/types';
import { useJournalStore } from '@/stores';
import { MouseEvent, useEffect } from 'react';
import { SelectCalendar } from './SelectCalendar';
import { SelectPlace } from './SelectPlace';
import { SelectWeather } from './SelectWeather';
import { SelectPhoto } from './SelectPhoto';
import { SelectCollectedSeafood } from './SelectCollectedSeafood';
import { Register } from './Register';
import { Complete } from './Complete';
import { useMutation } from '@tanstack/react-query';
import { createJournal } from '@/api/journalCreate';
import { toast } from '@/components/Toast';
import { ERROR_MESSAGE } from '@/constant/src/error';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/api/types';
import { Spinner } from '@/components/Spinner';

export const JournalCreate = () => {
  const { step } = useParams();
  const { journalForm, updateJournal, resetJournal } = useJournalStore();
  const navigate = useNavigate();
  const params = useParams();
  const mutation = useMutation({
    mutationFn: createJournal,
    onSuccess: () => {
      resetJournal();
      navigate(routes.journalCreate('complete'), { replace: true });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error.response?.data.name;
      if (errorMessage === 'INVALID_IMAGE_CONTENT_TYPE') {
        toast.error(ERROR_MESSAGE.INVALID_IMAGE_CONTENT_TYPE);
      }
      if (errorMessage === 'VALIDATION_FAILED') {
        toast.error(ERROR_MESSAGE.IMAGE_VALIDATION_FAILED);
      }
      if (errorMessage === 'PLACE_NOT_FOUND') {
        toast.error(ERROR_MESSAGE.PLACE_NOT_FOUND);
      }
      if (errorMessage === 'SEAFOOD_NOT_FOUND') {
        toast.error(ERROR_MESSAGE.SEAFOOD_NOT_FOUND);
      }
      if (errorMessage === 'S3_ERROR') {
        toast.error(ERROR_MESSAGE.S3_ERROR);
      }
      throw error;
    },
  });

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

    // 필수 값들이 없으면 제출하지 않음
    if (
      !journalForm.experienceDate ||
      !journalForm.place ||
      !journalForm.weather ||
      !journalForm.companionType ||
      !journalForm.satisfaction
    ) {
      return;
    }

    const journal: JournalRequest = {
      experienceDate: journalForm.experienceDate.format('YYYY-MM-DD'),
      placeId: journalForm.place.id,
      weather: journalForm.weather,
      companionType: journalForm.companionType,
      files: journalForm.files.map((file) => ({
        imageIdentifier: file.imageIdentifier,
        sequence: file.sequence,
      })),
      impression: journalForm.impression,
      satisfaction: journalForm.satisfaction,
      collections: journalForm.collections.map((collection) => ({
        imageIdentifier: collection.imageIdentifier,
        collectionInfos: collection.collectionInfos.map((info) => ({
          seafoodId: info.seafoodId,
          quantity: info.count,
        })),
      })),
    };

    mutation.mutate(journal);
  };

  const handleNextDisabled = () => {
    if (step === 'calendar') {
      return !journalForm.experienceDate;
    }
    // 장소 선택 최초값 null 이고 필수값
    if (step === 'place') {
      return !journalForm.place;
    }
    // 날씨 선택 최초값 null 이고 필수값
    if (step === 'weather') {
      return !journalForm.weather || !journalForm.companionType;
    }
    // 체험 사진은 빈 배열 허용, 체험 만족도는 1 이상 5 이하 필수값, 체험 후기는 최소 10글자 이상
    if (step === 'photo') {
      const isSatisfactionValid =
        journalForm.satisfaction &&
        journalForm.satisfaction >= 1 &&
        journalForm.satisfaction <= 5;
      const isExperienceValid = journalForm.impression.length >= 10;
      return !isSatisfactionValid || !isExperienceValid;
    }
    // 해산물 사진은 빈 배열 불가 but 입력하지 않으면 건너뛰기 버튼
    if (step === 'seafood') {
      // 해산물 사진의 분석이 pending 상태면 버튼 비활성화
      const isPending = journalForm.collections.some(
        (collection) => collection.analysisStatus === 'pending',
      );
      return journalForm.collections.length === 0 || isPending;
    }
    return false;
  };

  useEffect(() => {
    return () => {
      resetJournal();
    };
  }, []);

  // 전단계 모든 단계에서 disabled 이면 첫 단계로 이동
  const isStepValid = (stepToCheck: JournalStep) => {
    switch (stepToCheck) {
      case 'calendar':
        return !!journalForm.experienceDate;
      case 'place':
        return !!journalForm.place;
      case 'weather':
        return !!journalForm.weather && !!journalForm.companionType;
      case 'photo':
        return (
          journalForm.satisfaction &&
          journalForm.satisfaction >= 1 &&
          journalForm.satisfaction <= 5 &&
          journalForm.impression.length >= 10
        );
      case 'seafood':
        return true; // seafood는 선택사항이므로 항상 true
      case 'register':
        return true;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (!step || step === 'complete') return;

    // 현재 단계의 인덱스
    const currentStepIndex = stepList.indexOf(step as JournalStep);

    // 이전 단계들 중 미완료된 첫 단계 찾기
    for (let i = 0; i < currentStepIndex; i++) {
      if (!isStepValid(stepList[i])) {
        navigate(routes.journalCreate(stepList[i]));
        return;
      }
    }
  }, [step]);

  if (step === 'complete') {
    return <Complete />;
  }

  if (!step || !stepList.includes(step as JournalStep)) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <>
      <NavigatorHeader
        title="체험 일지"
        onLeftClick={step === 'calendar' ? undefined : handleBackClick}
        onRightClick={handleCloseClick}
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
      <div className="relative flex h-full min-h-screen flex-col pt-custom-72px-spacer">
        {mutation.isPending && (
          <Spinner className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" />
        )}
        <form className="flex flex-1 flex-col bg-gray-050 pb-custom-72px-spacer">
          <div className="flex-1">
            {step === 'calendar' && (
              <SelectCalendar
                value={journalForm.experienceDate}
                onChange={(date) =>
                  updateJournal({
                    experienceDate: date,
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
                selectedCompanion={journalForm.companionType}
                onCompanionChange={(companion) =>
                  updateJournal({
                    companionType: companion,
                  })
                }
              />
            )}
            {step === 'photo' && (
              <SelectPhoto
                files={journalForm.files}
                onFilesChange={(files) =>
                  updateJournal({
                    files: files,
                  })
                }
                experience={journalForm.impression}
                onExperienceChange={(experience) =>
                  updateJournal({
                    impression: experience,
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
                collections={journalForm.collections}
                onCollectionsChange={(collections) =>
                  updateJournal({
                    collections,
                  })
                }
                onSkipClick={handleSkipClick}
              />
            )}
            {step === 'register' && <Register />}
          </div>
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
    </>
  );
};
