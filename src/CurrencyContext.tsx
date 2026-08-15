import React, { createContext, useContext, useEffect, useState } from 'react';

type CurrencyContextType = {
  currency: string;
  setCurrency: (c: string) => void;
  rates: Record<string, number>;
  formatPrice: (usdAmount: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<string>('USD');
  const [rates, setRates] = useState<Record<string, number>>({ USD: 1 });

  useEffect(() => {
    // Fetch live exchange rates
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data && data.rates) {
          setRates(data.rates);
        }
      })
      .catch(err => console.error('Failed to fetch exchange rates', err));

    // Detect user IP and currency
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.currency) {
          // If the currency is supported by our rates or is at least a valid ISO code
          setCurrency(data.currency);
        }
      })
      .catch(err => console.error('Failed to fetch IP data', err));
  }, []);

  const formatPrice = (usdAmount: number) => {
    // If the currency isn't in our rates list for some reason, fallback to USD
    const rate = rates[currency] || 1;
    const activeCurrency = rates[currency] ? currency : 'USD';
    
    // Round to nice numbers if it's a very large conversion, 
    // but Intl.NumberFormat handles rounding. We'll stick to full numbers.
    const convertedAmount = Math.round(usdAmount * rate);

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: activeCurrency,
      maximumFractionDigits: 0,
    }).format(convertedAmount);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
