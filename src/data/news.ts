/**
 * Headlines, snippets and sources transcribed from `News list` (43:4405) on
 * `Web / Stock detail / Populated`, and from the `Última notícia` cell of each watchlist row.
 *
 * WEGE3 is deliberately absent: `Web / Stock detail / Empty (no news)` (43:4422) and the WEGE3
 * watchlist row (43:4311) are the no-news state.
 */

export type NewsItem = {
  headline: string;
  /** Shown on the detail screen only; the watchlist cell is headline + source. */
  snippet: string;
  source: string;
  /** Pre-formatted relative age, exactly as the frames word it. */
  age: string;
  url: string;
};

export const newsByTicker: Record<string, NewsItem[]> = {
  PETR4: [
    {
      headline: 'Petrobras anuncia novo plano de investimentos para o pré-sal',
      snippet:
        'A estatal detalhou os aportes previstos para os próximos cinco anos, com foco na exploração do pré-sal.',
      source: 'InfoMoney',
      age: 'há 2 h',
      url: '#',
    },
    {
      headline: 'Produção de petróleo da Petrobras supera meta do trimestre',
      snippet:
        'O volume extraído ficou acima da projeção divulgada ao mercado no início do período.',
      source: 'Valor Econômico',
      age: 'há 5 h',
      url: '#',
    },
    {
      headline: 'Petrobras conclui venda de ativos de refino no Nordeste',
      snippet:
        'A operação faz parte do programa de desinvestimentos da companhia anunciado no ano passado.',
      source: 'Reuters Brasil',
      age: 'ontem',
      url: '#',
    },
    {
      headline: 'Analistas revisam preço-alvo de PETR4 após balanço',
      snippet:
        'Casas de análise ajustaram suas projeções depois dos resultados divulgados no trimestre.',
      source: 'Exame',
      age: 'ontem',
      url: '#',
    },
  ],
  VALE3: [
    {
      headline: 'Minério de ferro recua na China e pressiona a Vale',
      snippet:
        'A queda na demanda siderúrgica chinesa voltou a pesar sobre as cotações da commodity.',
      source: 'Valor Econômico',
      age: 'há 4 h',
      url: '#',
    },
  ],
  ITUB4: [
    {
      headline: 'Itaú eleva projeção de crédito para o próximo ano',
      snippet:
        'O banco revisou para cima a expectativa de crescimento da carteira de crédito.',
      source: 'Exame',
      age: 'ontem',
      url: '#',
    },
  ],
  BBAS3: [
    {
      headline: 'Banco do Brasil aprova distribuição de dividendos',
      snippet:
        'O conselho aprovou o pagamento aos acionistas com base no resultado do último trimestre.',
      source: 'InfoMoney',
      age: 'há 8 h',
      url: '#',
    },
  ],
  MGLU3: [
    {
      headline: 'Magazine Luiza reduz prejuízo no trimestre',
      snippet:
        'A varejista apresentou melhora de margem e corte de despesas no período.',
      source: 'Estadão',
      age: 'ontem',
      url: '#',
    },
  ],
};

export function newsFor(ticker: string): NewsItem[] {
  return newsByTicker[ticker.toUpperCase()] ?? [];
}

export function latestNewsFor(ticker: string): NewsItem | undefined {
  return newsFor(ticker)[0];
}
