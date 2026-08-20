import React from 'react';

const AccountSummary = () => {
    return (
        <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="text-base font-semibold text-caiman-slate-50 mb-4">Resumen de cuenta</h3>
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-caiman-slate-300">Última remesa</span>
                    <span className="text-sm text-caiman-slate-400">—</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-caiman-slate-300">En proceso</span>
                    <span className="text-sm font-semibold text-caiman-mint">0</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-caiman-slate-300">Completadas</span>
                    <span className="text-sm text-caiman-slate-400">0</span>
                </div>
            </div>
        </div>
    );
};

export default AccountSummary;