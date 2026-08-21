import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRight, ChevronsUpDown, Banknote } from 'lucide-react';

import cubaFlag from '../assets/cuba.svg';
import usaFlag from '../assets/usa.svg';
import uaeFlag from '../assets/uae.svg';
import russiaFlag from '../assets/russia.svg';

import { getExchangeRate, getSourceCurrencyInfo, EXCHANGE_RATES } from '../config/exchangeRates';

const RemittanceWidget = ({ sourceCurrency = 'AED' }) => {
    const [sendAmount, setSendAmount] = useState(100);
    const [exchangeRate, setExchangeRate] = useState(getExchangeRate(sourceCurrency));
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

    useEffect(() => {
        const rate = getExchangeRate(sourceCurrency);
        setExchangeRate(rate);
    }, [sourceCurrency]);

    const getCurrencyOptions = () => {
        if (sourceCurrency === 'RUB') {
            return [
                { id: 'cup', code: 'CUP', label: 'CUP', flag: cubaFlag },
                { id: 'usd', code: 'USD', label: 'USD', flag: usaFlag },
            ];
        }
        return [
            { id: 'cup', code: 'CUP', label: 'CUP', flag: cubaFlag },
            { id: 'cup_cash', code: 'CUP', label: 'CUP (Efectivo)', flag: cubaFlag },
            { id: 'usd_cash', code: 'USD', label: 'USD (Efectivo)', flag: usaFlag },
            { id: 'usd_classic', code: 'USD', label: 'USD (Tarjetas Clásicas)', flag: usaFlag },
            { id: 'usd_prepaid', code: 'USD', label: 'USD (Tarjetas Prepago)', flag: usaFlag },
        ];
    };

    const currencyOptions = getCurrencyOptions();
    const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);

    const handleSendChange = (e) => {
        setSendAmount(e.target.value);
    };

    const receiveAmount = (sendAmount * exchangeRate).toFixed(2);
    const totalPayable = sendAmount;

    const currencySymbols = {
        AED: 'د.إ',
        RUB: '₽'
    };
    const symbol = currencySymbols[sourceCurrency] || '';

    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
                <div className="space-y-5">
                    <div className="relative">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-caiman-slate-400 mb-2">Tú envías</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={sendAmount}
                                onChange={handleSendChange}
                                className="w-full bg-caiman-navy-900/70 border border-caiman-navy-500/60 rounded-xl px-4 py-4 text-2xl font-bold text-caiman-slate-50 focus:outline-none focus:ring-2 focus:ring-caiman-mint/60 focus:border-caiman-mint transition-all"
                                placeholder="0.00"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-caiman-navy-800/80 px-3 py-1 rounded-lg border border-caiman-navy-500/50">
                                <img src={sourceCurrency === 'RUB' ? russiaFlag : uaeFlag} alt={sourceCurrency} className="w-5 h-auto rounded-sm" />
                                <span className="font-bold text-caiman-slate-100 text-base">{symbol} {sourceCurrency}</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-caiman-slate-400 mb-2">Ellos reciben</label>
                        <div className="relative z-20">
                            <input
                                type="number"
                                value={receiveAmount}
                                readOnly
                                className="w-full bg-caiman-navy-900/70 border border-caiman-navy-500/60 rounded-xl px-4 py-4 text-2xl font-bold text-caiman-slate-50 focus:outline-none"
                                placeholder="0.00"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <button
                                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                                    className="flex items-center gap-2 bg-caiman-navy-800/80 font-bold text-caiman-slate-100 py-1.5 pl-2 pr-2 rounded-lg border border-caiman-navy-500/50 hover:brightness-110 transition-all"
                                >
                                    <img src={selectedCurrency.flag} alt={selectedCurrency.code} className="w-5 h-auto rounded-sm" />
                                    <span className="text-base">{selectedCurrency.code}</span>
                                    <ChevronsUpDown className="w-4 h-4 text-caiman-slate-300" />
                                </button>

                                {isCurrencyOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsCurrencyOpen(false)}></div>
                                        <div className="absolute right-0 top-full mt-2 w-64 bg-caiman-navy-800/90 backdrop-blur-xl border border-caiman-navy-500/50 overflow-hidden z-30">
                                            <ul className="py-1">
                                                {currencyOptions.map((option) => (
                                                    <li key={option.id}>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedCurrency(option);
                                                                setIsCurrencyOpen(false);
                                                            }}
                                                            className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${selectedCurrency.id === option.id ? 'bg-caiman-mint/15 text-caiman-slate-50 font-semibold' : 'hover:bg-caiman-navy-700 text-caiman-slate-200'}`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <img src={option.flag} alt={option.code} className="w-6 h-auto rounded-sm" />
                                                                <span className="text-sm">{option.label}</span>
                                                            </div>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-caiman-mint/10 rounded-xl p-3 flex items-center justify-between text-caiman-mint border border-caiman-mint/15">
                    <span className="text-sm font-medium">
                        Tasa: 1 {sourceCurrency} = {exchangeRate} {selectedCurrency.code}
                    </span>
                    <button
                        onClick={() => setExchangeRate(getExchangeRate(sourceCurrency) * (0.95 + Math.random() * 0.1))}
                        className="p-1.5 hover:bg-caiman-mint/15 rounded-full transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>

                <button
                    className="w-full mt-8 bg-caiman-mint hover:brightness-110 text-caiman-navy-900 text-lg font-bold py-4 rounded-xl shadow-lg shadow-caiman-mint/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                    Enviar remesa
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default RemittanceWidget;