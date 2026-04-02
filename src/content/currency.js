const currencyMap = {
  AED: { symbol: "د.إ", local: "AED", name: "U.A.E. Dirham" },
  ARS: { symbol: "$", local: "AR$", name: "Argentine Peso" },
  AUD: { symbol: "$", local: "A$", name: "Australian Dollar" },
  AZN: { symbol: "₼", local: "₼", name: "Azerbaijani New Manat" },
  BGN: { symbol: "лв", local: "лв", name: "Bulgarian Lev" },
  BHD: { symbol: ".د.ب", local: "BHD", name: "Bahrain Dinar" },
  BND: { symbol: "$", local: "B$", name: "Brunei Dollar" },
  BRL: { symbol: "R$", local: "R$", name: "Brazilian Real" },
  CAD: { symbol: "$", local: "C$", name: "Canadian Dollar" },
  CHF: { symbol: "CHF", local: "CHF", name: "Swiss Franc" },
  CLP: { symbol: "$", local: "CL$", name: "Chilean Peso" },
  CNY: { symbol: "¥", local: "CN¥", name: "Chinese Yuan" },
  COP: { symbol: "$", local: "COP$", name: "Colombian Peso" },
  CZK: { symbol: "Kč", local: "Kč", name: "Czech Koruna" },
  DKK: { symbol: "kr", local: "kr", name: "Danish Krone" },
  EGP: { symbol: "E£", local: "E£", name: "Egyptian Pound" },
  EUR: { symbol: "€", local: "€", name: "Euro" },
  FJD: { symbol: "$", local: "FJ$", name: "Fijian Dollar" },
  GBP: { symbol: "£", local: "£", name: "Pound Sterling" },
  GEL: { symbol: "₾", local: "₾", name: "Georgian Lari" },
  HKD: { symbol: "$", local: "HK$", name: "Hong Kong Dollar" },
  HUF: { symbol: "Ft", local: "Ft", name: "Hungarian Forint" },
  IDR: { symbol: "Rp", local: "Rp", name: "Indonesian Rupiah" },
  ILS: { symbol: "₪", local: "₪", name: "New Israeli Sheqel" },
  INR: { symbol: "₹", local: "Rs.", name: "Indian Rupee" },
  JOD: { symbol: "د.ا", local: "JOD", name: "Jordanian Dinar" },
  JPY: { symbol: "¥", local: "¥", name: "Japanese Yen" },
  KRW: { symbol: "₩", local: "₩", name: "Korean Won" },
  KWD: { symbol: "د.ك", local: "KWD", name: "Kuwaiti Dinar" },
  KZT: { symbol: "₸", local: "₸", name: "Kazakhstani Tenge" },
  MDL: { symbol: "L", local: "MDL", name: "Moldovan Leu" },
  MXN: { symbol: "$", local: "MX$", name: "Mexican Peso" },
  MYR: { symbol: "RM", local: "RM", name: "Malaysian Ringgit" },
  NAD: { symbol: "$", local: "N$", name: "Namibian Dollar" },
  NOK: { symbol: "kr", local: "kr", name: "Norwegian Krone" },
  NZD: { symbol: "$", local: "NZ$", name: "New Zealand Dollar" },
  OMR: { symbol: "ر.ع.", local: "OMR", name: "Rial Omani" },
  PEN: { symbol: "S/", local: "S/", name: "Peruvian Sol" },
  PHP: { symbol: "₱", local: "₱", name: "Philippine Peso" },
  PKR: { symbol: "₨", local: "₨", name: "Pakistan Rupee" },
  PLN: { symbol: "zł", local: "zł", name: "Polish Złoty" },
  QAR: { symbol: "ر.ق", local: "QAR", name: "Qatari Rial" },
  RON: { symbol: "lei", local: "lei", name: "Romanian Leu" },
  RUB: { symbol: "₽", local: "₽", name: "Russian Ruble" },
  SAR: { symbol: "﷼", local: "SAR", name: "Saudi Riyal" },
  SEK: { symbol: "kr", local: "kr", name: "Swedish Krona" },
  SGD: { symbol: "$", local: "S$", name: "Singaporean Dollar" },
  THB: { symbol: "฿", local: "฿", name: "Thai Baht" },
  TRY: { symbol: "₺", local: "TL", name: "Turkish Lira" },
  TWD: { symbol: "$", local: "NT$", name: "New Taiwan Dollar" },
  UAH: { symbol: "₴", local: "₴", name: "Ukrainian Hryvnia" },
  USD: { symbol: "$", local: "US$", name: "U.S. Dollar" },
  VND: { symbol: "₫", local: "₫", name: "Vietnamese Dong" },
  XOF: { symbol: "CFA", local: "CFA", name: "CFA Franc BCEAO" },
  ZAR: { symbol: "R", local: "R", name: "South African Rand" }
};

/**
 * Return Booking-style currency display text
 * @param {string} code - 3-letter currency code
 * @param {'symbol' | 'local' | 'name'} type
 * @returns {string}
 */

function getCurrencyDisplay(code, type = "local") {
  if (!code || typeof code !== "string") return "";

  const upperCode = code.trim().toUpperCase();
  const currency = currencyMap[upperCode];

  if (!currency) return upperCode;
  return currency[type] || currency.local;
}

/**
 * Return full metadata object
 * @param {string} code
 * @returns {{symbol:string, local:string, name:string, code:string} | null}
 */
function getCurrencyMeta(code) {
  if (!code || typeof code !== "string") return null;

  const upperCode = code.trim().toUpperCase();
  const currency = currencyMap[upperCode];

  if (!currency) return null;

  return {
    code: upperCode,
    ...currency
  };
}

/**
 * For hotel dropdown select list
 * Example output: [{ value: 'MYR', label: 'MYR - Malaysian Ringgit (RM)' }]
 */
function getCurrencyOptions() {
  return Object.entries(currencyMap).map(([code, info]) => ({
    value: code,
    label: `${code} - ${info.name} (${info.local})`
  }));
}