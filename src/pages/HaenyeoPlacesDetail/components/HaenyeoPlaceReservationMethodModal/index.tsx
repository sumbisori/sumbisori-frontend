import { ReservationHaenyeoPlace } from '@/api/haenyeoPlaces';
import { Dialog } from '../../../../components/Dialog';
interface Props {
  selectedPlace: ReservationHaenyeoPlace;
  onPhoneClick: (phoneNumber: string) => void;
  onLinkClick: (link: string | null) => void;
}

export const HaenyeoPlaceReservationMethodModal = ({
  selectedPlace,
  onPhoneClick,
  onLinkClick,
}: Props) => {
  return (
    <Dialog id="reservation-method" type="list">
      <div className="flex w-60 flex-col gap-6">
        <h3 className="text-center text-lg font-bold">예약방법</h3>
        <ul className="flex flex-col gap-4 text-center">
          <li>
            <button
              className="hover:text-blue-500"
              onClick={() => onPhoneClick(selectedPlace.phoneNumber)}
            >
              전화 예약
            </button>
          </li>
          {selectedPlace.reservationLink && (
            <li>
              <button
                className="hover:text-blue-500"
                onClick={() => onLinkClick(selectedPlace.reservationLink)}
              >
                예약 페이지 이동
              </button>
            </li>
          )}
        </ul>
      </div>
    </Dialog>
  );
};
