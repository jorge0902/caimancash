import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDemo, saveDemo, createRemittance, addMethod } from '../config/demoStore';

const SendRemittance = () => {
    const [demo, setDemo] = useState(getDemo());
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [phone, setPhone] = useState('');
    const [methodId, setMethodId] = useState(demo.methods[0]?.id || '');
    const [customMethod, setCustomMethod] = useState('');
    const [customName, setCustomName] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        setDemo(getDemo());
    }, []);

    const numeric = useMemo(() => Number(amount || 0), [amount]);
    const receive = useMemo(() => Math.round(numeric * demo.rate), [numeric, demo.rate]);
    const serviceCost = 0;
    const total = useMemo(() => numeric + serviceCost, [numeric]);
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
        setDemo(getDemo());
    };

    if (success) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-caiman-slate-50 mb-2">Remesa creada correctamente</h2>
                    <p className="text-sm text-caiman-slate-300 mb-4">Referencia: {success.ref}</p>
                    <div className="space-y-2 text-sm text-caiman-slate-300">
                        <div>Enviado: {success.amount} {success.currency}</div>
                        <div>A recibir: {success.receiveAmount} {success.receiveCurrency}</div>
                        <div>Destinatario: {success.recipient}</div>
                        <div>Teléfono: {success.phone}</div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <Link to={`/tracking/${success.ref}`} className="bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold px-5 py-3 rounded-xl">Ver seguimiento</Link>
                        <Link to="/send" className="border border-caiman-mint/25 text-caiman-mint hover:bg-caiman-mint/10 font-medium px-5 py-3 rounded-xl">Nueva remesa</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-2xl font-bold text-caiman-slate-50 mb-6">Enviar remesa</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-5 backdrop-blur-sm space-y-4">
                        <div>
                            <label className="block text-sm text-caiman-slate-300 mb-1">Monto a enviar (RUB)</label>
                            <input value={amount} onChange={e => setAmount(e.target.value)} inputMode="numeric" className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="0.00" />
                            {amount && numeric > demo.balance && (
                                <p className="text-xs text-red-400 mt-1">Saldo insuficiente</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm text-caiman-slate-300 mb-1">Nombre completo del familiar</label>
                            <input value={recipient} onChange={e => setRecipient(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="María Rodríguez" />
                        </div>
                        <div>
                            <label className="block text-sm text-caiman-slate-300 mb-1">Teléfono</label>
                            <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="+53 5 123 4567" />
                        </div>
                        <div>
                            <label className="block text-sm text-caiman-slate-300 mb-1">Método de recepción</label>
                            <select value={methodId} onChange={e => setMethodId(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint">
                                {demo.methods.map(m => (
                                    <option key={m.id} value={m.id}>{m.type} {m.number} — {m.name}</option>
                                ))}
                                <option value="__custom__">+ Añadir método</option>
                            </select>
                            {methodId === '__custom__' && (
                                <div className="mt-3 space-y-2">
                                    <input value={customMethod} onChange={e => setCustomMethod(e.target.value)} placeholder="Método / Tarjeta" className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" />
                                    <input value={customName} onChange={e => setCustomName(e.target.value)} placeholder="Nombre del titular" className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-5 backdrop-blur-sm space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-300">Tasa Demo</span>
                            <span className="text-caiman-mint font-semibold">1 RUB = {demo.rate} CUP</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-300">Familiar recibirá</span>
                            <span className="text-caiman-slate-50 font-semibold">{receive.toLocaleString('es-ES')} CUP</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-300">Costo de servicio</span>
                            <span className="text-caiman-slate-50 font-semibold">{serviceCost} RUB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-300">Total descontado</span>
                            <span className="text-caiman-slate-50 font-semibold">{total.toLocaleString('es-ES')} RUB</span>
                        </div>
                        <button onClick={() => setConfirm(true)} disabled={!valid} className="w-full bg-caiman-mint hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-caiman-navy-900 font-semibold py-3 rounded-xl">Confirmar remesa</button>
                        <div className="text-xs text-caiman-slate-400">Saldo disponible: {demo.balance.toLocaleString('es-ES')} RUB</div>
                    </div>
                </div>
            </div>

            {confirm && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-caiman-navy-800/90 border border-caiman-navy-500/50 rounded-2xl p-6 w-full max-w-lg backdrop-blur-xl">
                        <h3 className="text-xl font-bold text-caiman-slate-50 mb-4">Confirmar remesa</h3>
                        <div className="space-y-2 text-sm text-caiman-slate-300">
                            <div>Enviar: {numeric.toLocaleString('es-ES')} RUB</div>
                            <div>Familiar: {recipient}</div>
                            <div>Teléfono: {phone}</div>
                            <div>Método: {displayMethod || method.type}</div>
                            <div>El familiar recibirá: {receive.toLocaleString('es-ES')} CUP</div>
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

export default SendRemittance;
