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
   * "/alarm"
   * 알림 페이지
   */
  alarm: '/alarm',
  /**
   * "/not-found"
   * 404 페이지
   */
  'not-found': '/not-found',
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
  myPageBadge: '/my-page/badge',
  /**
   * "/journals"
   * 체험 일지 목록 페이지
   */
  journals: '/journals',
  /**
   * "/journals/:journalId"
   * 체험 일지 상세 페이지
   */
  journalsDetail: (journalId: string) => `/journals/${journalId}`,
  /**
   * "/journal/create/:step"
   * 체험 일지 작성 페이지
   */
  journalCreate: (step: string) => `/journal/create/${step}`,
};
