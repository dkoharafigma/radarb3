import { formatChangePercent } from '../lib/format';

/**
 * The `Var. %` value, e.g. `+1,82%` (43:4393).
 *
 * The Carbon Valma library publishes no dedicated price-direction token, so the frames bind
 * `support-success` / `support-error` for up and down. This mirrors them exactly; the colour
 * itself lives in `_app.scss`. See the library-gaps note in the README.
 */
export function PriceChange({ value, className }: { value: number; className?: string }) {
  const direction = value < 0 ? 'down' : 'up';

  return (
    <span className={[`rb-price-change--${direction}`, className].filter(Boolean).join(' ')}>
      {formatChangePercent(value)}
    </span>
  );
}
