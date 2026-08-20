import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Activity = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <h1 className="text-2xl font-bold text-caiman-slate-50">Actividad reciente</h1>
                <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                    <p className="text-sm text-caiman-slate-300">Aún no tienes remesas</p>
                    <p className="text-xs text-caiman-slate-400 mt-2">
                        Cuando realices tu primer envío, podrás consultar aquí el estado y los detalles de tus remesas.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Activity;