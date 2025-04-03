export const parseCompanionType = (type: string) => {
  switch (type) {
    case 'ALONE':
      return '혼자';
    case 'FRIEND':
      return '친구';
    case 'LOVER':
      return '연인';
    case 'FAMILY':
      return '가족';
    case 'COLLEAGUE':
      return '직장동료';
    case 'RELATIVE':
      return '친척';
    default:
      return '-';
  }
};
