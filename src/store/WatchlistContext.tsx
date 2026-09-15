import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultWatchlist, findStock } from '../data/stocks';
import type { Stock } from '../data/stocks';

type WatchlistValue = {
  /** Tickers on the list, in insertion order — the order the table renders. */
  tickers: string[];
  stocks: Stock[];
  isAdded: (ticker: string) => boolean;
  add: (ticker: string) => void;
  remove: (ticker: string) => void;
  /** When the quotes were last refreshed. Drives the toolbar freshness string. */
  updatedAt: Date;
};

const WatchlistContext = createContext<WatchlistValue | null>(null);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [tickers, setTickers] = useState<string[]>(defaultWatchlist);
  // Fixed for the session so the freshness string is stable across renders. Seeded a couple of
  // minutes back so the toolbar reads like a real quote age — the frames carry the literal
  // placeholder `atualizado há…`.
  const [updatedAt] = useState(() => new Date(Date.now() - 2 * 60_000));

  const add = useCallback((ticker: string) => {
    const upper = ticker.toUpperCase();
    setTickers((current) => (current.includes(upper) ? current : [...current, upper]));
  }, []);

  const remove = useCallback((ticker: string) => {
    const upper = ticker.toUpperCase();
    setTickers((current) => current.filter((entry) => entry !== upper));
  }, []);

  const value = useMemo<WatchlistValue>(() => {
    const stocks = tickers
      .map((ticker) => findStock(ticker))
      .filter((stock): stock is Stock => stock !== undefined);

    return {
      tickers,
      stocks,
      isAdded: (ticker: string) => tickers.includes(ticker.toUpperCase()),
      add,
      remove,
      updatedAt,
    };
  }, [tickers, add, remove, updatedAt]);

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export function useWatchlist(): WatchlistValue {
  const value = useContext(WatchlistContext);
  if (!value) {
    throw new Error('useWatchlist must be used inside a WatchlistProvider');
  }
  return value;
}
