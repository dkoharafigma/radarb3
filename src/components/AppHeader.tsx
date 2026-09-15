import { Header, HeaderContainer, HeaderName, SkipToContent } from '@carbon/react';
import { useNavigate } from 'react-router-dom';
import { copy } from '../data/copy';

/**
 * `UI shell - Header` (43:4299). Code Connect maps this node to
 * `HeaderContainer > Header > SkipToContent + HeaderName`.
 *
 * The snippet also carries an empty `HeaderNavigation` and `HeaderGlobalBar` labelled
 * "IBM [Platform]" — Carbon's own example placeholders. The frame shows the product name
 * alone, so they are omitted rather than shipped with placeholder labels.
 *
 * `prefix=""` because `HeaderName` otherwise renders Carbon's default "IBM" prefix.
 * Carbon's `.cds--header` is already 48px tall on `$background` with a `$border-subtle`
 * bottom edge — exactly the shell the frames show — so no extra styling is needed.
 */
export function AppHeader() {
  const navigate = useNavigate();

  return (
    <HeaderContainer
      render={() => (
        <Header aria-label={copy.siteName}>
          <SkipToContent />
          <HeaderName
            href="/"
            prefix=""
            onClick={(event: React.MouseEvent) => {
              event.preventDefault();
              navigate('/');
            }}
          >
            {copy.siteName}
          </HeaderName>
        </Header>
      )}
    />
  );
}
