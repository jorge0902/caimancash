import React, { useState } from 'react';
import { Menu, X, User, History, RefreshCw, Moon, LogOut } from 'lucide-react';
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
        { icon: History, label: 'Historial de órdenes', path: '/history' },
        { icon: RefreshCw, label: 'Recargar la página', action: () => window.location.reload() },
        { icon: Moon, label: 'Cambiar tema', action: () => toggleTheme() },
        { icon: LogOut, label: 'Cerrar sesión', action: () => console.log('Logout') },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 bg-secondary/95 backdrop-blur-md shadow-sm border-b border-border z-40 h-28 md:h-36 flex items-center justify-between px-4 md:px-8 transition-colors duration-300">
                <Link to="/" className="flex items-center gap-3">
                    <img
                        src={`${logo}?v=${new Date().getTime()}`}
                        alt="Caiman Cash"
                        className="h-24 md:h-32 w-auto object-contain transition-all duration-300 dark-invert"
                    />
                    <span className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-text-main to-primary tracking-tighter leading-none pb-1">Caiman Cash</span>
                </Link>

                <div className="relative">
                    <button
                        onClick={toggleMenu}
                        className={`p-3 rounded-xl transition-all duration-300 ${isMenuOpen ? 'bg-primary/10 text-primary' : 'hover:bg-secondary text-text-main'}`}
                    >
                        <Menu className="w-8 h-8 md:w-10 md:h-10" />
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
                                    className="absolute right-0 top-full mt-2 w-72 bg-background rounded-2xl shadow-2xl border border-border overflow-hidden z-50 py-2 origin-top-right"
                                >
                                    <ul className="flex flex-col">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                {item.path ? (
                                                    <Link
                                                        to={item.path}
                                                        onClick={() => setIsMenuOpen(false)}
                                                        className="flex items-center gap-4 px-6 py-3.5 text-text-main hover:bg-secondary transition-colors text-base font-medium"
                                                    >
                                                        <item.icon className="w-5 h-5 text-text-main/70" />
                                                        {item.label}
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            item.action && item.action();
                                                            setIsMenuOpen(false);
                                                        }}
                                                        className="flex items-center gap-4 px-6 py-3.5 text-text-main hover:bg-secondary transition-colors w-full text-left text-base font-medium"
                                                    >
                                                        <item.icon className="w-5 h-5 text-text-main/70" />
                                                        {item.label}
                                                    </button>
                                                )}
                                                {index === 1 && <div className="h-px bg-border my-2 mx-4" />}
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
