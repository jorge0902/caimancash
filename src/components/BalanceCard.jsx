import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getSourceCurrencyInfo } from '../config/exchangeRates';

const BalanceCard = ({ currency = 'AED' }) => {
    const currencyInfo = getSourceCurrencyInfo(currency);
    const currencySymbols = {
        AED: 'د.إ',
        RUB: '₽'
    };
    const symbol = currencySymbols[currency] || '';

    return (
        <div className="bg-secondary rounded-3xl shadow-sm border border-border p-5 flex items-center justify-between gap-4 max-w-lg mx-auto w-full mb-6 transition-colors duration-300">
            <div className="text-left">
                <p className="text-sm text-text-main/70 font-medium mb-1">Saldo disponible:</p>
                <h2 className="text-2xl font-bold text-text-main tracking-tight">
                    {symbol} 0.00
                </h2>
            </div>

            <Link to="/recharge" className="bg-background border border-border hover:bg-secondary/80 text-text-main px-4 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-sm active:scale-95 text-sm">
                <Plus className="w-5 h-5" />
                Añadir saldo
            </Link>
        </div>
    );
};

export default BalanceCard;