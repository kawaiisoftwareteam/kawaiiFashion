/**
 * Currency utility for Kawaii Mart
 * Converts base USD pricing to Bangladeshi Taka (BDT)
 * Standard exchange rate: 1 USD = 120 BDT
 */

export const USD_TO_BDT_RATE = 120;
export const FREE_SHIPPING_THRESHOLD_BDT = 5000; // Free delivery over BDT 5,000
export const STANDARD_SHIPPING_BDT = 120; // Standard inside BD delivery fee

/** Convert USD numeric amount to BDT numeric amount */
export function toBDT(usdAmount: number): number {
  if (typeof usdAmount !== "number" || isNaN(usdAmount)) return 0;
  return Math.round(usdAmount * USD_TO_BDT_RATE);
}

/** Format USD amount to display string in BDT (e.g. BDT 4,320) */
export function formatPrice(usdAmount: number): string {
  const bdt = toBDT(usdAmount);
  return `BDT ${bdt.toLocaleString("en-US")}`;
}

/** Format already-converted BDT amount to display string */
export function formatBDTRaw(bdtAmount: number): string {
  if (typeof bdtAmount !== "number" || isNaN(bdtAmount)) return "BDT 0";
  return `BDT ${Math.round(bdtAmount).toLocaleString("en-US")}`;
}

/** Taka symbol formatted price (e.g. ৳4,320) if needed */
export function formatPriceWithSymbol(usdAmount: number): string {
  const bdt = toBDT(usdAmount);
  return `৳${bdt.toLocaleString("en-US")}`;
}

