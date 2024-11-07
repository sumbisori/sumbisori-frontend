import { Unity, useUnityContext } from 'react-unity-webgl';
import { HomeContents } from '../../components/HomeContents';
import { useEffect, useState } from 'react';
import { SeafoodCollected, getSeafoodCollected } from '../../api/home';

export const Home = () => {
  const [seafoods, setSeafoods] = useState<SeafoodCollected[]>([]);

  const { unityProvider, sendMessage, loadingProgression } = useUnityContext({
    loaderUrl: 'Build/build.loader.js',
    dataUrl: 'Build/build.data.unityweb',
    frameworkUrl: 'Build/build.framework.js.unityweb',
    codeUrl: 'Build/build.wasm.unityweb',
  });

  const fetchSeafoods = async () => {
    try {
      const response = await getSeafoodCollected();
      setSeafoods(response);
    } catch (error) {
      console.error(error);
    }
  };

  function onLoadEnd() {
    seafoods.forEach((seafood) => {
      sendMessage('Init Manager', 'Init', seafood.englishName + seafood.count);
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
