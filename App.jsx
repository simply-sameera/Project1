import { Routes, Route } from 'react-router-dom';
import HotelListPage from './pages/HotelListPage.jsx';
import HotelDetailPage from './pages/HotelDetailPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HotelListPage />} />
          <Route path="/hotel/:id" element={<HotelDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}