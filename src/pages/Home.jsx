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
            <section className="relative overflow-hidden border-b border-caiman-navy-500/40 md:h-[540px]">
                            <div className="absolute inset-0 md:hidden">
                                <img src={bannerMobile} alt="Caiman Cash mobile" className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute inset-0 hidden md:block">
                                <img src={banner} alt="Caiman Cash" className="w-full h-full object-cover" />
                            </div>
                            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:h-full">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="max-w-xl hidden md:flex flex-col justify-center h-full"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <img src={logo} alt="Caiman Cash" className="h-14 w-auto object-contain dark-invert" />
                                        <div className="leading-tight">
                                            <div className="text-2xl font-bold text-caiman-slate-50 tracking-tight">Caiman Cash</div>
                                            <div className="text-xs font-semibold uppercase tracking-widest text-caiman-mint/90">Remesas</div>
                                        </div>
                                    </div>
                                    <h1 className="text-4xl font-bold text-caiman-slate-50 leading-tight mb-2">Envía dinero a Cuba.</h1>
                                    <h2 className="text-2xl font-semibold text-caiman-slate-200 mb-3">Rápido y <span className="text-caiman-mint">seguro</span>.</h2>
                                    <p className="text-caiman-slate-200 text-base mb-6">A solo 2 clics de distancia.</p>
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

                        <a
                                                    href="https://wa.me/79650799797"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label="Soporte por WhatsApp"
                                                    className="group fixed z-50 flex items-center justify-center right-4 bottom-[18px] w-[42px] h-[42px] sm:right-6 sm:bottom-6 rounded-[12px]"
                                                    style={{
                                                        background: 'rgba(11, 21, 36, 0.62)',
                                                        opacity: 0.68,
                                                        border: '1px solid rgba(148, 163, 184, 0.16)',
                                                        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.28), 0 2px 8px rgba(0, 0, 0, 0.18)',
                                                        transition: 'opacity 0.18s ease, transform 0.18s ease, border-color 0.18s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.opacity = '1';
                                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                                        e.currentTarget.style.borderColor = 'rgba(89, 214, 181, 0.45)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.opacity = '0.68';
                                                        e.currentTarget.style.transform = 'translateY(0)';
                                                        e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.16)';
                                                    }}
                                                >
                                                    {/* Tooltip solo en hover (desktop: oculto en móvil con hidden sm:block) */}
                                                    <span className="pointer-events-none absolute right-full mr-3 hidden sm:block whitespace-nowrap rounded-lg border border-caiman-navy-500/50 bg-caiman-navy-900/95 px-3 py-1.5 text-xs font-medium text-caiman-slate-200 opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 shadow-lg">
                                                        Soporte por WhatsApp
                                                    </span>
                                                    <svg
                                                        viewBox="0 0 24 24"
                                                        className="mx-auto pointer-events-none text-caiman-slate-200 transition-colors duration-200 group-hover:text-caiman-mint"
                                                        style={{ width: '24px', height: '24px' }}
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                                    </svg>
                                                </a>
                    </div>
                );
            };

            export default Home;
