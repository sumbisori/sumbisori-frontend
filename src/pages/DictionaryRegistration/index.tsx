import { useEffect, useState } from 'react';
import { Dropdown } from '../../components/Dropdown';
import {
  PostSeafood,
  SeafoodAll,
  getSeafoodTypes,
  postSeafood,
} from '../../api/dictionaryRegistration';
import { useNavigate } from 'react-router-dom';
import { useErrorHandler } from '../../hooks/useErrorHandler';

export const DictionaryRegistration = () => {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  const [seafoods, setSeafoods] = useState<SeafoodAll[]>([]);
  const [form, setForm] = useState<PostSeafood>({
    seafoodId: null,
    count: 0,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기 상태 추가
  const [imageFile, setImageFile] = useState<File | null>(null); // 이미지 파일 상태 추가

  async function fetchSeafoods() {
    try {
      const res = await getSeafoodTypes();
      setSeafoods(res);
    } catch (error) {
      handleError(error);
    }
  }

  useEffect(() => {
    fetchSeafoods();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // 미리 보기 URL 생성
    }
  };

  const handleSubmit = async () => {
    try {
      await postSeafood(form);
      const selectedEnglish = seafoods.find((seafood) => {
        return seafood.seafoodId === form.seafoodId;
      })?.englishName;
      const selectedKorean = seafoods.find((seafood) => {
        return seafood.seafoodId === form.seafoodId;
      })?.koreanName;
      navigate(`/dictionary/confirm/${selectedEnglish}/${selectedKorean}`);
    } catch (error) {
      handleError(error);
    }
  };

  const submitButtonDisabled = !form.seafoodId || !form.count || !imageFile;

  return (
    <>
      <div className="flex size-full flex-col items-center justify-center bg-white">
        <div className="mb-4 text-[22px] font-bold">사진을 등록해주세요</div>

        {/* 이미지 미리보기 및 파일 입력 */}
        <div className="mb-4 flex size-[250px] items-center justify-center rounded-lg bg-gray-300">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="미리보기"
              className="size-full rounded-lg object-cover"
            />
          ) : (
            <div
              className="size-[36px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(/icons/Image_Icon.svg)',
              }}
            ></div>
          )}
        </div>
        <div className="flex w-full justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mb-4 ml-24"
          />
        </div>

        <div className="mb-12 flex justify-between gap-5">
          <Dropdown
            value={form.seafoodId}
            className="w-[145px]"
            items={
              seafoods.map((seafood) => ({
                value: seafood.seafoodId,
                displayName: seafood.koreanName,
              })) || []
            }
            placeholder="채취물 종류"
            onChange={(value) => setForm({ ...form, seafoodId: value })}
          />

          <Dropdown
            value={form.count}
            items={[
              { value: 0, displayName: '0개' },
              { value: 1, displayName: '1개' },
              { value: 2, displayName: '2개' },
              { value: 3, displayName: '3개' },
              { value: 4, displayName: '4개' },
              { value: 5, displayName: '5개' },
            ]}
            onChange={(value) => setForm({ ...form, count: Number(value) })}
            placeholder="개수"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={submitButtonDisabled}
          className="w-[201px] cursor-pointer rounded-md border border-[#gray-200] bg-gray-000 px-2 py-1 text-[16px] text-[#B1B1B1] transition-colors duration-200 ease-in-out hover:border-[#007AFF] hover:bg-[#ebf5ff] hover:text-[#007AFF]"
        >
          등록하기
        </button>
      </div>
    </>
  );
};
