import { useState } from 'react';
import { instance } from '../api/instance';

export const Home = () => {
  const [apiTest, setApiTest] = useState(false);
  const [dbTest, setDbTest] = useState(false);
  const [apiConnect, setApiConnect] = useState('');

  const handleApiOnclick = async () => {
    try {
      await instance.get('/test');
      setApiTest(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDbOnClick = async () => {
    try {
      await instance.get('/db');
      setDbTest(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleApiConnect = async () => {
    try {
      const res = await instance.get('/connect');
      setApiConnect(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      안녕하세요 해남 해녀입니다
      <header className="App-header">
        <div>Hello 해남해녀 배포 테스트 !</div>
        <div>
          <button
            className="flex w-fit items-center justify-center rounded-md bg-blue-500 px-4 py-2 font-medium text-white"
            onClick={handleApiOnclick}
          >
            API TEST
          </button>
          <div>{apiTest ? 'CONNECT' : 'NOT YET'}</div>
        </div>
        <div>
          <button onClick={handleDbOnClick}>DB TEST</button>
          <div>{dbTest ? 'CONNECT' : 'NOT YET'}</div>
        </div>
        <div>
          <button onClick={handleApiConnect}>API CONNECT</button>
          <div>{apiConnect}</div>
        </div>
      </header>
    </main>
  );
};
