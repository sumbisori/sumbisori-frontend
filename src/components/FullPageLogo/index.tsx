export const FullPageLogo = () => {
  return (
    <div className="absolute bottom-0 left-0 hidden flex-col gap-2 p-3 lg:block">
      <div
        className="h-[100px] w-[470px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/icons/sumbisori_logo_width_white.svg)',
        }}
      />
      <div className="text-caption text-gray-800">
        [숨비소리] : 해녀가 잠수했다가 물에 떠오를 때, 숨을 내뱉는 소리
      </div>
    </div>
  );
};
