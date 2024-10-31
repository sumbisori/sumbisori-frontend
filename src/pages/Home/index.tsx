import { Unity, useUnityContext } from 'react-unity-webgl';
import { NavigationBar } from '../../components/NavigationBar';
import { HomeContents } from '../../components/HomeContents';
import { Fragment } from 'react/jsx-runtime';
import { DictionarySeafood, getSeafoodMy } from '../../api/dictionary';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [seafoods, setSeafoods] = useState<DictionarySeafood[]>([]);
  const { unityProvider, sendMessage, loadingProgression } = useUnityContext({
    loaderUrl: 'Build/build.loader.js',
    dataUrl: 'Build/build.data.unityweb',
    frameworkUrl: 'Build/build.framework.js.unityweb',
    codeUrl: 'Build/build.wasm.unityweb',
  });

  const fetchSeafoods = async () => {
    try {
      const response = await getSeafoodMy();
      setSeafoods(response);
    } catch (error) {
      console.error(error);
    }
  };

  function onLoadEnd() {
    seafoods.forEach((element) => {
      sendMessage('Init Manager', 'Init', element.englishName + element.count);
    });
    return '';
  }

  useEffect(() => {
    fetchSeafoods();
  }, []);

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

      <HomeContents seafoods={seafoods} />
    </div>
  );
};
