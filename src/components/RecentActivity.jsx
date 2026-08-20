import React from 'react';
import { Activity } from 'lucide-react';

const RecentActivity = () => {
    return (
        <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-caiman-mint" />
                <h3 className="text-base font-semibold text-caiman-slate-50">Actividad reciente</h3>
            </div>
            <p className="text-sm text-caiman-slate-300 mb-1">Aún no tienes remesas</p>
            <p className="text-xs text-caiman-slate-400">
                Cuando realices tu primer envío, podrás consultar aquí el estado y los detalles de tus remesas.
            </p>
        </div>
    );
};

export default RecentActivity;