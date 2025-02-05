import { Home } from '@/pages/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Login';
import MainLayout from '@/layouts/MainLayout';
import { Reservation } from '@/pages/Reservation';
import { Dictionary } from '@/pages/Dictionary';
import { MyPage } from '@/pages/MyPage';
import { MyPageReservation } from '@/pages/MyPageReservation';
import { DictionaryRegistration } from '@/pages/DictionaryRegistration';
import { DictionaryConfirm } from '@/pages/DictionaryConfirm';
import { MobileLayout } from '@/layouts/MobileLayout';
import ScrollToTop from './ScrollToTop';

export const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/login" element={<Login />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/reservation" element={<Reservation />} />
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
            <Route
              path="/my-page/reservation"
              element={<MyPageReservation />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
