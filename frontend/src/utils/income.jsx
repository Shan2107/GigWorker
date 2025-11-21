const INCOME_STORAGE_KEY = 'gigworker_income_entries'

/**
 * @typedef {Object} IncomeEntry
 * @property {string} id
 * @property {string} date       // ISO "YYYY-MM-DD"
 * @property {string} source
 * @property {string} description
 * @property {number} amount
 */

/**
 * Load saved income entries from localStorage.
 * @returns {IncomeEntry[]}
 */
export function loadIncomeEntries() {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(INCOME_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

/**
 * Save income entries to localStorage.
 * @param {IncomeEntry[]} entries
 */
export function saveIncomeEntries(entries) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(INCOME_STORAGE_KEY, JSON.stringify(entries))
  } catch {
    // ignore storage errors
  }
}

/**
 * Calculate summary stats for income entries (front‑end only).
 * @param {IncomeEntry[]} entries
 */
export function calculateIncomeStats(entries) {
  const count = entries.length
  const total = entries.reduce((sum, e) => sum + (Number(e.amount) || 0), 0)

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  const thisMonthTotal = entries.reduce((sum, e) => {
    const d = new Date(e.date)
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      return sum + (Number(e.amount) || 0)
    }
    return sum
  }, 0)

  const average = count > 0 ? total / count : 0

  return { count, total, thisMonthTotal, average }
}