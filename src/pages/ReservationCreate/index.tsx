import { ReservationInfo } from '@/components/ReservationInfo/ReservationInfo';
import { OptionsInput } from '@/components/OptionsInput';
import { useEffect, useState } from 'react';
import { LargeButton } from '@/components/LargeButton';
import {
  PostReservation,
  ReservationHaenyeoPlace,
  getReservationHaenyeoPlace,
  postReservation,
} from '@/api/reservation';
import { useNavigate, useParams } from 'react-router-dom';
import { useModalController } from '@/contexts/ModalContext';
import { Dialog } from '@/components/Dialog';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ImageWithTextAlert } from '@/components/ImageWithTextAlert';

export const ReservationCreate = () => {
  return <div></div>;
};
