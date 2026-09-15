# Radar B3 — Web

React + Vite implementation of the **Web lane** of the `Claude-Transition` page in
[Radar B3 PRD Carbon](https://www.figma.com/design/kD1fOx6Y9FTJlff2aqnZZx/Radar-B3-PRD-Carbon?node-id=43-4297)
(`43:4297`), built from the Code Connect mappings published to that file. The six Mobile frames
on the same page are out of scope.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
```

## The six frames

Each frame is a reachable state, not a fixed screen — the watchlist is real state, so removing
every ticker reveals onboarding and adding one from search puts it in the table.

| Frame | Node | Route / state |
|---|---|---|
| Web / Watchlist / Populated | `43:4298` | `/` |
| Web / Watchlist / Empty (onboarding) | `43:4313` | `/` with an empty list |
| Web / Add / Search / Initial prompt | `43:4356` | `/adicionar`, empty query |
| Web / Add / Search / Results | `43:4319` | `/adicionar`, query typed |
| Web / Stock detail / Populated | `43:4380` | `/acao/PETR4` |
| Web / Stock detail / Empty (no news) | `43:4422` | `/acao/WEGE3` |

## Code Connect coverage

Components below came from the mappings Figma returned for this file; each resolves to
`@carbon/react`, and the mapped component is used rather than a hand-rolled equivalent.

| Figma node | Component | Mapped props |
|---|---|---|
| `UI shell - Header` `43:4299` | `HeaderContainer` / `Header` / `HeaderName` / `SkipToContent` | — |
| `Button` `43:4303`, `43:4318` | `Button` | `kind="primary" size="lg"` |
| `Button` `43:4349`, `43:4355` | `Button` | `kind="tertiary" size="sm"` |
| `Button` `43:4343` | `Button` | `kind="tertiary" size="sm" disabled` |
| `Button` `43:4404` | `Button` | `kind="danger--tertiary" size="md"` |
| `Col 1`–`Col 5` in `43:4305` | `TableHeader` | — |
| `Row — *` `43:4306`–`43:4311` | `TableRow` / `TableCell` | — |
| `Overflow` `43:4312` | `OverflowMenu` / `OverflowMenuItem` | `size="md" flipped` |
| `Search - Default` `43:4336`, `43:4373` | `Search` | `size="lg"` |
| `Link` `43:4407`, `4411`, `4415`, `4419` | `Link` | `size="lg" renderIcon={ArrowRight}` |

**Not mapped**, bound by token instead:

- `Form modal - Default` `43:4334` → `ComposedModal` / `ModalHeader` / `ModalBody`.
- `Quick add chips` `43:4375` → `OperationalTag` (`type="blue" size="md"`), matching the
  `tag-background` / `tag-border-operational` / `tag-color` trio the frame binds, and their
  `*-disabled` counterparts.

**Icons** come from `@carbon/icons-react` (`ArrowRight`, `OverflowMenuVertical`, `Close`) — the
same source vectors Figma exported for those nodes, so the glyphs match without committing asset
URLs that expire after ~7 days. Note `Back` (`43:4383`) is a layer *name*: it carries Carbon's
20px **Close** path, so it renders as `Close` labelled for what it does.

## Design-system gaps

Three things the design needs that the Carbon Valma library does not publish. Each is recorded
rather than worked around silently:

1. **No price-direction token.** There is no shared up/down pair, so the frames bind
   `support-success` / `support-error`. `PriceChange` mirrors that exactly.
2. **No fixed productive type tokens.** `body-01`, `heading-compact-01`, `label-01` and friends
   exist as styles in the frames but not as variables. The app uses Carbon's Sass `type-style()`
   mixins so type still traces to the system. The fluid editorial tokens are deliberately *not*
   substituted — they are breakpoint-driven and would change rendered sizes per viewport.
3. **Two literal layout values**, both read off frames and commented as such: the 880px news
   column (`43:4405`) and the 10px `Spacer` (`43:4403`).

## Where @carbon/react diverges from the Figma components

Each of these is an intentional override in `src/styles/_app.scss`:

- **Row heights.** Valma's `cell-specs/bottom-padding` is 30px, but Carbon also paints a 1px row
  divider that counts toward the border box. 29px puts rows on the frame's exact pitch —
  `16 + 18 + 29 + 1 = 64` single-line, `16 + 52 + 29 + 1 = 98` with a two-line headline plus its
  meta line. Carbon's stock `xl` padding (16/16) stops at 84px.
- **`tbody` background.** Carbon paints it `$layer` (#f4f4f4); the Valma table leaves rows
  transparent, so the frames read white.
- **`OverflowMenu` wrapper.** `className` lands on the inner button while the static
  `cds--overflow-menu__wrapper` span stays in flow, adding ~18px per row. It is wrapped in an own
  absolutely-positioned span instead.
- **Modal width.** Carbon modal sizes are percentages: at the `xlg` breakpoint `md` ≈ 691px and
  `lg` ≈ 1037px. The Figma instance is a hand-resized 671px, i.e. `md` — not the `lg` its variant
  name implies — so the container is capped to 671px.
- **Layer inside the modal.** `ComposedModal` bumps the layer, so `Search` would render `field-02`
  (white) where the frame shows `field-01` (#f4f4f4). `<Layer level={0}>` restores it.
- **Font loading.** Carbon is compiled with `$css--font-face: false`; its own `@font-face` points
  at `~@ibm/plex`, a webpack path Vite cannot resolve. IBM Plex Sans is loaded from `index.html`.

## Motion

**Figma defines no motion for this page** — `get_motion_context` returns no animated nodes, and
the prototype links carry no transition. The screen transition is therefore authored from Carbon's
own tokens: `$duration-moderate-01` (150ms) on `motion(standard, productive)`. `/` and
`/adicionar` share a transition key so opening the modal does not re-animate the table behind it.
Both the screen transition and Carbon's modal transition are disabled under
`prefers-reduced-motion: reduce`.

## Deviations from the static frames

- **Freshness.** The frames carry the literal placeholder `atualizado há…`. This app computes a
  real relative time from a session timestamp seeded two minutes back.
- **Search matching.** The frame's query "a" returns exactly VALE3, ABEV3 and BBAS3 — the tickers
  containing an "a". A plain substring match on company names would also pull in Petrobras, Itaú,
  Banco do Brasil and Magazine Luiza, so company matching is by *word prefix*. This reproduces the
  frame's result set while keeping the placeholder's promise ("por ticker ou empresa") honest.
- **Quick-add chip state.** The frame marks only PETR4 and VALE3 as "adicionada" even though ITUB4
  is also in the table behind it. The app derives chip state from the real watchlist, so ITUB4
  shows as added too.
- **Hover and open states.** Frame `43:4298` bakes in a hovered row with its menu open; here those
  are real interaction states.
