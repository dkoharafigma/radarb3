/**
 * Every ticker, price and variation here is read off the Web frames on the
 * `Claude-Transition` page — `Row — *` (43:4306…43:4311) for the watchlist and
 * `Result — *` (43:4338, 43:4344, 43:4350) for the search catalog.
 */

export type Stock = {
  ticker: string;
  company: string;
  /** Last trade, in BRL. Formatted for display by `formatPrice`. */
  price: number;
  /** Day variation as a percentage. Sign drives the price-direction colour. */
  changePercent: number;
  currency: string;
  volume: number;
};

/**
 * The full set of tickers the search can offer. `Web / Add / Search / Results` (43:4319)
 * shows VALE3, ABEV3 and BBAS3 for the query "a", so ABEV3 has to exist in the catalog
 * without being on the default watchlist.
 */
export const catalog: Stock[] = [
  {
    ticker: 'PETR4',
    company: 'Petrobras PN',
    price: 61.45,
    changePercent: 1.82,
    currency: 'BRL',
    volume: 48_312_700,
  },
  {
    ticker: 'VALE3',
    company: 'Vale ON',
    price: 54.12,
    changePercent: -0.73,
    currency: 'BRL',
    volume: 31_804_200,
  },
  {
    ticker: 'ITUB4',
    company: 'Itaú Unibanco PN',
    price: 33.08,
    changePercent: 0.45,
    currency: 'BRL',
    volume: 27_115_900,
  },
  {
    ticker: 'BBAS3',
    company: 'Banco do Brasil ON',
    price: 27.64,
    changePercent: 0.91,
    currency: 'BRL',
    volume: 19_442_300,
  },
  {
    ticker: 'MGLU3',
    company: 'Magazine Luiza ON',
    price: 9.37,
    changePercent: -2.14,
    currency: 'BRL',
    volume: 52_908_100,
  },
  {
    ticker: 'WEGE3',
    company: 'WEG ON',
    price: 52.6,
    changePercent: 0.12,
    currency: 'BRL',
    volume: 11_237_600,
  },
  {
    ticker: 'ABEV3',
    company: 'Ambev ON',
    price: 13.72,
    changePercent: 0.36,
    currency: 'BRL',
    volume: 24_660_500,
  },
];

/** The six rows `Web / Watchlist / Populated` (43:4304) ships with, in frame order. */
export const defaultWatchlist = ['PETR4', 'VALE3', 'ITUB4', 'BBAS3', 'MGLU3', 'WEGE3'];

/** The four chips in `Quick add chips` (43:4375), in frame order. */
export const quickAddTickers = ['PETR4', 'VALE3', 'ITUB4', 'ABEV3'];

export function findStock(ticker: string): Stock | undefined {
  return catalog.find((stock) => stock.ticker === ticker.toUpperCase());
}

/**
 * Matches `Search - Default` (43:4336) against ticker or company name.
 *
 * The frame's query is "a" and it returns exactly VALE3, ABEV3 and BBAS3 — the three tickers
 * containing an "a". A plain substring match on the company name would also drag in Petrobras,
 * Itaú, Magazine Luiza and Banco do Brasil, so the company side matches on *word prefix*
 * instead. That reproduces the frame's result set while still honouring the placeholder's
 * promise to search "por ticker ou empresa" (e.g. "petro" finds Petrobras).
 */
export function searchCatalog(query: string): Stock[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  return catalog.filter((stock) => {
    if (stock.ticker.toLowerCase().includes(needle)) return true;
    return stock.company
      .toLowerCase()
      .split(/\s+/)
      .some((word) => word.startsWith(needle));
  });
}
