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
import bannerMobile from '../assets/cubalink-banner-mobile.png';
import logo from '../assets/logo.png';

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
            <section className="relative overflow-hidden border-b border-caiman-navy-500/40">
                <div className="absolute inset-0 md:hidden">
                    <img src={bannerMobile} alt="Caiman Cash mobile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 hidden md:block">
                    <img src={banner} alt="Caiman Cash" className="w-full h-full object-cover" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl hidden md:block mt-36 ml-20"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <img src={logo} alt="Caiman Cash" className="h-12 w-auto object-contain dark-invert" />
                            <div className="leading-tight">
                                <div className="text-2xl font-bold text-caiman-slate-50 tracking-tight">Caiman Cash</div>
                                <div className="text-xs font-semibold uppercase tracking-widest text-caiman-mint/90">Remesas</div>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-caiman-slate-50 leading-tight mb-4">Envía dinero a Cuba.</h1>
                        <h2 className="text-3xl md:text-4xl font-semibold text-caiman-slate-200 mb-4">Rápido y <span className="text-caiman-mint">seguro</span>.</h2>
                        <p className="text-caiman-slate-200 text-base md:text-lg mb-8">A solo 2 clics de distancia.</p>
                        <div className="flex flex-wrap gap-3">
                            <a href="#dashboard" className="bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold px-5 py-3 rounded-xl transition-all shadow-lg shadow-caiman-mint/20">Enviar remesa →</a>
                            <Link to="/recharge" className="border border-caiman-mint/25 text-caiman-mint hover:bg-caiman-mint/10 font-medium px-5 py-3 rounded-xl transition-colors">Añadir saldo</Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <div id="dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <BalanceCard currency={sourceCurrency} balance={balance} />
                </motion.section>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(320px,0.85fr)_minmax(500px,1.25fr)] gap-6 items-start">
                    <motion.section initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden md:block space-y-6">
                        <AccountSummary />
                        <RecentActivity />
                    </motion.section>

                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <RemittanceWidget sourceCurrency={sourceCurrency} />
                    </motion.section>
                </div>

                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                    <HowItWorks />
                </motion.section>

                <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                    <TrustSection />
                </motion.section>
            </div>
        </div>
    );
};

export default Home;
