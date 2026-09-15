import { Close } from '@carbon/icons-react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { NewsList } from '../components/NewsList';
import { PriceSummaryBand } from '../components/PriceSummaryBand';
import { copy } from '../data/copy';
import { newsFor } from '../data/news';
import { findStock } from '../data/stocks';
import { useWatchlist } from '../store/WatchlistContext';

/**
 * `Web / Stock detail / Populated` (43:4382) and `Web / Stock detail / Empty (no news)`
 * (43:4424). Which one renders depends on whether the ticker has news — WEGE3 does not.
 */
export function StockDetailScreen() {
  const { ticker = '' } = useParams();
  const navigate = useNavigate();
  const { remove, updatedAt } = useWatchlist();

  const stock = findStock(ticker);
  if (!stock) {
    return <Navigate to="/" replace />;
  }

  const handleRemove = () => {
    remove(stock.ticker);
    navigate('/');
  };

  return (
    <div className="rb-detail">
      {/*
        `Back` (43:4383). The layer is named Back but carries Carbon's 20px Close glyph, so it
        renders as Close with a label describing what it actually does.
      */}
      <button
        type="button"
        className="rb-back"
        aria-label={copy.backToWatchlist}
        onClick={() => navigate('/')}
      >
        <Close size={20} />
      </button>

      <PriceSummaryBand stock={stock} updatedAt={updatedAt} onRemove={handleRemove} />
      <NewsList items={newsFor(stock.ticker)} ticker={stock.ticker} />
    </div>
  );
}
