import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { AddStockModal } from './components/AddStockModal';
import { ScreenTransition } from './components/ScreenTransition';
import { StockDetailScreen } from './screens/StockDetailScreen';
import { WatchlistScreen } from './screens/WatchlistScreen';

export function App() {
  const { pathname } = useLocation();

  // `Web / Add / Search / *` (43:4319, 43:4356) show the full watchlist behind the overlay, so
  // `/adicionar` renders the watchlist screen and layers the modal over it rather than
  // replacing it.
  const addModalOpen = pathname === '/adicionar';

  return (
    <>
      <AppHeader />
      <main className="rb-main">
        <ScreenTransition>
          <Routes>
            <Route path="/" element={<WatchlistScreen />} />
            <Route path="/adicionar" element={<WatchlistScreen />} />
            <Route path="/acao/:ticker" element={<StockDetailScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ScreenTransition>
      </main>
      {addModalOpen ? <AddStockModal /> : null}
    </>
  );
}
