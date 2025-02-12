import { Home } from '@/pages/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Login';
import MainLayout from '@/layouts/MainLayout';
import { HaenyeoPlaces } from '@/pages/HaenyeoPlaces';
import { Dictionary } from '@/pages/Dictionary';
import { MyPage } from '@/pages/MyPage';
import { MyPageReservation } from '@/pages/MyPageReservation';
import { DictionaryRegistration } from '@/pages/DictionaryRegistration';
import { DictionaryConfirm } from '@/pages/DictionaryConfirm';
import { MobileLayout } from '@/layouts/MobileLayout';
import ScrollToTop from './ScrollToTop';
import { HaenyeoPlacesDetail } from '@/pages/HaenyeoPlacesDetail';
import { NotFound } from '@/pages/NotFound';

export const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path="/login" element={<Login />} />
          {/* Nav 와 Header 보유 */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/haenyeo-places" element={<HaenyeoPlaces />} />

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
          {/* Nav 보유 Header 미보유 */}
          <Route element={<MainLayout hasHeader={false} />}>
            <Route
              path="/haenyeo-places/:placeId"
              element={<HaenyeoPlacesDetail />}
            />
          </Route>
          {/* Nav 미보유 Header 보유 */}
          <Route element={<MainLayout hasNavigation={false} />}></Route>
          {/* Nav 미보유 Header 보유 */}
          <Route
            element={<MainLayout hasHeader={false} hasNavigation={false} />}
          >
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};
