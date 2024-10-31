export const FullPageLogo = () => {
  return (
    <div
      className="absolute bottom-0 left-0 hidden h-[100px] w-[300px] bg-cover bg-center bg-no-repeat lg:block"
      style={{ backgroundImage: 'url(/logo.png)' }}
    />
  );
};
