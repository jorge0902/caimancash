import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-caiman-navy-900 text-caiman-slate-50 transition-colors duration-300">
            <Header />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 md:pt-28">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;