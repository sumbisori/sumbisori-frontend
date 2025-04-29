export const ERROR_MESSAGE = {
  /**
   * 공통
   */
  DEFAULT_ERROR: '알 수 없는 오류가 발생했습니다',
  SIGNATURE_EXCEPTION: '올바르지 않은 접근입니다',
  /**
   * mutation  오류
   */
  INVALID_IMAGE_CONTENT_TYPE: '허용되지 않은 이미지 형식입니다',
  IMAGE_UPLOAD_FAILED: '이미지 업로드에 실패했습니다',
  IMAGE_VALIDATION_FAILED: '이미지 유효성 검사에 실패했습니다',
  MAX_PHOTO_SIZE: '이미지 파일 크기가 너무 큽니다',

  MAX_PHOTO_COUNT: '이미지는 최대 10개까지 추가할 수 있습니다',
  MAX_COLLECTED_SEAFOOD_COUNT:
    '해산물 이미지는 최대 5개까지 추가할 수 있습니다',
  // 체험일지
  EXPERIENCE_DATE_INVALID: '체험 일자를 확인해주세요',
  INVALID_FILE: '체험 이미지 파일이 유효하지 않습니다',
  PLACE_NOT_FOUND: '체험 장소를 확인해주세요',
  SEAFOOD_NOT_FOUND: '해산물 정보를 확인해주세요',
  S3_ERROR: '업로드 중 오류가 발생했습니다',
  /**
   * useQuery 클라이언트 오류
   */
  ERR_NETWORK: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요',
  AUTHENTICATION_REQUIRED: '로그인이 필요합니다',
  // 홈
  WAVE_DATA_NOT_FOUND: '해당 지역의 파도 정보를 찾을 수 없습니다',
  // 배지
  BADGE_NOT_OWNED: '소유하지 않은 배지입니다',
  BADGE_NOT_FOUND: '배지 정보를 찾을 수 없습니다',
};
