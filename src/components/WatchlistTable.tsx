import {
  OverflowMenu,
  OverflowMenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@carbon/react';
import { Link } from 'react-router-dom';
import { copy } from '../data/copy';
import { latestNewsFor } from '../data/news';
import type { Stock } from '../data/stocks';
import { formatPrice } from '../lib/format';
import { PriceChange } from './PriceChange';

/**
 * `Watchlist table` (43:4304).
 *
 * Code Connect maps the individual parts — `Col 1`–`Col 5` to `TableHeader` and each
 * `Row — *` to `TableRow` + five `TableCell`s — rather than the composed `DataTable`, so this
 * uses Carbon's plain table composition.
 *
 * `size="xl"` gives the 64px header and single-line row height the frame shows; the two-line
 * news rows reach 98px via the cell padding override in `_app.scss`.
 */
export function WatchlistTable({
  stocks,
  onRemove,
}: {
  stocks: Stock[];
  onRemove: (ticker: string) => void;
}) {
  return (
    <div className="rb-watchlist">
      <TableContainer>
        <Table size="xl">
          <TableHead>
            <TableRow>
              <TableHeader>{copy.columns.ticker}</TableHeader>
              <TableHeader>{copy.columns.company}</TableHeader>
              <TableHeader>{copy.columns.price}</TableHeader>
              <TableHeader>{copy.columns.change}</TableHeader>
              <TableHeader>{copy.columns.latestNews}</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock) => {
              const news = latestNewsFor(stock.ticker);

              return (
                <TableRow key={stock.ticker}>
                  <TableCell>
                    {/*
                      The prototype makes the whole row the target for the detail screen. The
                      link stays on the ticker for sane semantics and is stretched over the row
                      with a `::after` overlay, rather than putting a role on the `<tr>`.
                    */}
                    <Link className="rb-row-link" to={`/acao/${stock.ticker}`}>
                      {stock.ticker}
                    </Link>
                  </TableCell>
                  <TableCell>{stock.company}</TableCell>
                  <TableCell>{formatPrice(stock.price)}</TableCell>
                  <TableCell>
                    <PriceChange value={stock.changePercent} />
                  </TableCell>
                  <TableCell>
                    <div className="rb-news-cell">
                      {news ? (
                        <>
                          <span>{news.headline}</span>
                          <span className="rb-news-cell__meta">
                            {news.source} · {news.age}
                          </span>
                        </>
                      ) : (
                        <span className="rb-news-cell__empty">{copy.noRecentNews}</span>
                      )}
                    </div>

                    {/*
                      Carbon wraps `OverflowMenu` in a static `cds--overflow-menu__wrapper`
                      span and puts `className` on the inner button, so positioning the menu
                      itself leaves the wrapper in flow — silently adding ~18px to every row.
                      Position this own span instead.
                    */}
                    <span className="rb-row-actions">
                      <OverflowMenu
                        size="md"
                        flipped
                        aria-label={copy.rowActions}
                        iconDescription={copy.rowActions}
                      >
                        <OverflowMenuItem
                          isDelete
                          itemText={copy.remove}
                          onClick={() => onRemove(stock.ticker)}
                        />
                      </OverflowMenu>
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
