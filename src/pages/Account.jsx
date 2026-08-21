import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDemo, resetDemo } from '../config/demoStore';

const Account = () => {
    const [demo, setDemo] = useState(getDemo());
    
    useEffect(() => {
        const d = getDemo();
        if (!d.balance || d.balance <= 0) {
            const fresh = resetDemo();
            setDemo(fresh);
        } else {
            setDemo(d);
        }
    }, []);
    
    const handleReset = () => {
        const fresh = resetDemo();
        setDemo(fresh);
    };
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-8">
                    <div className="text-xs font-bold uppercase tracking-widest text-caiman-mint mb-2">Caiman Cash</div>
                    <div className="text-sm text-caiman-slate-400">Cuenta Demo</div>
                </div>
                
                <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-3xl p-8 mb-6 backdrop-blur-sm">
                    <div className="text-xs font-semibold uppercase tracking-wider text-caiman-slate-400 mb-2">Saldo disponible</div>
                    <div className="text-5xl font-bold text-caiman-slate-50 tracking-tight">
                        {demo.balance.toLocaleString('es-ES')} <span className="text-caiman-mint text-2xl ml-2">RUB</span>
                    </div>
                    <div className="text-xs text-caiman-mint mt-2">● Disponible</div>
                </div>
                
                <div className="space-y-3">
                    <Link 
                        to="/enviar-remesa" 
                        className="block w-full bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-bold py-4 rounded-2xl text-center shadow-lg shadow-caiman-mint/20 transition-all active:scale-95"
                    >
                        Enviar remesa
                    </Link>
                    
                    <Link 
                        to="/mis-remesas" 
                        className="block w-full border border-caiman-navy-500/50 text-caiman-slate-200 hover:bg-caiman-navy-800/50 font-semibold py-4 rounded-2xl text-center transition-colors"
                    >
                        Mis remesas
                    </Link>
                    
                    <button 
                        onClick={handleReset}
                        className="block w-full text-xs text-caiman-slate-500 hover:text-caiman-slate-300 py-2 transition-colors"
                    >
                        Restablecer cuenta demo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;
