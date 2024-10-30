import { useMutation } from '@tanstack/react-query';
import { getTest, getConnect, getDb } from '../api/home';
import { useState } from 'react';

export const Home = () => {
  const [apiTest, setApiTest] = useState(false);
  const [apiDB, setApiDB] = useState(false);
  const [apiConnect, setApiConnect] = useState('');
  // API 데이터 로딩 및 에러 상태 관리
  const getTestMutation = useMutation({
    mutationFn: getTest,
    onSuccess: (data: boolean) => {
      setApiTest(data);
    },
    onError: () => alert('Failed to connect'),
  });

  // DB 테스트 버튼 처리
  const getDbMutation = useMutation({
    mutationFn: getDb,
    onSuccess: (data: boolean) => {
      setApiDB(data);
    },
    onError: () => alert('DB Test Failed!'),
  });

  // API 테스트 버튼 처리
  const getConnectMutation = useMutation({
    mutationFn: getConnect,
    onSuccess: () => {
      alert('API Test Success!');
      setApiConnect('API Connect Success!');
    },
    onError: () => alert('API Test Failed!'),
  });

  const handleApiTest = () => {
    getTestMutation.mutate();
  };

  const handleDbTest = () => {
    getDbMutation.mutate();
  };

  const handleApiConnect = () => {
    getConnectMutation.mutate();
  };

  return (
    <main>
      <div>안녕하세요 해남 해녀입니다</div>
      <header className="App-header">
        <div>Hello 해남해녀 배포 테스트!</div>

        <div>
          <button
            className="flex w-fit items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-medium text-white"
            onClick={handleApiTest}
          >
            API TEST
          </button>

          <div>
            {getTestMutation.isPending ? 'Testing...' : apiTest}
            {getTestMutation.isError ? 'Failed to connect' : ''}
          </div>
        </div>

        <div>
          <button
            className="flex w-fit items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-medium text-white"
            onClick={handleDbTest}
          >
            DB TEST
          </button>
          <div>
            {getDbMutation.isPending ? 'Testing...' : apiDB}
            {getDbMutation.isError ? 'Failed to connect' : ''}
          </div>
        </div>

        <div>
          <button
            className="flex w-fit items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-medium text-white"
            onClick={handleApiConnect}
          >
            API CONNECT
          </button>
          <div>
            {getConnectMutation.isPending ? 'Testing...' : apiConnect}
            {getConnectMutation.isError ? 'Failed to connect' : ''}
          </div>
        </div>
        <div className="flex">
          <div>
            <div className="bg-gray-000 size-10"></div>
            <div className="bg-gray-050 size-10"></div>
            <div className="size-10 bg-gray-100"></div>
            <div className="size-10 bg-gray-200"></div>
            <div className="size-10 bg-gray-300"></div>
            <div className="size-10 bg-gray-400"></div>
            <div className="size-10 bg-gray-500"></div>
            <div className="size-10 bg-gray-600"></div>
            <div className="size-10 bg-gray-700"></div>
            <div className="size-10 bg-gray-800"></div>
            <div className="size-10 bg-gray-900"></div>
          </div>
          <div>
            <div className="bg-red-000 size-10"></div>
            <div className="bg-red-050 size-10"></div>
            <div className="size-10 bg-red-100"></div>
            <div className="size-10 bg-red-200"></div>
            <div className="size-10 bg-red-300"></div>
            <div className="size-10 bg-red-400"></div>
            <div className="size-10 bg-red-500"></div>
            <div className="size-10 bg-red-600"></div>
            <div className="size-10 bg-red-700"></div>
            <div className="size-10 bg-red-800"></div>
            <div className="size-10 bg-red-900"></div>
          </div>
          <div>
            <div className="bg-cyan-000 size-10"></div>
            <div className="bg-cyan-050 size-10"></div>
            <div className="size-10 bg-cyan-100"></div>
            <div className="size-10 bg-cyan-200"></div>
            <div className="size-10 bg-cyan-300"></div>
            <div className="size-10 bg-cyan-400"></div>
            <div className="size-10 bg-cyan-500"></div>
            <div className="size-10 bg-cyan-600"></div>
            <div className="size-10 bg-cyan-700"></div>
            <div className="size-10 bg-cyan-800"></div>
            <div className="size-10 bg-cyan-900"></div>
          </div>
          <div>
            <div className="bg-pink-000 size-10"></div>
            <div className="bg-pink-050 size-10"></div>
            <div className="size-10 bg-pink-100"></div>
            <div className="size-10 bg-pink-200"></div>
            <div className="size-10 bg-pink-300"></div>
            <div className="size-10 bg-pink-400"></div>
            <div className="size-10 bg-pink-500"></div>
            <div className="size-10 bg-pink-600"></div>
            <div className="size-10 bg-pink-700"></div>
            <div className="size-10 bg-pink-800"></div>
            <div className="size-10 bg-pink-900"></div>
          </div>
          <div>
            <div className="bg-green-000 size-10"></div>
            <div className="bg-green-050 size-10"></div>
            <div className="size-10 bg-green-100"></div>
            <div className="size-10 bg-green-200"></div>
            <div className="size-10 bg-green-300"></div>
            <div className="size-10 bg-green-400"></div>
            <div className="size-10 bg-green-500"></div>
            <div className="size-10 bg-green-600"></div>
            <div className="size-10 bg-green-700"></div>
            <div className="size-10 bg-green-800"></div>
            <div className="size-10 bg-green-900"></div>
          </div>
          <div>
            <div className="bg-grape-000 size-10"></div>
            <div className="bg-grape-050 size-10"></div>
            <div className="bg-grape-100 size-10"></div>
            <div className="bg-grape-200 size-10"></div>
            <div className="bg-grape-300 size-10"></div>
            <div className="bg-grape-400 size-10"></div>
            <div className="bg-grape-500 size-10"></div>
            <div className="bg-grape-600 size-10"></div>
            <div className="bg-grape-700 size-10"></div>
            <div className="bg-grape-800 size-10"></div>
            <div className="bg-grape-900 size-10"></div>
          </div>
          <div>
            <div className="bg-lime-000 size-10"></div>
            <div className="bg-lime-050 size-10"></div>
            <div className="size-10 bg-lime-100"></div>
            <div className="size-10 bg-lime-200"></div>
            <div className="size-10 bg-lime-300"></div>
            <div className="size-10 bg-lime-400"></div>
            <div className="size-10 bg-lime-500"></div>
            <div className="size-10 bg-lime-600"></div>
            <div className="size-10 bg-lime-700"></div>
            <div className="size-10 bg-lime-800"></div>
            <div className="size-10 bg-lime-900"></div>
          </div>
        </div>
      </header>
    </main>
  );
};
