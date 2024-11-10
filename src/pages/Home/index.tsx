import { Unity, useUnityContext } from 'react-unity-webgl';
import { HomeContents } from '../../components/HomeContents';
import { useEffect, useState } from 'react';
import { SeafoodCollected, getSeafoodCollected } from '../../api/home';
import { useErrorHandler } from '../../hooks/useErrorHandler';

export const Home = () => {
  const [seafoods, setSeafoods] = useState<SeafoodCollected[]>([]);
  const { handleError } = useErrorHandler();

  const { unityProvider, sendMessage, loadingProgression, isLoaded } =
    useUnityContext({
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
      handleError(error);
    }
  };

  useEffect(() => {
    fetchSeafoods();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      seafoods.forEach((seafood) => {
        sendMessage(
          'Init Manager',
          'Init',
          seafood.englishName + seafood.count,
        );
      });
    }
  }, [isLoaded, seafoods, sendMessage]);

  return (
    <div className="h-[410px] w-[393px]">
      <div className="relative">
        <progress
          value={loadingProgression}
          style={{ backgroundColor: '#FFFFFF' }}
          className={
            loadingProgression < 1
              ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
              : 'hidden'
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
