import { Button } from '@carbon/react';
import { copy } from '../data/copy';
import type { Stock } from '../data/stocks';
import { formatFreshness, formatPrice, formatVolume } from '../lib/format';
import { PriceChange } from './PriceChange';

function Metric({
  label,
  children,
  valueClassName,
}: {
  label: string;
  children: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="rb-metric">
      <span className="rb-metric__label">{label}</span>
      <span className={['rb-metric__value', valueClassName].filter(Boolean).join(' ')}>
        {children}
      </span>
    </div>
  );
}

/**
 * `Price summary band` (43:4384) — identity, the five metrics, and the remove action.
 * Code Connect maps `Button` 43:4404 to `kind="danger--tertiary" size="md"`.
 */
export function PriceSummaryBand({
  stock,
  updatedAt,
  onRemove,
}: {
  stock: Stock;
  updatedAt: Date;
  onRemove: () => void;
}) {
  return (
    <div className="rb-price-band">
      <div className="rb-price-band__identity">
        <span className="rb-price-band__ticker">{stock.ticker}</span>
        <span className="rb-price-band__company">{stock.company}</span>
      </div>

      <Metric label={copy.metrics.price} valueClassName="rb-metric__value--lead">
        {formatPrice(stock.price)}
      </Metric>
      <Metric label={copy.metrics.change} valueClassName="rb-metric__value--lead">
        <PriceChange value={stock.changePercent} />
      </Metric>
      <Metric label={copy.metrics.currency}>{stock.currency}</Metric>
      <Metric label={copy.metrics.volume}>{formatVolume(stock.volume)}</Metric>
      <Metric label={copy.metrics.updated} valueClassName="rb-metric__value--muted">
        {formatFreshness(updatedAt)}
      </Metric>

      {/* `Spacer` (43:4403) — a literal 10px gap the designer placed before the action. */}
      <div className="rb-price-band__spacer" aria-hidden="true" />

      <Button kind="danger--tertiary" size="md" onClick={onRemove}>
        {copy.remove}
      </Button>
    </div>
  );
}
