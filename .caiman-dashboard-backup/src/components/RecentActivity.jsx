import React from 'react';
import { CreditCard } from 'lucide-react';

const RecentActivity = () => {
    const hasActivity = false;

    if (!hasActivity) {
        return (
            <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-caiman-slate-50 mb-6">Actividad reciente</h3>
                <div className="text-center py-10">
                    <CreditCard className="w-10 h-10 text-caiman-slate-400 mx-auto mb-4" />
                    <p className="text-sm text-caiman-slate-300 mb-4">Aún no tienes operaciones</p>
                    <a
                        href="/recharge"
                        className="inline-flex items-center gap-2 bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-caiman-mint/20 text-sm"
                    >
                        Hacer mi primera remesa
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-caiman-slate-50 mb-6">Actividad reciente</h3>
            <div className="text-center py-10">
                <CreditCard className="w-10 h-10 text-caiman-slate-400 mx-auto mb-4" />
                <p className="text-sm text-caiman-slate-300 mb-4">Aún no tienes operaciones</p>
                <a
                    href="/recharge"
                    className="inline-flex items-center gap-2 bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-caiman-mint/20 text-sm"
                >
                    Hacer mi primera remesa
                </a>
            </div>
        </div>
    );
};

export default RecentActivity;