import { useMutation } from '@tanstack/react-query';
import { getTest, getConnect, getDb } from '../../api/home';
import { useState } from 'react';
import { useModalContext } from '../../contexts/ModalContext';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';

import { Unity, useUnityContext } from 'react-unity-webgl';

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
        style={{ width: 393, height: 852 }}
      />
      <button onClick={handleClickButton}></button>
    </div>
  );
};
