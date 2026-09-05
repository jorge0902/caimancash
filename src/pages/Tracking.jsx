import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDemo, updateRemittanceStatus, updateRechargeStatus, RECHARGE_FLOW } from '../config/demoStore';

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

const NEXT_RECHARGE_STATUS = {
  pending: 'verifying'
  // 'credited' (Saldo acreditado) se activa manualmente cuando un administrador aprueba el pago.
};

const Tracking = () => {
    const { ref } = useParams();
    const [order, setOrder] = useState(() => {
        const demo = getDemo();
        return demo.remittances.find(r => r.ref === ref) || demo.recharges.find(r => r.ref === ref) || null;
    });
    const timerRef = useRef(null);
    const tickRef = useRef(0);

    const isRecharge = order && !('recipient' in order);

    useEffect(() => {
        const demo = getDemo();
        const found = demo.remittances.find(r => r.ref === ref) || demo.recharges.find(r => r.ref === ref) || null;
        if (found) setOrder(found);
    }, [ref]);

    useEffect(() => {
        if (!order) return;
        const flow = isRecharge ? NEXT_RECHARGE_STATUS : NEXT_STATUS;
        const next = flow[order.status];
        if (!next) return;

        const stepLabel = isRecharge
            ? RECHARGE_FLOW.find(s => s.key === next)?.label || next
            : STATUS_FLOW.find(s => s.key === next)?.label || next;
        const stepDesc = isRecharge
            ? RECHARGE_FLOW.find(s => s.key === next)?.description || ''
            : STATUS_FLOW.find(s => s.key === next)?.description || '';

        const advance = () => {
            const updated = isRecharge
                ? updateRechargeStatus(order.ref, next, stepLabel, stepDesc)
                : updateRemittanceStatus(order.ref, next, stepLabel, stepDesc);
            if (updated) setOrder(updated);
        };

        timerRef.current = setInterval(() => {
            tickRef.current += 1;
            advance();
        }, 5000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [order && order.ref, order && order.status]);

    if (!order) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-2xl font-bold text-caiman-slate-50 mb-4">Seguimiento</h1>
                <p className="text-caiman-slate-300">No se encontró la orden {ref}.</p>
            </div>
        );
    }

    const statusOrder = isRecharge
        ? RECHARGE_FLOW.map(f => f.key)
        : ['created', 'review', 'approved', 'onroute', 'delivered'];
    const currentIndex = statusOrder.indexOf(order.status);
    const progress = Math.round(((currentIndex + 1) / statusOrder.length) * 100);

    const timeline = isRecharge ? RECHARGE_FLOW : STATUS_FLOW;

    const renderDate = (key) => {
        const item = order.timeline.find(t => t.status === key);
        return item ? item.date : (key === order.status ? 'En proceso' : '');
    };

    const typeLabel = isRecharge ? 'Recarga de saldo' : 'Remesa';

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="w-full max-w-[520px] mx-auto">
                <section className="rounded-3xl p-5 border border-caiman-navy-500/50" style={{ background: 'linear-gradient(145deg, #0c202b, #091923)', boxShadow: '0 20px 50px rgba(0,0,0,.2)' }}>
                    <div className="text-caiman-slate-400 text-xs uppercase tracking-widest">{typeLabel}</div>
                    <div className="text-3xl font-Black mt-1 text-caiman-slate-50">{order.amount.toLocaleString('es-ES')} {order.currency}</div>
                    {!isRecharge && <div className="text-caiman-slate-400 text-sm mt-1">Para: {order.recipient}</div>}

                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-caiman-navy-500/40">
                        <div>
                            <div className="text-xs text-caiman-slate-400">Referencia</div>
                            <div className="text-sm font-bold tracking-wide">{order.ref}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-caiman-slate-400">Creada</div>
                            <div className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString('es-ES')}</div>
                        </div>
                    </div>

                    <div className="mt-4 rounded-2xl p-4 border border-caiman-mint/20" style={{ background: 'rgba(89,214,181,.07)' }}>
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-caiman-mint text-caiman-navy-900 flex items-center justify-center text-lg font-black">✓</div>
                            <div>
                                <div className="font-extrabold text-caiman-slate-50">{order.statusLabel}</div>
                                <div className="text-caiman-slate-400 text-xs mt-0.5">{isRecharge ? 'Tu recarga está en proceso.' : 'Tu remesa está en proceso.'}</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="flex justify-between mb-2">
                            <span className="text-caiman-slate-400 text-xs">Progreso de {isRecharge ? 'la recarga' : 'la remesa'}</span>
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
                                                ? '0 0 10px 2px rgba(89,214,181,.38)'
                                                : isActive
                                                    ? '0 0 10px 3px rgba(89,214,181,.28)'
                                                    : 'none'
                                        }}>
                                            {isCompleted ? '✓' : isActive ? '→' : step.key === 'delivered' || step.key === 'credited' ? String(timeline.length) : idx + 1}
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
                        {!isRecharge && (
                            <div className="flex justify-between py-2 text-xs">
                                <span className="text-caiman-slate-400">Destinatario</span>
                                <span className="font-bold">{order.recipient}</span>
                            </div>
                        )}
                        <div className="flex justify-between py-2 text-xs">
                            <span className="text-caiman-slate-400">{isRecharge ? 'Monto de recarga' : 'Monto enviado'}</span>
                            <span className="font-bold">{order.amount.toLocaleString('es-ES')} {order.currency}</span>
                        </div>
                        {!isRecharge && (
                            <>
                                <div className="flex justify-between py-2 text-xs">
                                    <span className="text-caiman-slate-400">Monto a recibir</span>
                                    <span className="font-bold">{order.receiveAmount.toLocaleString('es-ES')} {order.receiveCurrency}</span>
                                </div>
                                <div className="flex justify-between py-2 text-xs">
                                    <span className="text-caiman-slate-400">Método</span>
                                    <span className="font-bold">{order.method}</span>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                <div className="text-center text-xs mt-6 mb-4" style={{ color: '#617984' }}>Caiman Cash · Remesas simples, rápidas y seguras</div>
            </div>
        </div>
    );
};

export default Tracking;
