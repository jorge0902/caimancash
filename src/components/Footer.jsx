import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="border-t border-caiman-navy-500/40 bg-caiman-navy-900/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-caiman-slate-200">Caiman Cash</span>
                </Link>
                <p className="text-xs text-caiman-slate-400">© {new Date().getFullYear()} Caiman Cash. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;