import { Unity, useUnityContext } from 'react-unity-webgl';
import { NavigationBar } from '../../components/NavigationBar';
import { HomeContents } from '../../components/HomeContents';
import { Fragment } from 'react/jsx-runtime';

export const Home = () => {
  const { unityProvider, sendMessage, loadingProgression } = useUnityContext({
    loaderUrl: 'Build/build.loader.js',
    dataUrl: 'Build/build.data.unityweb',
    frameworkUrl: 'Build/build.framework.js.unityweb',
    codeUrl: 'Build/build.wasm.unityweb',
  });

  function handleClickButton() {
    sendMessage('Init Manager', 'Init', 'BlueFin3');
  }

  const list = [
    {
      englishName: 'Murex',
      name: '뿔소라',
      desc: '뿔소라설명',
      insDt: '뿔소라날짜',
      count: 3,
    },
    {
      englishName: 'Vinyl',
      name: '비닐',
      desc: '비닐설명',
      insDt: '비닐날짜',
      count: 2,
    },
    {
      englishName: 'SeaCucumber',
      name: '해삼',
      desc: '해삼설명',
      insDt: '해삼날짜',
      count: 4,
    },
  ];

  function onLoadEnd() {
    list.forEach((element) => {
      sendMessage('Init Manager', 'Init', element.englishName + element.count);
    });
    return '';
  }

  return (
    <div className="h-[410px] w-[393px]">
      <div className="relative">
        <progress
          value={loadingProgression}
          style={{ backgroundColor: '#FFFFFF' }}
          className={
            loadingProgression < 1
              ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
              : 'hidden' + onLoadEnd()
          }
        />
        <Unity
          unityProvider={unityProvider}
          devicePixelRatio={4}
          style={{
            width: 393,
            height: 410,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        />
      </div>

      <HomeContents />
    </div>
  );
};
