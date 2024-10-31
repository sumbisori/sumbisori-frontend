import { Unity, useUnityContext } from 'react-unity-webgl';
import { NavigationBar } from '../../components/NavigationBar';
import { HomeContents } from '../../components/HomeContents';

export const Home = () => {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: 'Build/build.loader.js',
    dataUrl: 'Build/build.data.unityweb',
    frameworkUrl: 'Build/build.framework.js.unityweb',
    codeUrl: 'Build/build.wasm.unityweb',
  });

  function handleClickButton() {
    sendMessage('Init Manager', 'Init', 'BlueFin3');
  }

  return (
    <div>
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

      <HomeContents />
    </div>
  );
};
