import React from 'react';
import { Facebook, Instagram, Send, MessageCircle, Download } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-secondary pt-12 pb-8 border-t border-border mt-auto transition-colors duration-300">
            <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-8">

                {/* Slogan */}
                <h3 className="text-lg font-medium text-text-main">
                    Tu remesa al alcance de unos clics
                </h3>

                {/* Social Icons */}
                <div className="flex items-center gap-6">
                    <a href="#" className="text-text-main hover:text-primary transition-colors"><Facebook className="w-6 h-6" /></a>
                    <a href="#" className="text-text-main hover:text-primary transition-colors"><Instagram className="w-6 h-6" /></a>
                    <a href="#" className="text-text-main hover:text-primary transition-colors"><Send className="w-6 h-6" /></a> {/* Using Send for Telegram */}
                    <a href="#" className="text-text-main hover:text-primary transition-colors"><MessageCircle className="w-6 h-6" /></a> {/* Using MessageCircle for WhatsApp */}
                </div>

                {/* App Download */}
                <button className="bg-text-main text-background px-6 py-3 rounded-lg flex items-center gap-3 hover:opacity-90 transition-opacity shadow-lg">
                    <Download className="w-6 h-6" /> {/* Generic download icon, assuming Android logo isn't available in lucide immediately, actually I can use an android specific icon if available basically or text */}
                    <div className="text-left">
                        <div className="text-xs uppercase font-bold text-gray-400">Descarga Directa</div>
                        <div className="text-sm font-bold">Android APK</div>
                    </div>
                </button>

                {/* Copyright */}
                <div className="text-gray-400 text-sm mt-4">
                    © 2026 Caimán Cash. Todos los derechos reservados
                </div>
            </div>
        </footer>
    );
};

export default Footer;
