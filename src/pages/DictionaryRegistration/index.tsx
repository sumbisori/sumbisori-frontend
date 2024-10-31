import { useEffect, useState } from 'react';
import SingleDropdown from '../../components/SingleSelectList';
import {
  PostSeafood,
  SeafoodAll,
  getSeafoodAll,
  postSeafood,
} from '../../api/dictionaryRegistration';
import { useNavigate } from 'react-router-dom';

export const DictionaryRegistration = () => {
  const navigate = useNavigate();
  const [seafoods, setSeafoods] = useState<SeafoodAll[]>([]);
  const [form, setForm] = useState<PostSeafood>({
    seafood: '',
    count: 0,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null); // 이미지 미리보기 상태 추가
  const [imageFile, setImageFile] = useState<File | null>(null); // 이미지 파일 상태 추가

  async function fetchSeafoods() {
    try {
      const res = await getSeafoodAll();
      setSeafoods(res);
    } catch (error) {
      console.error(error);
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
      navigate('/dictionary');
    } catch (error) {
      console.error(error);
    }
  };

  const submitButtonDisabled = !form.seafood || !form.count || !imageFile;

  return (
    <>
      <div className="flex size-full flex-col items-center justify-center bg-white">
        <div className="mb-4 text-[22px] font-bold">사진을 등록해주세요</div>

        {/* 이미지 미리보기 및 파일 입력 */}
        <div className="mb-4 flex size-[201px] items-center justify-center rounded-lg bg-gray-300">
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

        <div className="mb-12 flex w-[201px] flex-row justify-between">
          <div className="w-[125px]">
            <SingleDropdown
              value={form.seafood}
              items={seafoods}
              onChange={(value) =>
                setForm({ ...form, seafood: value.toString() })
              }
            />
          </div>
          <div className="w-[69px]">
            <SingleDropdown
              value={form.count}
              items={[
                { value: 0, name: '0개' },
                { value: 1, name: '1개' },
                { value: 2, name: '2개' },
                { value: 3, name: '3개' },
              ]}
              onChange={(value) => setForm({ ...form, count: Number(value) })}
            />
          </div>
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