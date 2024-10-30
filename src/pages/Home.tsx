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
      </header>
    </main>
  );
};
