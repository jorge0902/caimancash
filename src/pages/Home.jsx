import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BalanceCard from '../components/BalanceCard';
import RemittanceWidget from '../components/RemittanceWidget';
import { motion } from 'framer-motion';
import { getSourceCurrencyInfo, DEFAULT_SOURCE_CURRENCY } from '../config/exchangeRates';

const Home = () => {
    const location = useLocation();
    const [sourceCurrency, setSourceCurrency] = useState(DEFAULT_SOURCE_CURRENCY);

    // Leer parámetro de moneda desde URL (RUB por defecto)
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const currency = params.get('currency')?.toUpperCase();
        
        // Solo aceptar valores válidos
        if (currency && (currency === 'AED' || currency === 'RUB')) {
            setSourceCurrency(currency);
        } else {
            setSourceCurrency(DEFAULT_SOURCE_CURRENCY); // RUB por defecto
        }
    }, [location.search]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Top Section: Account Status */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <BalanceCard currency={sourceCurrency} />
            </motion.section>

            {/* Main Section: Widget */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center"
            >
                <RemittanceWidget sourceCurrency={sourceCurrency} />
            </motion.section>
        </div>
    );
};

export default Home;