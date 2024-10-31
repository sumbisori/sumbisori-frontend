import { Unity, useUnityContext } from 'react-unity-webgl';
import { NavigationBar } from '../../components/NavigationBar';
import { HomeContents } from '../../components/HomeContents';

export const Home = () => {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: 'Build/build.loader.js',
    dataUrl: 'Build/build.data.br',
    frameworkUrl: 'Build/build.framework.js.br',
    codeUrl: 'Build/build.wasm.br',
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
          height: 325,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      />

      <HomeContents />
    </div>
  );
};
