// interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// export const KakaoLogin = ({ ...props }: Props) => {
//   return (
//     <button
//       className="block h-[2.813rem] w-[18.75rem] bg-cover bg-center bg-no-repeat"
//       {...props}
//       style={{
//         backgroundImage: 'url(/src/assets/images/kakao-login.png)',
//       }}
//     />
//   );
// };

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const KakaoLogin = ({ ...props }: Props) => {
  return (
    <a
      href="https://api.sumbisori.site/api/oauth2/authorization/kakao"
      className="block h-[2.813rem] w-[18.75rem] bg-cover bg-center bg-no-repeat"
      {...props}
      style={{
        backgroundImage: 'url(/src/assets/images/kakao-login.svg)',
      }}
    />
  );
};
