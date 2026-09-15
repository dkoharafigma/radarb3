import { OperationalTag } from '@carbon/react';
import { quickAddTickers } from '../data/stocks';

/**
 * `Quick add chips` (43:4375).
 *
 * Not covered by Code Connect, so it is bound by token instead: the available chips render
 * `tag-background` (#d0e2ff) / `tag-border-operational` (#78a9ff) / `tag-color` (#0043ce),
 * and the already-added ones the matching `*-disabled` trio. That is Carbon's blue
 * `OperationalTag` in its default and disabled states. `size="md"` gives the 24px height the
 * frame shows.
 */
export function QuickAddChips({
  isAdded,
  onAdd,
}: {
  isAdded: (ticker: string) => boolean;
  onAdd: (ticker: string) => void;
}) {
  return (
    <div className="rb-chips">
      {quickAddTickers.map((ticker) => {
        const added = isAdded(ticker);

        return (
          <OperationalTag
            key={ticker}
            type="blue"
            size="md"
            text={ticker}
            disabled={added}
            onClick={() => onAdd(ticker)}
          />
        );
      })}
    </div>
  );
}
