import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { WatchlistTable } from '../components/WatchlistTable';
import { copy } from '../data/copy';
import { formatFreshness } from '../lib/format';
import { useWatchlist } from '../store/WatchlistContext';

/**
 * `Web / Watchlist / Populated` (43:4300) and `Web / Watchlist / Empty (onboarding)`
 * (43:4315) are the same route — which one renders depends on whether the list has entries.
 */
export function WatchlistScreen() {
  const navigate = useNavigate();
  const { stocks, remove, updatedAt } = useWatchlist();

  if (stocks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="rb-watchlist-screen">
      {/* Toolbar (43:4301) */}
      <div className="rb-toolbar">
        <p className="rb-freshness">{formatFreshness(updatedAt)}</p>
        <Button kind="primary" size="lg" onClick={() => navigate('/adicionar')}>
          {copy.addStock}
        </Button>
      </div>

      <WatchlistTable stocks={stocks} onRemove={remove} />
    </div>
  );
}
