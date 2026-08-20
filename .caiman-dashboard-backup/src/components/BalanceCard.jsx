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
        <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-3xl p-6 md:p-7 max-w-3xl mx-auto w-full mb-8 transition-colors duration-300 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-caiman-slate-400 mb-2">Saldo disponible</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-caiman-slate-50 tracking-tight">
                        {symbol} 0.00
                    </h2>
                    <p className="text-xs text-caiman-slate-400 mt-2">Actualizado hace 2 minutos</p>
                </div>

                <Link to="/recharge" className="bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-caiman-mint/20 active:scale-95 text-sm">
                    <span className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Añadir saldo
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default BalanceCard;