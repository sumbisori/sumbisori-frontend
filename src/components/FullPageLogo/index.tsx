import { motion } from 'framer-motion';

export const FullPageLogo = () => {
  return (
    <div className="absolute bottom-0 left-0 hidden flex-col p-3 lg:block">
      <motion.div
        initial={{ y: 50, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          duration: 0.8,
          bounce: 0.4,
          delay: 0.3,
        }}
        className="h-[100px] w-[470px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/icons/sumbisori_logo_width_white.svg)',
        }}
      />
      <div className="mt-3 text-caption text-gray-800">
        [숨비소리] : 해녀가 잠수했다가 물에 떠오를 때, 숨을 내뱉는 소리
      </div>
    </div>
  );
};
