import { useJournalStore } from '@/stores';
import dayjs from '@/util/dayjs';
import { RegisterInfo } from '../RegisterInfo';
import { WeatherIcon } from '@/components/WeatherIcon';
import { Divider } from '@/components/Divider';
import { JOURNAL_CREATE_INPUT_TITLE } from '@/constant/src/journalCreateInputTitle';
import { RegisterTitle } from '../RegisterTitle';
export const Register = () => {
  const { journalForm } = useJournalStore();
  // 날짜, 장소, 날씨, 동반 인원, 사진, 내용, 수확물
  // 날짜 형식 변경 25년 3월 16일 (일)
  const date = dayjs(journalForm.date)
    .locale('ko')
    .format('YY년 MM월 DD일 (ddd)');

  // koreanName 과 count를 모두 합친 배열
  const seafoodSummary = journalForm.collectedSeafoods?.reduce(
    (acc, curr) => {
      curr.seafoods.forEach((seafood) => {
        const existingSeafood = acc.find(
          (item) => item.koreanName === seafood.koreanName,
        );

        if (existingSeafood) {
          existingSeafood.count += seafood.count;
        } else {
          acc.push({ koreanName: seafood.koreanName, count: seafood.count });
        }
      });

      return acc;
    },
    [] as { koreanName: string; count: number }[],
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
              <div className="rounded-lg border border-gray-400 p-2.5">
                <WeatherIcon
                  type={journalForm.weather}
                  className="text-gray-500"
                ></WeatherIcon>
              </div>
            }
          />
          <Divider color="bg-gray-100" />
          <RegisterInfo title="동반 인원" value={journalForm.companion} />
          <Divider color="bg-gray-100" />
          <RegisterInfo
            title="사진"
            value={
              <div className="flex items-center gap-3">
                {journalForm.photos.slice(0, 2).map((photo, index) => (
                  <div key={photo.imageIdentifier} className="relative">
                    <img
                      src={URL.createObjectURL(photo.file)}
                      alt={photo.imageIdentifier}
                      className="size-24 rounded-xl border border-gray-200 object-cover"
                    />
                    {index === 1 && journalForm.photos.length > 2 && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/45 text-sm text-white">
                        +{journalForm.photos.length - 2}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            }
          />
          <Divider color="bg-gray-100" />
          <RegisterInfo
            title="내용"
            value={
              journalForm.experience ? (
                <span>{journalForm.experience}</span>
              ) : (
                <span>-</span>
              )
            }
          />
          <Divider color="bg-gray-100" />
          <RegisterInfo
            title="수확물"
            value={
              <div className="flex flex-col gap-5">
                {seafoodSummary.map((seafood) => (
                  <div key={seafood.koreanName}>
                    <span>{seafood.koreanName} </span>
                    <span>x {seafood.count}</span>
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </div>
    </>
  );
};
