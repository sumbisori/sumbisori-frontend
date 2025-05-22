import { https } from '../instance';
import { AlarmListRequest, AlarmType } from './types';
import { Pagination } from '../types';

export const getAlarmList = async (
  request: AlarmListRequest,
): Promise<Pagination<AlarmType[]>> => {
  const response = await https.get('/alarms', {
    params: request,
  });
  return response.data;
};

export const deleteAlarm = async (alarmId: number) => {
  const response = await https.delete(`/alarms/${alarmId}`);
  return response.data;
};

export const readAlarm = async (alarmId: number) => {
  const response = await https.post(`/alarms/${alarmId}`);
  return response.data;
};
