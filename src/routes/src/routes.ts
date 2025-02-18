export const routes = {
  /**
   * "/"
   * 기본 경로
   */
  default: '/',
  /**
   * "/login"
   * 로그인 페이지
   */
  login: '/login',
  /**
   * "/home"
   * 홈 페이지
   */
  home: '/home',
  /**
   * "/haenyeo-places"
   * 해녀체험장 지도 페이지
   */
  haenyeoPlaces: '/haenyeo-places',
  /**
   * "/haenyeo-places/:placeId"
   * 해녀체험장 상세 페이지
   */
  haenyeoPlacesDetail: (placeId: number | ':placeId') =>
    `/haenyeo-places/${placeId}`,
  /**
   * "/dictionary"
   * 물질도감
   */
  dictionary: '/dictionary',
  /**
   * "/my-page"
   * 마이 페이지
   */
  myPage: '/my-page',
  /**
   * "/my-page/reservation"
   * 마이 페이지 예약정보 조회
   */
  myPageReservation: '/my-page/reservation',
  /**
   * "/journal/create/:step"
   * 체험 일지 작성 페이지
   */
  journalCreate: (step: ':step' | 'calendar') => `/journal/create/${step}`,
};
