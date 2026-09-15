import { useState } from 'react';
import {
  Button,
  ComposedModal,
  Layer,
  ModalBody,
  ModalHeader,
  Search,
} from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { copy } from '../data/copy';
import { searchCatalog } from '../data/stocks';
import { formatPrice } from '../lib/format';
import { useWatchlist } from '../store/WatchlistContext';
import { QuickAddChips } from './QuickAddChips';

/**
 * `Form modal - Default` (43:4334) plus its two body states:
 *   - empty query   → `Modal body — initial prompt` (43:4372): guidance + quick-add chips
 *   - typed query   → `Modal body — search` (43:4335): result rows
 *
 * Three Carbon divergences are handled here:
 *   - Modal widths are percentages, not px. At the xlg breakpoint `md` ≈ 691px and `lg`
 *     ≈ 1037px, so the hand-resized 671px instance matches `md` — not the `lg` its variant
 *     name implies. `_app.scss` pins the container to 671px to land on the frame exactly.
 *   - `ComposedModal` bumps the layer, so `Search` would render `field-02` (white) where the
 *     frame shows `field-01` (#f4f4f4). `<Layer level={0}>` restores it.
 *   - `ModalHeader`'s close-button label is `iconDescription`; `closeModal` is a handler.
 */
export function AddStockModal() {
  const navigate = useNavigate();
  const { add, isAdded } = useWatchlist();
  const [query, setQuery] = useState('');

  const close = () => navigate('/');
  const results = searchCatalog(query);
  const hasQuery = query.trim().length > 0;

  return (
    <ComposedModal
      open
      size="md"
      className="rb-modal"
      onClose={close}
      aria-label={copy.modal.title}
      // Carbon otherwise focuses the close button on open, which pops its "Fechar" tooltip
      // over the header. The frame shows a clean header and an active search field.
      selectorPrimaryFocus=".cds--search-input"
    >
      <ModalHeader title={copy.modal.title} iconDescription={copy.modal.close} />
      <ModalBody>
        <Layer level={0}>
          <div className={`rb-modal-body${hasQuery ? ' rb-modal-body--results' : ''}`}>
            <Search
              size="lg"
              value={query}
              labelText={copy.modal.searchLabel}
              placeholder={copy.modal.searchPlaceholder}
              closeButtonLabelText={copy.modal.close}
              onChange={(event) => setQuery(event.target.value)}
              onClear={() => setQuery('')}
            />

            {hasQuery ? (
              <div className="rb-results">
                {results.length === 0 ? (
                  <p className="rb-results__none">{copy.modal.noResults}</p>
                ) : (
                  results.map((stock) => {
                    const added = isAdded(stock.ticker);

                    return (
                      <div className="rb-result" key={stock.ticker}>
                        <div className="rb-result__identity">
                          <span className="rb-result__ticker">{stock.ticker}</span>
                          <span className="rb-result__company">{stock.company}</span>
                        </div>
                        <span className="rb-result__price">{formatPrice(stock.price)}</span>
                        <Button
                          kind="tertiary"
                          size="sm"
                          disabled={added}
                          onClick={() => add(stock.ticker)}
                        >
                          {added ? copy.modal.added : copy.modal.add}
                        </Button>
                      </div>
                    );
                  })
                )}
              </div>
            ) : (
              <>
                <p className="rb-search-guidance">{copy.modal.guidance}</p>
                <QuickAddChips isAdded={isAdded} onAdd={add} />
              </>
            )}
          </div>
        </Layer>
      </ModalBody>
    </ComposedModal>
  );
}
