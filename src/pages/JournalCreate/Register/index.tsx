import { useJournalStore } from '@/stores';
import dayjs from '@/util/dayjs';
import { RegisterInfo } from '../RegisterInfo';
import { WeatherIcon } from '@/components/WeatherIcon';
import { Divider } from '@/components/Divider';
import { RegisterTitle } from '../RegisterTitle';
import { useMemo } from 'react';
import { parseCompanionType } from '@/util/parseCompanionType';

export const Register = () => {
  const { journalForm } = useJournalStore();
  // 날짜, 장소, 날씨, 동반 인원, 사진, 내용, 수확물
  // 날짜 형식 변경 25년 3월 16일 (일)
  const date = dayjs(journalForm.experienceDate)
    .locale('ko')
    .format('YY년 MM월 DD일 (ddd)');

  // koreanName 과 count를 모두 합친 배열
  const seafoodSummary = useMemo(
    () =>
      journalForm.collections?.reduce(
        (acc, curr) => {
          curr.collectionInfos.forEach((seafood) => {
            const existingSeafood = acc.find(
              (item) => item.koreanName === seafood.koreanName,
            );

            if (existingSeafood) {
              existingSeafood.count += seafood.count;
            } else {
              acc.push({
                koreanName: seafood.koreanName,
                count: seafood.count,
              });
            }
          });

          return acc;
        },
        [] as { koreanName: string; count: number }[],
      ) ?? [],
    [journalForm.collections],
  );

  return (
    <>
      <RegisterTitle />
      <div className="p-4">
        <div className="rounded-2xl border border-gray-050 bg-white px-5 py-3 shadow-sm">
          <RegisterInfo title="날짜" value={<span>{date}</span>} />
          <Divider color="bg-gray-100" />
          <RegisterInfo
            title="장소"
            value={<span>{journalForm.place?.name}</span>}
          />
          <Divider color="bg-gray-100" />
          <RegisterInfo
            title="날씨"
            value={
              journalForm.weather ? (
                <div className="rounded-lg border border-gray-400 p-2.5">
                  <WeatherIcon
                    type={journalForm.weather}
                    className="text-gray-500"
                  ></WeatherIcon>
                </div>
              ) : (
                <span>-</span>
              )
            }
          />
          <Divider color="bg-gray-100" />
          <RegisterInfo
            title="동반 인원"
            value={parseCompanionType(journalForm.companionType || '')}
          />
          <Divider color="bg-gray-100" />
          <RegisterInfo
            title="사진"
            value={
              <div className="flex items-center gap-3">
                {journalForm.files.slice(0, 2).map((photo, index) => (
                  <div key={photo.imageIdentifier} className="relative">
                    <img
                      src={URL.createObjectURL(photo.file)}
                      alt={photo.imageIdentifier}
                      className="size-24 rounded-xl border border-gray-200 object-cover"
                    />
                    {index === 1 && journalForm.files.length > 2 && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/45 text-sm text-white">
                        +{journalForm.files.length - 2}
                      </div>
                    )}
                  </div>
                ))}
                {journalForm.files.length === 0 && (
                  <div className="flex size-24 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
                    <p className="text-xs text-gray-500">사진이 없습니다</p>
                  </div>
                )}
              </div>
            }
          />
          <Divider color="bg-gray-100" />
          <RegisterInfo
            title="내용"
            value={
              journalForm.impression ? (
                <span>{journalForm.impression}</span>
              ) : (
                <span>-</span>
              )
            }
          />
          <Divider color="bg-gray-100" />
          <RegisterInfo
            title="수확물"
            value={
              seafoodSummary.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {seafoodSummary.map((seafood) => (
                    <div key={seafood.koreanName}>
                      <span>{seafood.koreanName} </span>
                      <span>x {seafood.count}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span>수확물이 없습니다</span>
              )
            }
          />
        </div>
      </div>
    </>
  );
};
