import React from 'react';

const Activity = () => {
    return (
        <>
            <h1 className="text-2xl font-bold text-caiman-slate-50 mb-6">Actividad reciente</h1>
            <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                <p className="text-sm text-caiman-slate-300">Aún no tienes remesas</p>
                <p className="text-xs text-caiman-slate-400 mt-2">
                    Cuando realices tu primer envío, podrás consultar aquí el estado y los detalles de tus remesas.
                </p>
            </div>
        </>
    );
};

export default Activity;