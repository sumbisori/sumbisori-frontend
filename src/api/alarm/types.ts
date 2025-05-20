export interface AlarmListRequest {
  page: number;
  size: number;
}

export interface Alarm {
  alarmId: number;
  type: 'BADGE_ACQUIRED' | 'EXPERIENCE_COMPLETED';
  content: string;
  link: string;
  isRead: boolean;
  createdAt: string;
}
