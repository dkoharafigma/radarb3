import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Replays the screen enter animation when the route changes to a genuinely different screen.
 *
 * `/` and `/adicionar` are the same screen with a modal over it, so they share one key —
 * opening the modal must not re-animate the watchlist behind it. The animation itself is
 * Carbon `$duration-moderate-01` on the standard/productive curve; see `_app.scss`.
 *
 * Figma defines no motion for this page (no keyframes, and the prototype links carry no
 * transition), so this is authored from Carbon's motion tokens rather than imported.
 */
export function ScreenTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const screenKey = pathname.startsWith('/acao/') ? pathname : 'watchlist';

  return (
    <div className="rb-screen" key={screenKey}>
      {children}
    </div>
  );
}
