import React from 'react';
import { Plus, Send, Shield, UserCheck } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        { number: '01', title: 'Añade saldo', description: 'Recarga tu cuenta con tu moneda local', icon: Plus },
        { number: '02', title: 'Indica cantidad', description: 'Ingresa cuánto deseas enviar', icon: Send },
        { number: '03', title: 'Verificamos', description: 'Tu operación pasa por nuestro proceso seguro', icon: Shield },
        { number: '04', title: 'Recibe el dinero', description: 'Tu beneficiario recibe el dinero en Cuba', icon: UserCheck }
    ];

    return (
        <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-caiman-slate-50 mb-6 text-center">¿Cómo funciona?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <div key={index} className="bg-caiman-navy-900/60 border border-caiman-navy-500/40 rounded-2xl p-4 text-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto bg-caiman-mint/15 text-caiman-mint">
                                <span className="text-sm font-bold text-caiman-mint">{step.number}</span>
                            </div>
                            <Icon className="w-5 h-5 text-caiman-mint mb-2 mx-auto" />
                            <h4 className="font-semibold text-caiman-slate-100 text-sm mb-1">{step.title}</h4>
                            <p className="text-xs text-caiman-slate-300">{step.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HowItWorks;