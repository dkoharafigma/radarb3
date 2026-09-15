/**
 * Every user-facing string, transcribed verbatim from the Web frames so the screens can be
 * diffed against Figma without hunting through JSX.
 */
export const copy = {
  siteName: 'Radar B3',

  // Toolbar (43:4301) and Price summary band (43:4384)
  addStock: 'Adicionar ação',

  // Data table header row item (43:4305)
  columns: {
    ticker: 'Ticker',
    company: 'Empresa',
    price: 'Preço',
    change: 'Var. %',
    latestNews: 'Última notícia',
  },

  // Row — WEGE3 (43:4311) and the news empty state (43:4447)
  noRecentNews: 'Sem notícias recentes',
  rowActions: 'Ações da linha',
  remove: 'Remover',

  // Empty state (43:4315)
  onboarding: {
    heading: 'Adicione as ações que você acompanha',
    supporting: 'Busque por ticker (ex.: PETR4) ou nome da empresa para começar',
  },

  // Form modal (43:4334) + Modal body (43:4335 / 43:4372)
  modal: {
    title: 'Adicionar ação',
    close: 'Fechar',
    searchPlaceholder: 'Buscar por ticker ou empresa',
    searchLabel: 'Buscar ação',
    guidance: 'Digite um ticker (ex.: PETR4) ou o nome da empresa',
    add: 'Adicionar',
    added: 'Adicionada',
    noResults: 'Nenhuma ação encontrada',
  },

  // Price summary band metric labels (43:4389…43:4401)
  metrics: {
    price: 'Preço',
    change: 'Var. %',
    currency: 'Moeda',
    volume: 'Volume',
    updated: 'Atualização',
  },

  // Back (43:4383) — the layer carries Carbon's Close glyph and returns to the watchlist.
  backToWatchlist: 'Voltar para a lista',

  // Empty state — no news (43:4447)
  noNews: {
    heading: (ticker: string) => `Sem notícias recentes para ${ticker}`,
    supporting: 'Ainda não encontramos notícias em português para este ativo.',
  },
} as const;
