import React from 'react';
import { Shield, CheckCircle, Timer, Globe } from 'lucide-react';

const TrustSection = () => {
    const items = [
        { icon: Shield, title: 'Pagos protegidos', description: 'Tus fondos están seguros' },
        { icon: CheckCircle, title: 'Operaciones verificadas', description: 'Confiable y transparente' },
        { icon: Timer, title: 'Procesamiento rápido', description: 'Recibe en minutos' },
        { icon: Globe, title: 'Transferencias a Cuba', description: 'Conectado al ecosistema local' }
    ];

    return (
        <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="p-2 rounded-xl bg-caiman-mint/15 text-caiman-mint">
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-caiman-slate-100">{item.title}</p>
                            <p className="text-xs text-caiman-slate-300">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TrustSection;