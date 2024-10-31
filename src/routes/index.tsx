import { Home } from '../pages/Home';
import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import Mobile from '../layouts/Mobile';
import { Reservation } from '../pages/Reservation';
import { ReservationCreate } from '../pages/ReservationCreate';
import { Dictionary } from '../pages/Dictionary';

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Mobile />}>
        <Route path="/" element={<Home />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route
          path="/reservation-create/:placeValue"
          element={<ReservationCreate />}
        />
        <Route path="/dictionary" element={<Dictionary />} />
      </Route>
    </Routes>
  );
};
