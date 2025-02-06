type SuitabilityStatus = 'SUITABLE' | 'CAUTION' | 'DANGEROUS';

export const homeTitleMessage: Record<
  SuitabilityStatus,
  Record<SuitabilityStatus, Record<SuitabilityStatus, string>>
> = {
  SUITABLE: {
    SUITABLE: {
      SUITABLE: '오늘은 물질하기 딱 좋은 날씨네요',
      CAUTION: '파도가 높으니 오늘은 물질을 자제해야 해요',
      DANGEROUS: '오늘은 물질이 위험할 수 있어요',
    },
    CAUTION: {
      SUITABLE: '오늘은 물질하기 딱 좋은 날씨네요',
      CAUTION: '파도가 높으니 오늘은 물질을 자제해야 해요',
      DANGEROUS: '오늘은 물질이 위험할 수 있어요',
    },
    DANGEROUS: {
      SUITABLE: '수온이 많이 낮아 체온 관리에 유의해주세요',
      CAUTION: '파도가 높으니 오늘은 물질을 자제해야 해요',
      DANGEROUS: '오늘은 물질이 위험할 수 있어요',
    },
  },
  CAUTION: {
    SUITABLE: {
      SUITABLE: '오늘은 물질하기 딱 좋은 날씨네요',
      CAUTION: '파도가 높으니 오늘은 물질을 자제해주세요',
      DANGEROUS: '오늘은 물질이 위험할 수 있어요',
    },
    CAUTION: {
      SUITABLE: '파도는 잔잔하니, 안전장비를 갖추고 조심스레 물질하세요',
      CAUTION: '파도가 높으니 오늘은 물질을 자제해야 해요',
      DANGEROUS: '오늘은 물질이 위험할 수 있어요',
    },
    DANGEROUS: {
      SUITABLE: '파도는 잔잔하지만, 체온 관리가 쉽지 않을 것 같아요',
      CAUTION: '파도가 높으니 오늘은 물질을 자제해주세요',
      DANGEROUS: '오늘은 물질이 위험할 수 있어요',
    },
  },
  DANGEROUS: {
    SUITABLE: {
      SUITABLE: '기상 악화로 변동이 클 수 있으니 주의하세요',
      CAUTION: '파도가 높으니, 물질을 강행하기엔 위험 부담이 커요',
      DANGEROUS: '오늘은 물질이 위험할 수 있어요',
    },
    CAUTION: {
      SUITABLE: '물질 시 체온과 기상 변화에 각별히 주의해야 해요',
      CAUTION: '가능한 한 물질을 미루는 게 좋겠어요',
      DANGEROUS: '오늘은 물질이 위험할 수 있어요',
    },
    DANGEROUS: {
      SUITABLE: '체온 저하가 우려되니 물질을 자제해야 해요',
      CAUTION: '파도가 높으니 오늘은 물질을 자제해야 해요',
      DANGEROUS: '오늘은 물질이 위험할 수 있어요',
    },
  },
};
