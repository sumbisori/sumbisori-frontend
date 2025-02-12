import React from 'react';

export interface Props {
  /** 추가 Tailwind 클래스들을 지정할 수 있습니다. */
  className?: string;
  /** Skeleton의 너비 (예: '100%', '200px', 숫자 입력 시 px 단위) */
  width?: string | number;
  /** Skeleton의 높이 (예: '1em', '20px', 숫자 입력 시 px 단위) */
  height?: string | number;
  /**
   * Skeleton의 모양을 지정합니다.
   * - 'text': 텍스트 라인 느낌 (기본값)
   * - 'square': 직사각형 (보통 컨텐츠 박스)
   * - 'circle': 원형 (프로필 이미지 등)
   */
  variant?: 'text' | 'square' | 'circle';
}

const Skeleton: React.FC<Props> = ({
  className = '',
  width = '100%',
  height = '1em',
  variant = 'square',
}) => {
  // 기본 Tailwind 클래스: 회색 배경과 펄스 애니메이션
  const baseClasses = 'bg-gray-300 animate-pulse';

  // variant에 따른 모양 처리
  let variantClasses = '';
  switch (variant) {
    case 'circle':
      variantClasses = 'rounded-full';
      break;
    case 'square':
      variantClasses = 'rounded';
      break;
    case 'text':
    default:
      // 텍스트 형태도 살짝 둥근 모서리로 처리 (원하는 대로 수정 가능)
      variantClasses = 'rounded';
      break;
  }

  // 숫자 입력일 경우 px 단위로 변환
  const computedWidth = typeof width === 'number' ? `${width}px` : width;
  const computedHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      className={`${baseClasses} ${variantClasses} ${className}`}
      style={{ width: computedWidth, height: computedHeight }}
    />
  );
};

export default Skeleton;
