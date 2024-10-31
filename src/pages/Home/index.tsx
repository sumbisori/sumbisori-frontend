import { useMutation } from '@tanstack/react-query';
import { getTest, getConnect, getDb } from '../../api/home';
import { useState } from 'react';
import { useModalContext } from '../../contexts/ModalContext';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';

import { Unity, useUnityContext } from 'react-unity-webgl';
import { NavigationBar } from '../../components/NavigationBar';

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
    <div className="relative h-full">
      <div className="rounded-3xl">
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
      </div>
      <NavigationBar />
    </div>
  );
};
