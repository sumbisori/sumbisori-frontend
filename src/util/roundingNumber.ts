/**
 * @param num 해당하는 숫자
 * @param digit 소수점 자리수
 * @returns
 */
export function roundingNumber(num: number, digit: number) {
  return Math.round(num * Math.pow(10, digit)) / Math.pow(10, digit);
}
