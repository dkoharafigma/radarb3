import { Link } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { copy } from '../data/copy';
import type { NewsItem } from '../data/news';

/**
 * `News list` (43:4405). Code Connect maps each headline node to
 * `<Link renderIcon={ArrowRight} size="lg" href="#">`.
 *
 * `ArrowRight` comes from `@carbon/icons-react` — the same source vectors Figma exported for
 * these nodes, so the glyph matches exactly without committing an asset URL that expires.
 */
export function NewsList({ items, ticker }: { items: NewsItem[]; ticker: string }) {
  if (items.length === 0) {
    return (
      <div className="rb-no-news">
        <h2 className="rb-no-news__heading">{copy.noNews.heading(ticker)}</h2>
        <p className="rb-no-news__supporting">{copy.noNews.supporting}</p>
      </div>
    );
  }

  return (
    <div className="rb-news-list">
      {items.map((item) => (
        <article className="rb-news" key={item.headline}>
          <Link href={item.url} size="lg" renderIcon={ArrowRight}>
            {item.headline}
          </Link>
          <p className="rb-news__snippet">{item.snippet}</p>
          <p className="rb-news__meta">
            {item.source} · {item.age}
          </p>
        </article>
      ))}
    </div>
  );
}
