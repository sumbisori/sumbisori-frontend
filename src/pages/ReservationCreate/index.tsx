import { ReservationInfo } from '../../components/ReservationInfo/ReservationInfo';
import { Input } from '../../components/Input';
import { NumberInput } from '../../components/NumberInput';
import { OptionsInput } from '../../components/OptionsInput';
import { useState } from 'react';
import { LargeButton } from '../../components/LargeButton';

export const ReservationCreate = () => {
  const [reservationForm, setReservationForm] = useState({
    placedId: '',
    personName: '',
    selectedAvailableDate: '',
    selectedTime: '',
    peopleCount: 0,
  });
  return (
    <div className="mt-[60px]">
      <div className="p-[18px]">
        <ReservationInfo
          title="서귀포 사계어촌체험마을"
          address="안덕면 형제해안로 13-1 사계언촌게"
          price={50000}
          imageSrc="/images/example.png"
        />
      </div>
      <div className="h-[5px] w-full bg-[#F7F7FA]"></div>
      <div className="flex flex-col gap-[12px] p-[18px]">
        <Input
          id="name"
          inputLabel="예약자명"
          value={reservationForm.personName}
          onChange={(e) =>
            setReservationForm({
              ...reservationForm,
              personName: e.target.value,
            })
          }
        />
        <Input
          id="phone"
          inputLabel="전화번호"
          value={reservationForm.personName}
          onChange={(e) =>
            setReservationForm({
              ...reservationForm,
              personName: e.target.value,
            })
          }
        />
        <OptionsInput
          inputLabel="날짜"
          options={[
            '2024년 11월 11일',
            '2024년 11월 12일',
            '2024년 11월 13일',
            '2024년 11월 14일',
          ]}
          value={reservationForm.selectedAvailableDate}
          onSelectOption={(option) =>
            setReservationForm({
              ...reservationForm,
              selectedAvailableDate: option,
            })
          }
        />
        <OptionsInput
          inputLabel="날짜"
          options={['오전 09:00', '오후 12:00', '오후 03:00']}
          value={reservationForm.selectedTime}
          onSelectOption={(option) =>
            setReservationForm({
              ...reservationForm,
              selectedTime: option,
            })
          }
        />
        <NumberInput
          id="peopleCount"
          inputLabel="인원"
          value={reservationForm.peopleCount}
          onChange={(e) =>
            setReservationForm({
              ...reservationForm,
              peopleCount: Number(e.target.value),
            })
          }
        />
        <LargeButton>예약하기</LargeButton>
      </div>
    </div>
  );
};
