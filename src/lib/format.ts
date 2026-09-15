const priceFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const percentFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: 'always',
});

const volumeFormatter = new Intl.NumberFormat('pt-BR');

/** `R$ 61,45` — matches the frames, which use a regular space after the symbol. */
export function formatPrice(value: number): string {
  return priceFormatter.format(value).replace(/ /g, ' ');
}

/** `+1,82%` / `-0,73%` — the sign is always shown, as in `Var. %`. */
export function formatChangePercent(value: number): string {
  return `${percentFormatter.format(value)}%`;
}

/** `48.312.700` */
export function formatVolume(value: number): string {
  return volumeFormatter.format(value);
}

/**
 * The frames carry the placeholder `atualizado há…`. This is a working app, so the string is
 * computed from the session's load time instead — see the deviations note in the README.
 */
export function formatFreshness(since: Date, now: Date = new Date()): string {
  const minutes = Math.max(0, Math.floor((now.getTime() - since.getTime()) / 60_000));
  if (minutes < 1) return 'atualizado agora';
  if (minutes === 1) return 'atualizado há 1 min';
  if (minutes < 60) return `atualizado há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return hours === 1 ? 'atualizado há 1 h' : `atualizado há ${hours} h`;
}
