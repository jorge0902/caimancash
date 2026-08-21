import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDemo } from '../config/demoStore';

const History = () => {
    const [remittances, setRemittances] = useState([]);
    
    useEffect(() => {
        setRemittances(getDemo().remittances || []);
    }, []);
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-caiman-slate-50">Mis remesas</h1>
                    <Link to="/" className="text-sm text-caiman-mint hover:brightness-110">Volver</Link>
                </div>
                
                {remittances.length === 0 ? (
                    <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-12 text-center backdrop-blur-sm">
                        <div className="text-4xl mb-3">📭</div>
                        <div className="text-caiman-slate-300 mb-1">No tienes remesas aún</div>
                        <div className="text-sm text-caiman-slate-500 mb-6">Cuando envíes dinero, aparecerá aquí</div>
                        <Link to="/enviar-remesa" className="inline-block bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold px-6 py-3 rounded-xl transition-all">
                            Enviar primera remesa
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {remittances.map(r => (
                            <div key={r.ref} className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-5 backdrop-blur-sm">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <div className="text-sm font-semibold text-caiman-slate-50">{r.recipient}</div>
                                        <div className="text-xs text-caiman-slate-400 mt-1">{r.method} {r.methodNumber}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs text-caiman-mint font-semibold">{r.statusLabel}</div>
                                        <div className="text-xs text-caiman-slate-500 mt-1">{new Date(r.createdAt).toLocaleDateString('es-ES')}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-3 border-t border-caiman-navy-500/30">
                                    <div>
                                        <div className="text-xs text-caiman-slate-400">Monto</div>
                                        <div className="text-sm font-bold text-caiman-slate-50">
                                            {r.amount.toLocaleString('es-ES')} {r.currency} → {r.receiveAmount.toLocaleString('es-ES')} {r.receiveCurrency}
                                        </div>
                                    </div>
                                    <Link 
                                        to={`/tracking/${r.ref}`} 
                                        className="text-sm bg-caiman-mint/10 border border-caiman-mint/25 text-caiman-mint hover:bg-caiman-mint/20 font-semibold px-4 py-2 rounded-xl transition-colors"
                                    >
                                        Ver seguimiento
                                    </Link>
                                </div>
                                
                                <div className="mt-2">
                                    <div className="text-xs text-caiman-slate-500">Referencia: <span className="font-mono text-caiman-slate-400">{r.ref}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
