import React, { useEffect, useMemo, useState } from 'react';
import { getDemo, saveDemo, createRemittance, addMethod } from '../config/demoStore';

const SendRemittanceInline = ({ onCreated }) => {
    const [demo, setDemo] = useState(getDemo());
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [phone, setPhone] = useState('');
    const [methodId, setMethodId] = useState(() => {
        const d = getDemo();
        return d.methods[0]?.id || '';
    });
    const [customMethod, setCustomMethod] = useState('');
    const [customName, setCustomName] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        setDemo(getDemo());
    }, [open]);

    const numeric = useMemo(() => Number(amount || 0), [amount]);
    const receive = useMemo(() => Math.round(numeric * demo.rate), [numeric, demo.rate]);
    const total = numeric;
    const valid = numeric > 0 && recipient.trim() && phone.trim() && methodId && numeric <= demo.balance;

    const method = demo.methods.find(m => m.id === methodId) || {};
    const displayMethod = methodId === '__custom__' ? customMethod : method.type;
    const displayNumber = methodId === '__custom__' ? '' : method.number;
    const displayName = methodId === '__custom__' ? customName : method.name;

    const submit = () => {
        if (!valid) return;
        const remit = createRemittance({
            amount: numeric,
            recipient: recipient.trim(),
            phone: phone.trim(),
            method: displayMethod || method.type,
            methodId: methodId || '__custom__'
        });
        setSuccess(remit);
        setConfirm(false);
        setAmount('');
        setRecipient('');
        setPhone('');
        setCustomMethod('');
        setCustomName('');
        setDemo(getDemo());
        onCreated && onCreated();
    };

    if (success) {
        return (
            <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-caiman-slate-50 mb-2">Remesa creada correctamente</h2>
                <p className="text-sm text-caiman-slate-300 mb-4">Referencia: {success.ref}</p>
                <div className="space-y-2 text-sm text-caiman-slate-300">
                    <div>Enviado: {success.amount} {success.currency}</div>
                    <div>A recibir: {success.receiveAmount} {success.receiveCurrency}</div>
                    <div>Destinatario: {success.recipient}</div>
                    <div>Teléfono: {success.phone}</div>
                </div>
                <div className="flex flex-wrap gap-3 mt-6">
                    <a href={`/tracking/${success.ref}`} className="bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold px-5 py-3 rounded-xl">Ver seguimiento</a>
                    <button onClick={() => { setSuccess(null); setOpen(true); }} className="border border-caiman-mint/25 text-caiman-mint hover:bg-caiman-mint/10 font-medium px-5 py-3 rounded-xl">Nueva remesa</button>
                </div>
            </div>
        );
    }

    if (!open) {
        return (
            <div className="max-w-3xl mx-auto w-full">
                <button onClick={() => setOpen(true)} className="w-full bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold py-3 rounded-xl shadow-lg shadow-caiman-mint/20">
                    Enviar dinero
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto w-full bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-caiman-slate-50">Enviar remesa</h3>
                <div className="text-xs text-caiman-slate-400">Cuenta Demo · {demo.balance.toLocaleString('es-ES')} RUB</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div>
                        <label className="block text-sm text-caiman-slate-300 mb-1">¿Quién recibirá el dinero?</label>
                        <div className="space-y-3">
                            {demo.methods.map(m => (
                                <button key={m.id} onClick={() => setMethodId(m.id)} className={`w-full text-left rounded-xl border px-4 py-3 ${methodId === m.id ? 'border-caiman-mint bg-caiman-mint/10' : 'border-caiman-navy-500/50 bg-caiman-navy-900/50'}`}>
                                    <div className="text-sm font-semibold text-caiman-slate-50">{m.name}</div>
                                    <div className="text-xs text-caiman-slate-300">{m.type} {m.number}</div>
                                </button>
                            ))}
                            <button onClick={() => setMethodId('__custom__')} className="w-full border border-dashed border-caiman-mint/25 text-caiman-mint hover:bg-caiman-mint/10 font-medium px-4 py-3 rounded-xl text-sm">+ Añadir otra tarjeta</button>
                        </div>
                        {methodId === '__custom__' && (
                            <div className="mt-3 space-y-2">
                                <input value={customMethod} onChange={e => setCustomMethod(e.target.value)} placeholder="Método / Tarjeta" className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" />
                                <input value={customName} onChange={e => setCustomName(e.target.value)} placeholder="Nombre del titular" className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" />
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm text-caiman-slate-300 mb-1">Monto a enviar</label>
                        <div className="relative">
                            <input value={amount} onChange={e => setAmount(e.target.value)} inputMode="numeric" className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 pr-16 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="0.00" />
                            <span className="absolute right-4 top-3.5 text-caiman-mint text-xs font-black">RUB</span>
                        </div>
                        {amount && numeric > demo.balance && (
                            <p className="text-xs mt-1" style={{ color: 'var(--danger)' }}>Saldo insuficiente</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm text-caiman-slate-300 mb-1">Teléfono del familiar</label>
                            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="+53 5 123 4567" />
                        </div>
                        <div>
                            <label className="block text-sm text-caiman-slate-300 mb-1">Nombre del familiar</label>
                            <input value={recipient} onChange={e => setRecipient(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="Nombre completo" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-2xl p-5 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-300">Tasa Demo</span>
                            <span className="text-caiman-mint font-semibold">1 RUB = {demo.rate} CUP</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-300">Enviar</span>
                            <span className="text-caiman-slate-50 font-semibold">{total.toLocaleString('es-ES')} RUB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-300">Tu familiar recibirá</span>
                            <span className="text-caiman-mint font-bold text-lg">{receive.toLocaleString('es-ES')} CUP</span>
                        </div>
                        <button onClick={() => setConfirm(true)} disabled={!valid} className="w-full bg-caiman-mint hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-caiman-navy-900 font-semibold py-3 rounded-xl">Confirmar remesa</button>
                        <div className="text-xs text-caiman-slate-400">Total descontado: {total.toLocaleString('es-ES')} RUB</div>
                    </div>
                </div>
            </div>

            {confirm && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-caiman-navy-800/90 border border-caiman-navy-500/50 rounded-2xl p-6 w-full max-w-lg backdrop-blur-xl">
                        <h3 className="text-xl font-bold text-caiman-slate-50 mb-4">Confirmar remesa</h3>
                        <div className="space-y-2 text-sm text-caiman-slate-300">
                            <div>Enviar: {total.toLocaleString('es-ES')} RUB</div>
                            <div>Recibirá: {receive.toLocaleString('es-ES')} CUP</div>
                            <div>Familiar: {recipient}</div>
                            <div>Teléfono: {phone}</div>
                            <div>Tarjeta: {displayNumber ? displayNumber : displayMethod || method.type}</div>
                            <div>Tasa Demo: 1 RUB = {demo.rate} CUP</div>
                            <div>Total descontado: {total.toLocaleString('es-ES')} RUB</div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setConfirm(false)} className="flex-1 border border-caiman-navy-500/50 text-caiman-slate-200 py-3 rounded-xl">Cancelar</button>
                            <button onClick={submit} className="flex-1 bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold py-3 rounded-xl">Confirmar remesa</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SendRemittanceInline;
