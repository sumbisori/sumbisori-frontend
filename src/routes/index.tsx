import { Home } from '@/pages/Home';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from '@/pages/Login';
import MainLayout from '@/layouts/MainLayout';
import { HaenyeoPlaces } from '@/pages/HaenyeoPlaces';
import { Dictionary } from '@/pages/Dictionary';
import { MyPage } from '@/pages/MyPage';
import { Journals } from '@/pages/Journals';
import { MobileLayout } from '@/layouts/MobileLayout';
import ScrollToTop from './src/ScrollToTop';
import { HaenyeoPlacesDetail } from '@/pages/HaenyeoPlacesDetail';
import { ErrorPage } from '@/pages/ErrorPage';
import { routes } from './src/routes';
import { JournalCreate } from '@/pages/JournalCreate';
import { JournalDetail } from '@/pages/JournalDetail';

export const Router = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MobileLayout />}>
          <Route path={routes.login} element={<Login />} />
          {/* Nav 와 Header 보유 */}
          <Route element={<MainLayout />}>
            <Route
              path={routes.default}
              element={<Navigate to={routes.home} />}
            />
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.haenyeoPlaces} element={<HaenyeoPlaces />} />
            <Route path={routes.dictionary} element={<Dictionary />} />
            <Route path={routes.myPage} element={<MyPage />} />
          </Route>
          {/* Nav 보유 Header 미보유 */}
          <Route element={<MainLayout hasHeader={false} />}>
            <Route
              path={routes.haenyeoPlacesDetail(':placeId')}
              element={<HaenyeoPlacesDetail />}
            />
            <Route path={routes.journals} element={<Journals />} />
            <Route
              path={routes.journalsDetail(':journalId')}
              element={<JournalDetail />}
            />
          </Route>
          {/* Nav 미보유 Header 보유 */}
          <Route element={<MainLayout hasNavigation={false} />}></Route>
          {/* Nav 미보유 Header 보유 */}
          <Route
            element={<MainLayout hasHeader={false} hasNavigation={false} />}
          >
            <Route
              path={routes.journalCreate(':step')}
              element={<JournalCreate />}
            />
          </Route>
          {/* 에러 페이지 */}
          <Route path="*" element={<ErrorPage type="not-found" />} />
        </Route>
      </Routes>
    </>
  );
};
