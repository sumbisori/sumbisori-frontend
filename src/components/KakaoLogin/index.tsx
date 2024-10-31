interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const KakaoLogin = ({ ...props }: Props) => {
  return (
    <button
      className="block h-[45px] w-[183px] bg-cover bg-center bg-no-repeat"
      {...props}
      style={{
        backgroundImage: 'url(/images/kakao-login.png)',
      }}
    />
  );
};
