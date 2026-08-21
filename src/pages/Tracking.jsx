import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDemo, updateRemittanceStatus } from '../config/demoStore';

const STATUS_FLOW = [
  { key: 'created', label: 'Remesa creada', description: 'Recibimos correctamente tu solicitud.' },
  { key: 'review', label: 'En revisión', description: 'Nuestro equipo verificó los datos y el pago.' },
  { key: 'approved', label: 'Remesa aprobada', description: 'La operación fue aprobada correctamente.' },
  { key: 'onroute', label: 'En camino', description: 'El dinero está siendo enviado al destinatario.' },
  { key: 'delivered', label: 'Recibida', description: 'El destinatario recibirá la remesa.' }
];

const NEXT_STATUS = {
  created: 'review',
  review: 'approved',
  approved: 'onroute',
  onroute: 'delivered'
};

const Tracking = () => {
    const { ref } = useParams();
    const [remit, setRemit] = useState(() => getDemo().remittances.find(r => r.ref === ref) || null);
    const timerRef = useRef(null);
    const tickRef = useRef(0);

    useEffect(() => {
        const current = getDemo().remittances.find(r => r.ref === ref);
        if (current) setRemit(current);
    }, [ref]);

    useEffect(() => {
        if (!remit || !NEXT_STATUS[remit.status]) return;

        const advance = () => {
            const next = NEXT_STATUS[remit.status];
            if (!next) return;
            const updated = updateRemittanceStatus(
                remit.ref,
                next,
                STATUS_FLOW.find(s => s.key === next)?.label || next,
                STATUS_FLOW.find(s => s.key === next)?.description || ''
            );
            if (updated) setRemit(updated);
        };

        timerRef.current = setInterval(() => {
            tickRef.current += 1;
            advance();
        }, 15000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [remit && remit.ref, remit && remit.status]);

    if (!remit) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-2xl font-bold text-caiman-slate-50 mb-4">Seguimiento</h1>
                <p className="text-caiman-slate-300">No se encontró la remesa {ref}.</p>
            </div>
        );
    }

    const statusOrder = ['created', 'review', 'approved', 'onroute', 'delivered'];
    const currentIndex = statusOrder.indexOf(remit.status);
    const progress = Math.round(((currentIndex + 1) / statusOrder.length) * 100);

    const timeline = [
        { key: 'created', label: 'Remesa creada', description: 'Recibimos correctamente tu solicitud.' },
        { key: 'review', label: 'En revisión', description: 'Nuestro equipo verificó los datos y el pago.' },
        { key: 'approved', label: 'Remesa aprobada', description: 'La operación fue aprobada correctamente.' },
        { key: 'onroute', label: 'En camino', description: 'El dinero está siendo enviado al destinatario.' },
        { key: 'delivered', label: 'Recibida', description: 'El destinatario recibirá la remesa.' }
    ];

    const renderDate = (key) => {
        const item = remit.timeline.find(t => t.status === key);
        return item ? item.date : (key === remit.status ? 'En proceso' : '');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="w-full max-w-[520px] mx-auto">
                <header className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-caiman-mint flex items-center justify-center text-caiman-navy-900 font-black text-lg">C</div>
                        <div className="font-extrabold text-caiman-slate-50">Caiman Cash</div>
                    </div>
                </header>

                <section className="rounded-3xl p-5 border border-caiman-navy-500/50" style={{ background: 'linear-gradient(145deg, #0c202b, #091923)', boxShadow: '0 20px 50px rgba(0,0,0,.2)' }}>
                    <div className="text-caiman-slate-400 text-xs uppercase tracking-widest">Remesa</div>
                    <div className="text-3xl font-Black mt-1 text-caiman-slate-50">{remit.amount.toLocaleString('es-ES')} {remit.currency}</div>
                    <div className="text-caiman-slate-400 text-sm mt-1">Para: {remit.recipient}</div>

                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-caiman-navy-500/40">
                        <div>
                            <div className="text-xs text-caiman-slate-400">Referencia</div>
                            <div className="text-sm font-bold tracking-wide">{remit.ref}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-caiman-slate-400">Creada</div>
                            <div className="text-sm font-bold">{new Date(remit.createdAt).toLocaleDateString('es-ES')}</div>
                        </div>
                    </div>

                    <div className="mt-4 rounded-2xl p-4 border border-caiman-mint/20" style={{ background: 'rgba(89,214,181,.07)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-caiman-mint text-caiman-navy-900 flex items-center justify-center text-lg font-black">✓</div>
                            <div>
                                <div className="font-extrabold text-caiman-slate-50">{remit.statusLabel}</div>
                                <div className="text-caiman-slate-400 text-xs mt-0.5">Tu remesa está en proceso.</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex justify-between mb-2">
                            <span className="text-caiman-slate-400 text-xs">Progreso de la remesa</span>
                            <span className="text-caiman-mint text-xs font-bold">{progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-caiman-navy-900/70 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-caiman-mint-dark to-caiman-mint rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="text-lg font-extrabold mb-5">Seguimiento</div>
                        {timeline.map((step, idx) => {
                            const isCompleted = idx < currentIndex;
                            const isActive = idx === currentIndex;
                            return (
                                <div key={step.key} className={`grid grid-cols-[36px_1fr] gap-3 min-h-[72px] ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                                    <div className="relative flex justify-center">
                                        <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs z-10" style={{
                                            background: isCompleted || isActive ? '#59D6B5' : '#132b36',
                                            borderColor: isCompleted || isActive ? '#59D6B5' : '#31505c',
                                            color: isCompleted || isActive ? '#041016' : 'inherit',
                                            fontWeight: 900,
                                            boxShadow: isCompleted
                                                ? '0 0 18px 4px rgba(89,214,181,.85)'
                                                : isActive
                                                    ? '0 0 18px 6px rgba(89,214,181,.55)'
                                                    : 'none'
                                        }}>
                                            {isCompleted ? '✓' : isActive ? '→' : step.key === 'delivered' ? '5' : idx + 1}
                                        </div>
                                        {idx < timeline.length - 1 && (
                                            <div className="absolute w-0.5 h-full left-1/2 -translate-x-1/2 top-7" style={{ background: isCompleted ? 'var(--mint)' : 'var(--line)' }} />
                                        )}
                                    </div>
                                    <div className="pb-5">
                                        <div className="font-bold text-sm">{step.label}</div>
                                        <div className="text-caiman-slate-400 text-xs mt-1 leading-relaxed">{step.description}</div>
                                        <div className="text-[11px] mt-1" style={{ color: '#6f8792' }}>{renderDate(step.key)}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 rounded-2xl p-4 border border-caiman-navy-500/40" style={{ background: 'var(--card)' }}>
                        <div className="flex justify-between py-2 text-xs">
                            <span className="text-caiman-slate-400">Destinatario</span>
                            <span className="font-bold">{remit.recipient}</span>
                        </div>
                        <div className="flex justify-between py-2 text-xs">
                            <span className="text-caiman-slate-400">Monto enviado</span>
                            <span className="font-bold">{remit.amount.toLocaleString('es-ES')} {remit.currency}</span>
                        </div>
                        <div className="flex justify-between py-2 text-xs">
                            <span className="text-caiman-slate-400">Monto a recibir</span>
                            <span className="font-bold">{remit.receiveAmount.toLocaleString('es-ES')} {remit.receiveCurrency}</span>
                        </div>
                        <div className="flex justify-between py-2 text-xs">
                            <span className="text-caiman-slate-400">Método</span>
                            <span className="font-bold">{remit.method}</span>
                        </div>
                    </div>
                </section>

                <div className="text-center text-xs mt-6 mb-4" style={{ color: '#617984' }}>Caiman Cash · Remesas simples, rápidas y seguras</div>
            </div>
        </div>
    );
};

export default Tracking;
