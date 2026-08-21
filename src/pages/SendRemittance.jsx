import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDemo, addMethod, createRemittance } from '../config/demoStore';

const SendRemittance = ({ onCreated }) => {
    const [demo, setDemo] = useState(getDemo());
    const [step, setStep] = useState('method'); // method | details | confirm | created
    
    const [methodId, setMethodId] = useState(() => getDemo().methods[0]?.id || '');
    const [customMethod, setCustomMethod] = useState('');
    const [customName, setCustomName] = useState('');
    const [customPhone, setCustomPhone] = useState('');
    const [customNumber, setCustomNumber] = useState('');
    
    const [amount, setAmount] = useState('');
    const [phone, setPhone] = useState('');
    const [recipient, setRecipient] = useState('');
    const [created, setCreated] = useState(null);
    
    useEffect(() => {
        setDemo(getDemo());
    }, []);
    
    const numeric = useMemo(() => Number(amount || 0), [amount]);
    const receive = useMemo(() => Math.round(numeric * demo.rate), [numeric, demo.rate]);
    const total = numeric;
    const valid = numeric > 0 && recipient.trim() && phone.trim() && methodId && numeric <= demo.balance;
    
    const method = demo.methods.find(m => m.id === methodId) || {};
    
    const prefillFromMethod = (m) => {
        if (m.name) setRecipient(m.name);
        if (m.phone) setPhone(m.phone);
    };
    
    const handleSelectMethod = (id, m) => {
        setMethodId(id);
        prefillFromMethod(m);
        setStep('details');
    };
    
    const handleAddMethod = () => {
        if (!customName.trim() || !customPhone.trim() || !customMethod.trim()) return;
        const m = addMethod({
            type: customMethod.trim(),
            number: customNumber.trim() || '•••• ' + Math.floor(1000 + Math.random() * 9000),
            name: customName.trim(),
            phone: customPhone.trim()
        });
        setCustomMethod('');
        setCustomName('');
        setCustomPhone('');
        setCustomNumber('');
        setMethodId(m.id);
        prefillFromMethod(m);
        setStep('details');
    };
    
    const submit = () => {
        if (!valid) return;
        const remit = createRemittance({
            amount: numeric,
            recipient: recipient.trim(),
            phone: phone.trim(),
            method: method.type,
            methodNumber: method.number || ''
        });
        setCreated(remit);
        setStep('created');
        setDemo(getDemo());
        onCreated && onCreated();
    };
    
    if (step === 'created' && created) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-6">
                        <div className="text-4xl mb-2">✓</div>
                        <h1 className="text-2xl font-bold text-caiman-slate-50">Remesa creada correctamente</h1>
                    </div>
                    
                    <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 mb-6 backdrop-blur-sm space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-400">Referencia</span>
                            <span className="font-bold text-caiman-mint">{created.ref}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-400">Enviado</span>
                            <span className="font-bold">{created.amount.toLocaleString('es-ES')} {created.currency}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-400">A recibir</span>
                            <span className="font-bold text-caiman-mint">{created.receiveAmount.toLocaleString('es-ES')} {created.receiveCurrency}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-400">Destinatario</span>
                            <span className="font-bold">{created.recipient}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-400">Teléfono</span>
                            <span className="font-bold">{created.phone}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-caiman-slate-400">Estado</span>
                            <span className="font-bold text-caiman-mint">{created.statusLabel}</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        <Link to={`/tracking/${created.ref}`} className="flex-1 bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-bold py-4 rounded-2xl text-center transition-all">
                            Ver seguimiento
                        </Link>
                        <Link to="/" className="flex-1 border border-caiman-navy-500/50 text-caiman-slate-200 hover:bg-caiman-navy-800/50 font-semibold py-4 rounded-2xl text-center transition-colors">
                            Volver a mi cuenta
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-3xl mx-auto">
                {step !== 'method' && (
                    <button onClick={() => setStep('method')} className="text-sm text-caiman-mint hover:brightness-110 mb-4 flex items-center gap-2">
                        ← Volver
                    </button>
                )}
                
                <h1 className="text-2xl font-bold text-caiman-slate-50 mb-6">
                    {step === 'method' && '¿Quién recibirá el dinero?'}
                    {step === 'details' && 'Datos de la remesa'}
                    {step === 'confirm' && 'Confirmar remesa'}
                </h1>
                
                {/* PASO 1: Seleccionar método */}
                {step === 'method' && (
                    <div className="space-y-4">
                        <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 backdrop-blur-sm">
                            {demo.methods.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="text-caiman-slate-400 mb-4">No tienes tarjetas guardadas</div>
                                    <div className="text-sm text-caiman-slate-500">Agrega una tarjeta para comenzar</div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {demo.methods.map(m => (
                                        <button 
                                            key={m.id} 
                                            onClick={() => handleSelectMethod(m.id, m)}
                                            className="w-full text-left rounded-xl border border-caiman-navy-500/50 bg-caiman-navy-900/50 px-4 py-4 hover:border-caiman-mint/50 transition-colors"
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <div className="text-sm font-semibold text-caiman-slate-50">{m.name}</div>
                                                    <div className="text-xs text-caiman-slate-400 mt-1">{m.type} {m.number}</div>
                                                </div>
                                                <span className="text-caiman-mint text-sm font-semibold">Seleccionar</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                            
                            <div className="mt-4 pt-4 border-t border-caiman-navy-500/30">
                                <button 
                                    onClick={() => setStep('add-card')}
                                    className="w-full border border-dashed border-caiman-mint/25 text-caiman-mint hover:bg-caiman-mint/10 font-medium px-4 py-3 rounded-xl text-sm transition-colors"
                                >
                                    + Añadir tarjeta
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Añadir tarjeta */}
                {step === 'add-card' && (
                    <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 backdrop-blur-sm space-y-4">
                        <div>
                            <label className="block text-sm text-caiman-slate-300 mb-1">Nombre del familiar</label>
                            <input value={customName} onChange={e => setCustomName(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="Nombre completo" />
                        </div>
                        <div>
                            <label className="block text-sm text-caiman-slate-300 mb-1">Número de tarjeta</label>
                            <input value={customNumber} onChange={e => setCustomNumber(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="•••• 4582" />
                        </div>
                        <div>
                            <label className="block text-sm text-caiman-slate-300 mb-1">Teléfono</label>
                            <input value={customPhone} onChange={e => setCustomPhone(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="+53 5 123 4567" />
                        </div>
                        <div>
                            <label className="block text-sm text-caiman-slate-300 mb-1">Tipo de tarjeta</label>
                            <input value={customMethod} onChange={e => setCustomMethod(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="Tarjeta bancaria" />
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setStep('method')} className="flex-1 border border-caiman-navy-500/50 text-caiman-slate-200 py-3 rounded-xl">Cancelar</button>
                            <button onClick={handleAddMethod} className="flex-1 bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-semibold py-3 rounded-xl">Guardar tarjeta</button>
                        </div>
                    </div>
                )}
                
                {/* PASO 2: Datos de la remesa */}
                {step === 'details' && (
                    <div className="space-y-4">
                        {method && (
                            <div className="bg-caiman-mint/10 border border-caiman-mint/20 rounded-2xl p-4 flex items-center justify-between">
                                <div>
                                    <div className="text-xs text-caiman-slate-400 mb-1">Destinatario seleccionado</div>
                                    <div className="text-sm font-semibold text-caiman-slate-50">{method.name}</div>
                                    <div className="text-xs text-caiman-slate-400">{method.type} {method.number}</div>
                                </div>
                                <button onClick={() => setStep('method')} className="text-xs text-caiman-mint hover:brightness-110">Cambiar</button>
                            </div>
                        )}
                        
                        <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 backdrop-blur-sm space-y-4">
                            <div>
                                <label className="block text-sm text-caiman-slate-300 mb-1">Nombre completo del familiar</label>
                                <input value={recipient} onChange={e => setRecipient(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="Nombre completo" />
                            </div>
                            
                            <div>
                                <label className="block text-sm text-caiman-slate-300 mb-1">Número de teléfono</label>
                                <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 text-caiman-slate-50 outline-none focus:border-caiman-mint" placeholder="+53 5 123 4567" />
                            </div>
                            
                            <div>
                                <label className="block text-sm text-caiman-slate-300 mb-1">¿Cuánto quieres enviar?</label>
                                <div className="relative">
                                    <input value={amount} onChange={e => setAmount(e.target.value)} inputMode="numeric" className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-xl px-4 py-3 pr-16 text-caiman-slate-50 outline-none focus:border-caiman-mint text-2xl font-bold" placeholder="0.00" />
                                    <span className="absolute right-4 top-4 text-caiman-mint text-sm font-black">RUB</span>
                                </div>
                                {amount && numeric > demo.balance && (
                                    <p className="text-xs mt-2 text-red-400">Saldo insuficiente</p>
                                )}
                            </div>
                            
                            <div className="bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-2xl p-5 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-caiman-slate-300">Tasa Demo</span>
                                    <span className="text-caiman-mint font-semibold">1 RUB = {demo.rate} CUP</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-caiman-slate-300">Tu familiar recibirá</span>
                                    <span className="text-caiman-slate-50 font-bold text-lg">{receive.toLocaleString('es-ES')} CUP</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-caiman-slate-300">Se descontarán</span>
                                    <span className="text-caiman-slate-50 font-semibold">{total.toLocaleString('es-ES')} RUB</span>
                                </div>
                                <div className="flex justify-between text-sm pt-2 border-t border-caiman-navy-500/40">
                                    <span className="text-caiman-slate-400">Saldo después</span>
                                    <span className="text-caiman-slate-300 font-semibold">{Math.max(0, demo.balance - total).toLocaleString('es-ES')} RUB</span>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => setStep('confirm')} 
                                disabled={!valid} 
                                className="w-full bg-caiman-mint hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed text-caiman-navy-900 font-bold py-4 rounded-2xl transition-all"
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                )}
                
                {/* PASO 3: Confirmar */}
                {step === 'confirm' && (
                    <div className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 backdrop-blur-sm space-y-6">
                        <div className="text-center pb-4 border-b border-caiman-navy-500/30">
                            <div className="text-lg font-bold text-caiman-slate-50 mb-1">Confirmar remesa</div>
                            <div className="text-sm text-caiman-slate-400">Verifica los datos antes de enviar</div>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex justify-between py-2">
                                <span className="text-caiman-slate-400 text-sm">Enviarás</span>
                                <span className="font-bold text-caiman-slate-50">{total.toLocaleString('es-ES')} RUB</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-caiman-slate-400 text-sm">El familiar recibirá</span>
                                <span className="font-bold text-caiman-mint">{receive.toLocaleString('es-ES')} CUP</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-caiman-slate-400 text-sm">Tasa</span>
                                <span className="font-bold text-caiman-slate-50">1 RUB = {demo.rate} CUP</span>
                            </div>
                        </div>
                        
                        <div className="bg-caiman-navy-900/60 rounded-2xl p-4 space-y-2">
                            <div className="text-xs font-bold text-caiman-slate-400 uppercase tracking-wider mb-3">Destinatario</div>
                            <div className="flex justify-between text-sm">
                                <span className="text-caiman-slate-400">Nombre</span>
                                <span className="font-semibold">{recipient}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-caiman-slate-400">Teléfono</span>
                                <span className="font-semibold">{phone}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-caiman-slate-400">Tarjeta</span>
                                <span className="font-semibold">{method.number || method.type}</span>
                            </div>
                        </div>
                        
                        <div className="bg-caiman-navy-900/60 rounded-2xl p-4 space-y-2">
                            <div className="text-xs font-bold text-caiman-slate-400 uppercase tracking-wider mb-3">Saldo</div>
                            <div className="flex justify-between text-sm">
                                <span className="text-caiman-slate-400">Saldo actual</span>
                                <span className="font-semibold">{demo.balance.toLocaleString('es-ES')} RUB</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-caiman-slate-400">Después de la operación</span>
                                <span className="font-bold text-caiman-mint">{Math.max(0, demo.balance - total).toLocaleString('es-ES')} RUB</span>
                            </div>
                        </div>
                        
                        <div className="flex gap-3">
                            <button onClick={() => setStep('details')} className="flex-1 border border-caiman-navy-500/50 text-caiman-slate-200 hover:bg-caiman-navy-800/50 font-semibold py-4 rounded-2xl transition-colors">
                                Volver a editar
                            </button>
                            <button onClick={submit} className="flex-1 bg-caiman-mint hover:brightness-110 text-caiman-navy-900 font-bold py-4 rounded-2xl transition-all">
                                Confirmar y enviar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SendRemittance;
