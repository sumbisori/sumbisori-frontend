export const parseWeather = (weather: string) => {
  switch (weather) {
    case 'CLEAR_SKY':
      return '맑음';
    case 'FEW_CLOUDS':
      return '구름 조금';
    case 'SCATTERED_CLOUDS':
      return '구름 낀';
    case 'BROKEN_CLOUDS':
      return '구름 많음';
    case 'SHOWER_RAIN':
      return '소나기';
    case 'RAIN':
      return '비';
    case 'THUNDERSTORM':
      return '천둥번개';
    case 'SNOW':
      return '눈';
    case 'MIST':
      return '안개';
    default:
      return '알 수 없음';
  }
};
