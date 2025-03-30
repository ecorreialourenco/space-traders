export const formatCredits = (credits: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).format(credits);

export const formatSimpleCredits = (credits: number) =>
  new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0,
  }).format(credits);
