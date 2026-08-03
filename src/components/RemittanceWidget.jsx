import React, { useState } from 'react';
import { RefreshCw, ArrowRight, ChevronsUpDown, Banknote, Smartphone, Wifi, Check } from 'lucide-react';

import cubaFlag from '../assets/cuba.svg';
import usaFlag from '../assets/usa.svg';
import uaeFlag from '../assets/uae.svg';

const RemittanceWidget = () => {
    const [sendAmount, setSendAmount] = useState(100);
    const [exchangeRate, setExchangeRate] = useState(130.929);

    const currencyOptions = [
        { id: 'cup', code: 'CUP', label: 'CUP', flag: cubaFlag },
        { id: 'cup_cash', code: 'CUP', label: 'CUP (Efectivo)', flag: cubaFlag },
        { id: 'usd_cash', code: 'USD', label: 'USD (Efectivo)', flag: usaFlag },
        { id: 'usd_classic', code: 'USD', label: 'USD (Tarjetas Clásicas)', flag: usaFlag },
        { id: 'usd_prepaid', code: 'USD', label: 'USD (Tarjetas Prepago)', flag: usaFlag },
    ];

    const [selectedCurrency, setSelectedCurrency] = useState(currencyOptions[0]);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [serviceType, setServiceType] = useState('remesas'); // 'remesas' | 'recargas' | 'internet'

    const handleSendChange = (e) => {
        setSendAmount(e.target.value);
    };

    const receiveAmount = (sendAmount * exchangeRate).toFixed(2);

    return (
        <div className="w-full max-w-lg mx-auto space-y-6">
            {/* Country Selector Block */}
            <div className="bg-secondary rounded-3xl shadow-sm border border-border p-6 transition-colors duration-300">
                <label className="block text-base font-bold text-text-main mb-3">País destino:</label>
                <div className="w-full flex items-center justify-between bg-background border border-border rounded-xl p-3 h-14">
                    <div className="flex items-center gap-3">
                        <img src={cubaFlag} alt="Cuba" className="w-8 h-auto rounded-sm shadow-sm" />
                        <span className="font-semibold text-text-main">Cuba</span>
                    </div>
                    <ChevronsUpDown className="w-5 h-5 text-text-main/50" />
                </div>
            </div>

            {/* Money Transfer Block */}
            <div className="bg-secondary rounded-3xl shadow-xl border border-border p-6 md:p-8 transition-colors duration-300">

                {/* Service Type Selector */}
                <div className="flex justify-center mb-8">
                    <div className="bg-background border border-border rounded-xl p-1 flex items-center gap-1 w-full max-w-sm">
                        <button
                            onClick={() => setServiceType('remesas')}
                            className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-2 px-1 md:px-3 rounded-lg text-xs md:text-sm font-bold transition-all ${serviceType === 'remesas'
                                    ? 'bg-secondary shadow-sm text-text-main'
                                    : 'text-text-main/60 hover:text-text-main'
                                }`}
                        >
                            <Banknote className="w-4 h-4" />
                            Remesas
                        </button>
                        <button
                            onClick={() => setServiceType('recargas')}
                            className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-2 px-1 md:px-3 rounded-lg text-xs md:text-sm font-bold transition-all ${serviceType === 'recargas'
                                    ? 'bg-secondary shadow-sm text-text-main'
                                    : 'text-text-main/60 hover:text-text-main'
                                }`}
                        >
                            <Smartphone className="w-4 h-4" />
                            Recargas
                        </button>
                        <button
                            onClick={() => setServiceType('internet')}
                            className={`flex-1 flex items-center justify-center gap-1 md:gap-2 py-2 px-1 md:px-3 rounded-lg text-xs md:text-sm font-bold transition-all ${serviceType === 'internet'
                                    ? 'bg-secondary shadow-sm text-text-main'
                                    : 'text-text-main/60 hover:text-text-main'
                                }`}
                        >
                            <Wifi className="w-4 h-4" />
                            Internet
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* You Send */}
                    <div className="relative group">
                        <label className="block text-xs font-semibold text-text-main/60 uppercase tracking-wider mb-2">Tú envías</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={sendAmount}
                                onChange={handleSendChange}
                                className="w-full bg-background border border-border rounded-xl px-4 py-4 text-2xl font-bold text-text-main focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                placeholder="0.00"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-secondary px-2 py-1 rounded-lg border border-border shadow-sm">
                                <img src={uaeFlag} alt="AED" className="w-6 h-auto rounded-[2px]" />
                                <span className="font-bold text-text-main/80">AED</span>
                            </div>
                        </div>
                    </div>

                    {/* They Receive */}
                    <div className="relative">
                        <label className="block text-xs font-semibold text-text-main/60 uppercase tracking-wider mb-2">Ellos reciben</label>
                        <div className="relative z-20">
                            <input
                                type="number"
                                value={receiveAmount}
                                readOnly
                                className="w-full bg-background border border-border rounded-xl px-4 py-4 text-2xl font-bold text-text-main focus:outline-none"
                                placeholder="0.00"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <button
                                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                                    className="flex items-center gap-2 bg-secondary font-bold text-text-main py-1.5 pl-2 pr-2 rounded-lg border border-border shadow-sm hover:brightness-95 transition-all"
                                >
                                    <img src={selectedCurrency.flag} alt={selectedCurrency.code} className="w-6 h-auto rounded-[2px]" />
                                    <span>{selectedCurrency.code}</span>
                                    <ChevronsUpDown className="w-4 h-4 text-text-main/50" />
                                </button>

                                {/* Custom Dropdown Menu */}
                                {isCurrencyOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsCurrencyOpen(false)}></div>
                                        <div className="absolute right-0 top-full mt-2 w-64 bg-background rounded-xl shadow-2xl border border-border overflow-hidden z-30 slide-in-bottom">
                                            <ul className="py-1">
                                                {currencyOptions.map((option) => (
                                                    <li key={option.id}>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedCurrency(option);
                                                                setIsCurrencyOpen(false);
                                                            }}
                                                            className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${selectedCurrency.id === option.id
                                                                    ? 'bg-primary/10 text-text-main font-semibold'
                                                                    : 'hover:bg-secondary text-text-main'
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <img src={option.flag} alt={option.code} className="w-6 h-auto rounded-[2px]" />
                                                                <span className="text-sm">{option.label}</span>
                                                            </div>
                                                            {selectedCurrency.id === option.id && (
                                                                <Check className="w-4 h-4 text-text-main" />
                                                            )}
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

                {/* Rate Bar */}
                <div className="mt-6 bg-primary/10 rounded-xl p-3 flex items-center justify-between text-primary">
                    <span className="text-sm font-medium">
                        Tasa actualizada: 1 AED = {exchangeRate} {selectedCurrency.code}
                    </span>
                    <button onClick={() => setExchangeRate(130.93 + Math.random())} className="p-1.5 hover:bg-primary/20 rounded-full transition-colors">
                        <RefreshCw className="w-4 h-4" />
                    </button>
                </div>

                {/* Primary Button */}
                <button className="w-full mt-8 bg-primary hover:opacity-90 text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                    Enviar remesa
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default RemittanceWidget;
