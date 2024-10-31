import { useMutation } from '@tanstack/react-query';
import { getTest, getConnect, getDb } from '../api/home';
import { useState } from 'react';
import { useModalContext } from '../contexts/ModalContext';
import { Modal } from '../components/Modal';

export const Home = () => {
  const [apiTest, setApiTest] = useState(false);
  const [apiDB, setApiDB] = useState(false);
  const [apiConnect, setApiConnect] = useState('');
  const { openModal } = useModalContext();
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

  const handleModal = () => {
    openModal('test-modal');
  };

  return (
    <main>
      <div>안녕하세요 해남 해녀입니다</div>
      <header>
        <div>Hello 해남해녀 배포 테스트!</div>

        <div>
          <button
            className="flex w-fit items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-medium text-white"
            onClick={handleModal}
          >
            Modal TEST
          </button>
          <Modal id="test-modal" title="Modal Test">
            <div>Modal Content</div>
          </Modal>
        </div>

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
            <div className="size-10 bg-gray-000"></div>
            <div className="size-10 bg-gray-050"></div>
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
            <div className="size-10 bg-red-050"></div>
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
            <div className="size-10 bg-cyan-050"></div>
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
            <div className="size-10 bg-pink-050"></div>
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
            <div className="size-10 bg-green-050"></div>
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
            <div className="size-10 bg-grape-050"></div>
            <div className="size-10 bg-grape-100"></div>
            <div className="size-10 bg-grape-200"></div>
            <div className="size-10 bg-grape-300"></div>
            <div className="size-10 bg-grape-400"></div>
            <div className="size-10 bg-grape-500"></div>
            <div className="size-10 bg-grape-600"></div>
            <div className="size-10 bg-grape-700"></div>
            <div className="size-10 bg-grape-800"></div>
            <div className="size-10 bg-grape-900"></div>
          </div>
          <div>
            <div className="size-10 bg-lime-050"></div>
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
