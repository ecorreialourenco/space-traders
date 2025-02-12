export const formatCredits = (credits: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).format(credits);
