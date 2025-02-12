import { HomeContents } from '@/pages/Home/components/HomeContents';
import { useEffect, useState } from 'react';
import { SeafoodCollected, getSeafoodCollected } from '@/api/home';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { Aquarium } from '@/pages/Home/components/Aquarium';

export const Home = () => {
  const [seafoods, setSeafoods] = useState<SeafoodCollected[]>([]);
  const { handleError } = useErrorHandler();

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

  return (
    <div>
      <Aquarium seafoods={seafoods} />
      <HomeContents />
    </div>
  );
};
