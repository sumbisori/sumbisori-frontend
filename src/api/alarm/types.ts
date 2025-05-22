export interface AlarmListRequest {
  page: number;
  size: number;
}

export interface AlarmType {
  alarmId: number;
  type: 'BADGE_ACQUIRED' | 'EXPERIENCE_COMPLETED';
  content: string;
  link: string;
  isRead: boolean;
  createdAt: string;
}
