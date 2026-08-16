// Configuración de tasas de cambio
// Valores orientativos para demo - actualizar con cotización real
export const EXCHANGE_RATES = {
  AED: {
    to: 'CUP',
    rate: 130.929,
    label: 'Emiratos Árabes Unidos (AED)',
    flag: 'uae',
    currency: 'AED',
    paymentMethods: ['Aani', 'duPay', 'IBAN']
  },
  RUB: {
    to: 'CUP',
    rate: 10.0, // 1 RUB ≈ 10 CUP
    label: 'Rusia (RUB)',
    flag: 'russia',
    currency: 'RUB',
    paymentMethods: ['T-Bank', 'SberBank', 'AlfaBank', 'BT-Bank']
  }
};

export const DESTINATION_CURRENCY = {
  code: 'CUP',
  label: 'CUP',
  flag: 'cuba'
};

// Tasa por defecto: RUB (rusia)
export const DEFAULT_SOURCE_CURRENCY = 'RUB';

// Para demo, usando valores fijos. En producción, conectar a API de tasas
export const getExchangeRate = (sourceCurrency = DEFAULT_SOURCE_CURRENCY) => {
  const rate = EXCHANGE_RATES[sourceCurrency];
  if (!rate) return null;
  return rate.rate;
};

export const getSourceCurrencyInfo = (sourceCurrency = DEFAULT_SOURCE_CURRENCY) => {
  return EXCHANGE_RATES[sourceCurrency] || EXCHANGE_RATES.RUB;
};

export const getPaymentMethods = (sourceCurrency = DEFAULT_SOURCE_CURRENCY) => {
  const info = EXCHANGE_RATES[sourceCurrency];
  return info?.paymentMethods || EXCHANGE_RATES.RUB.paymentMethods;
};