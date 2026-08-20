import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import BalanceCard from '../components/BalanceCard';
import AccountSummary from '../components/AccountSummary';
import RemittanceWidget from '../components/RemittanceWidget';
import HowItWorks from '../components/HowItWorks';
import TrustSection from '../components/TrustSection';
import RecentActivity from '../components/RecentActivity';
import { motion } from 'framer-motion';
import { getSourceCurrencyInfo, DEFAULT_SOURCE_CURRENCY } from '../config/exchangeRates';
import banner from '../assets/cubalink-banner.png';

const Home = () => {
    const location = useLocation();
    const [sourceCurrency, setSourceCurrency] = useState(DEFAULT_SOURCE_CURRENCY);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const currency = params.get('currency')?.toUpperCase();
        if (currency && (currency === 'AED' || currency === 'RUB')) {
            setSourceCurrency(currency);
        } else {
            setSourceCurrency(DEFAULT_SOURCE_CURRENCY);
        }
    }, [location.search]);

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-caiman-navy-500/40">
                <div className="absolute inset-0 bg-gradient-to-b from-caiman-navy-900 via-caiman-navy-900 to-caiman-navy-800/70" />
                <div className="absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-caiman-mint/10 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-[340px] w-[340px] rounded-full bg-caiman-mint/10 blur-3xl" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                    >
                        <div className="space-y-5">
                            <p className="text-xs font-semibold uppercase tracking-wider text-caiman-mint">Caiman Cash</p>
                            <h1 className="text-4xl md:text-5xl font-bold text-caiman-slate-50 leading-tight">
                                Envía dinero a Cuba.
                            </h1>
                            <h2 className="text-3xl md:text-4xl font-semibold text-caiman-slate-200">
                                Rápido y <span className="text-caiman-mint">seguro</span>.
                            </h2>
                            <p className="text-caiman-slate-200 text-base md:text-lg">
                                A solo 2 clics de distancia.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a href="#remesas" className="bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-caiman-mint/20">
                                    Enviar remesa →
                                </a>
                                <Link to="/recharge" className="border border-caiman-mint/25 text-caiman-mint hover:bg-caiman-mint/10 font-medium px-5 py-3 rounded-xl transition-colors">
                                    Añadir saldo
                                </Link>
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="hidden md:flex items-center justify-center"
                        >
                            <img src={banner} alt="Caiman Cash" className="max-h-64 w-auto drop-shadow-2xl" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <BalanceCard currency={sourceCurrency} balance={balance} />
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <AccountSummary />
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <RemittanceWidget sourceCurrency={sourceCurrency} />
                    </motion.section>
                </div>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <HowItWorks />
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <RecentActivity />
                </motion.section>

                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    <TrustSection />
                </motion.section>
            </div>
        </div>
    );
};

export default Home;