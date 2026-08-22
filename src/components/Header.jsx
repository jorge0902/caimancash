import React, { useState } from 'react';
import { Menu, X, User, History, RefreshCw, Moon, LogOut, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

import logo from '../assets/logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { toggleTheme } = useTheme();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuItems = [
        { icon: User, label: 'Perfil', path: '/profile' },
        { icon: Activity, label: 'Tu actividad', path: '/activity' },
        { icon: History, label: 'Historial de órdenes', path: '/history' },
        { icon: RefreshCw, label: 'Recargar la página', action: () => window.location.reload() },
        { icon: Moon, label: 'Cambiar tema', action: () => toggleTheme() },
        { icon: LogOut, label: 'Cerrar sesión', action: () => console.log('Logout') },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-caiman-navy-900/80 backdrop-blur-xl border-b border-caiman-navy-500/40 z-40 h-16 md:h-20 flex items-center justify-between px-4 md:px-8 transition-colors duration-300">
                <Link to="/" className="flex items-center gap-3">
                    <div className="rounded-full bg-white/90 p-[3px] shadow-sm">
                        <img
                            src={`${logo}?v=${new Date().getTime()}`}
                            alt="Caiman Cash"
                            className="h-8 md:h-10 w-auto object-contain transition-all duration-300 dark-invert drop-shadow-[0_0_12px_rgba(89,214,181,0.35)] scale-[1.2] md:scale-100"
                        />
                    </div>
                    <div className="leading-tight">
                        <span className="text-lg md:text-xl font-bold text-caiman-slate-50 tracking-tight block">Caiman Cash</span>
                        <span className="text-[11px] md:text-xs font-semibold uppercase tracking-widest text-caiman-mint/90 block">Remesas</span>
                    </div>
                </Link>

                <div className="relative">
                    <button
                        onClick={toggleMenu}
                        className={`p-2 rounded-lg transition-all duration-300 ${isMenuOpen ? 'bg-caiman-mint/15 text-caiman-mint' : 'hover:bg-caiman-navy-700 text-caiman-slate-200'}`}
                    >
                        {isMenuOpen ? <X className="w-5 h-5 md:w-6 md:h-6" /> : <Menu className="w-5 h-5 md:w-6 md:h-6" />}
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-2 w-64 bg-caiman-navy-800/90 backdrop-blur-xl border border-caiman-navy-500/50 overflow-hidden z-50 py-2 origin-top-right"
                                >
                                    <ul className="flex flex-col">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                {item.path ? (
                                                    <Link
                                                        to={item.path}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-caiman-slate-200 hover:bg-caiman-navy-700 transition-colors text-sm font-medium"
                                                    >
                                                        <item.icon className="w-4 h-4 text-caiman-mint" />
                                                        {item.label}
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            item.action && item.action();
                                                            setIsMenuOpen(false);
                                                        }}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-caiman-slate-200 hover:bg-caiman-navy-700 transition-colors w-full text-left text-sm font-medium"
                                                    >
                                                        <item.icon className="w-4 h-4 text-caiman-mint" />
                                                        {item.label}
                                                    </button>
                                                )}
                                                {index < menuItems.length - 1 && <div className="h-px bg-caiman-navy-500/40 my-1 mx-3" />}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </header>
        </>
    );
};

export default Header;