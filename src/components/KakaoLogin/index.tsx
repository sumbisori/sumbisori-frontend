// interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// export const KakaoLogin = ({ ...props }: Props) => {
//   return (
//     <button
//       className="block h-[45px] w-[183px] bg-cover bg-center bg-no-repeat"
//       {...props}
//       style={{
//         backgroundImage: 'url(/images/kakao-login.png)',
//       }}
//     />
//   );
// };

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const KakaoLogin = ({ ...props }: Props) => {
  return (
    <a
      href="https://k1ec344612739a.user-app.krampoline.com/api/oauth2/authorization/kakao"
      className="block h-[45px] w-[183px] bg-cover bg-center bg-no-repeat"
      {...props}
      style={{
        backgroundImage: 'url(/images/kakao-login.png)',
      }}
    />
  );
};
