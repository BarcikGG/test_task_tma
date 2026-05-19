/**
 * Format a number with comma thousands separator: 26031 → "26,031"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value)
}

/**
 * Format a number with currency suffix: 583.93 → "583.93 TON"
 */
export function formatTON(value: number, currency = 'TON'): string {
  return `${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currency}`
}

/**
 * Format a large number with K/M suffix: 148320 → "148.32K"
 */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(2)}M`
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(2)}K`
  }
  return value.toString()
}

/**
 * European number format: 2000.75 → "2.000,75"
 * (period = thousands separator, comma = decimal separator)
 */
export function formatEuropean(value: number): string {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

/** Editable value without thousand separators: 2000.75 → "2000,75" */
export function toEditableEuropean(value: number): string {
  const [intPart, fracPart] = value.toString().split('.')
  return fracPart !== undefined ? `${intPart},${fracPart}` : intPart
}

/** Parse European or plain decimal input into a number */
export function parseEuropeanInput(value: string): number | null {
  const trimmed = value.trim().replace(/\s/g, '')
  if (!trimmed) return null

  if (trimmed.includes(',')) {
    const normalized = trimmed.replace(/\./g, '').replace(',', '.')
    const parsed = parseFloat(normalized)
    return Number.isFinite(parsed) ? parsed : null
  }

  const dotCount = (trimmed.match(/\./g) ?? []).length
  if (dotCount > 1) {
    const parsed = parseFloat(trimmed.replace(/\./g, ''))
    return Number.isFinite(parsed) ? parsed : null
  }

  const parsed = parseFloat(trimmed)
  return Number.isFinite(parsed) ? parsed : null
}

/** Allow digits and European/US decimal separators while typing */
export function isPartialEuropeanInput(value: string): boolean {
  return value === '' || /^[\d.,]*$/.test(value)
}

/**
 * Format points: 26031 → "26,031 Points"
 */
export function formatPoints(value: number): string {
  return `${formatNumber(value)} Points`
}
