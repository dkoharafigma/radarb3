import { Button } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { copy } from '../data/copy';

/**
 * `Empty state` (43:4315) on `Web / Watchlist / Empty (onboarding)`.
 * The action is the Code Connect mapping for `Button` 43:4318 — primary, size lg.
 */
export function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="rb-onboarding">
      <h1 className="rb-onboarding__heading">{copy.onboarding.heading}</h1>
      <p className="rb-onboarding__supporting">{copy.onboarding.supporting}</p>
      <Button kind="primary" size="lg" onClick={() => navigate('/adicionar')}>
        {copy.addStock}
      </Button>
    </div>
  );
}
