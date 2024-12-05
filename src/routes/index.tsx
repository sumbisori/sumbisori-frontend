import { Home } from '../pages/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import Mobile from '../layouts/Mobile';
import { Reservation } from '../pages/Reservation';
import { ReservationCreate } from '../pages/ReservationCreate';
import { Dictionary } from '../pages/Dictionary';
import { MyPage } from '../pages/MyPage';
import { MyPageReservation } from '../pages/MyPageReservation';
import { DictionaryRegistration } from '../pages/DictionaryRegistration';
import { DictionaryConfirm } from '../pages/DictionaryConfirm';
import { Background } from '../layouts/Background';

export const Router = () => {
  return (
    <Routes>
      <Route element={<Background />}>
        <Route path="/login" element={<Login />} />
        <Route element={<Mobile />}>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route
            path="/reservation-create/:placeValue"
            element={<ReservationCreate />}
          />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route
            path="/dictionary/registration"
            element={<DictionaryRegistration />}
          />
          <Route
            path="/dictionary/confirm/:seafood/:koreanName"
            element={<DictionaryConfirm />}
          />
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/my-page/reservation" element={<MyPageReservation />} />
        </Route>
      </Route>
    </Routes>
  );
};
