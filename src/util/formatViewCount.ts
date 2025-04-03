export const formatViewCount = (viewCount: number): string => {
  if (viewCount >= 10000) {
    // 1만 단위 이상일 때: "1만" 형식으로 반환
    return `${Math.floor(viewCount / 10000)}만`;
  } else if (viewCount >= 1000) {
    // 1000 이상일 때: "1,000" 형식으로 반환
    return viewCount.toLocaleString(); // 숫자에 콤마 추가
  }
  // 1000 미만일 때 그대로 반환
  return viewCount.toString();
};
