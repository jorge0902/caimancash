import React, { useState, useRef } from 'react';
import { Copy, Check, Upload, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPaymentMethods } from '../config/exchangeRates';
import { createRecharge } from '../config/demoStore';


// Copia con fallback: usa navigator.clipboard si está disponible (contexto seguro),
// si no, cae a un textarea oculto + execCommand (Safari/iOS/webviews).
const copyToClipboard = async (text) => {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (_) {
        // fallback abajo
    }
    try {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(ta);
        return ok;
    } catch (_) {
        return false;
    }
};

const CopyBtn = ({ text }) => {
    const [copied, setCopied] = useState(false);
    const timer = useRef(null);
    const handleCopy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        copyToClipboard(text);
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1800);
    };
    return (
        <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-caiman-navy-700/50 rounded-lg transition-colors text-caiman-slate-200"
            title="Copiar"
            type="button"
        >
            {copied ? <Check className="w-4 h-4 text-caiman-mint" /> : <Copy className="w-4 h-4" />}
        </button>
    );
};

const Recharge = () => {
    const location = useLocation();
        const navigate = useNavigate();
        const urlParams = new URLSearchParams(location.search);
    const currencyParam = urlParams.get('currency')?.toUpperCase() || 'RUB';
    const paymentMethods = getPaymentMethods(currencyParam);

    const [activeTab, setActiveTab] = useState(paymentMethods[0] || 'T-Bank');
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [copiedNum, setCopiedNum] = useState(false);
    const copyTimer = useRef(null);
    const [missingFile, setMissingFile] = useState(false);

    const handleCopyNumber = (e) => {
        e.preventDefault();
        copyToClipboard(tabInfo.number);
        setCopiedNum(true);
        clearTimeout(copyTimer.current);
        copyTimer.current = setTimeout(() => setCopiedNum(false), 1800);
    };

    const handleSubmit = (e) => {
            e.preventDefault();
            if (!file) {
                setMissingFile(true);
                return;
            }
            setMissingFile(false);
            const recharge = createRecharge({
                amount: 0,
                currency: currencyParam === 'RUB' ? 'RUB' : 'AED',
                method: activeTab
            });
            navigate(`/tracking/${recharge.ref}`);
        };

    const handleFileSelect = () => {
        setMissingFile(false);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setMissingFile(false);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setMissingFile(false);
        }
    };

    // Información específica por método de pago
    const getTabInfo = () => {
        // Métodos rusos con números reales
        const rubInfo = {
            'T-Bank': {
                numberLabel: 'T-Bank',
                number: '+7 965 079-97-97',
                masked: '+7 *** 97-97'
            },
            'SberBank': {
                numberLabel: 'SberBank',
                number: '+7 917 587-22-59',
                masked: '+7 *** 22-59'
            },
            'AlfaBank': {
                numberLabel: 'AlfaBank',
                number: 'EN CONSTRUCCIÓN - Disponible próximamente',
                masked: '---'
            },
            'BT-Bank': {
                numberLabel: 'BT-Bank',
                number: 'EN CONSTRUCCIÓN - Disponible próximamente',
                masked: '---'
            }
        };

        if (currencyParam === 'RUB') {
            return rubInfo[activeTab] || rubInfo['T-Bank'];
        }

        // Información para métodos de Dubai (AED)
        const aedInfo = {
            'Aani': {
                numberLabel: 'Aani',
                number: '+971 55 797 6925',
                masked: '+971 ****6925'
            },
            'duPay': {
                numberLabel: 'duPay',
                number: '+971 50 123 4567',
                masked: '+971 ****4567'
            },
            'IBAN': {
                numberLabel: 'IBAN',
                number: 'EN CONSTRUCCIÓN - Disponible próximamente',
                masked: '---'
            }
        };
        return aedInfo[activeTab] || aedInfo['Aani'];
    };

    const tabInfo = getTabInfo();

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-2xl font-bold text-caiman-slate-50 mb-6 text-center">Recargar Saldo</h1>

            <div className="text-center mb-4 text-sm text-caiman-slate-300">
                <span className="font-semibold">{currencyParam === 'RUB' ? 'RUB (₽)' : 'AED (د.إ)'}</span>
            </div>

            <div className="flex overflow-x-auto gap-2 mb-8 bg-caiman-navy-800/70 p-1.5 rounded-xl border border-caiman-navy-500/40 no-scrollbar">
                {paymentMethods.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                            "flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
                            activeTab === tab
                                ? "bg-caiman-navy-800/80 text-caiman-slate-50 border border-caiman-navy-500/50"
                                : "text-caiman-slate-300 hover:text-caiman-slate-50 hover:bg-caiman-navy-800/60"
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-caiman-navy-800/70 border border-caiman-navy-500/50 rounded-2xl p-6 space-y-8 backdrop-blur-sm"
            >
                {/* Transfer Block */}
                                <div className="space-y-4">
                                    {/* Caja explicativa: ¿Cómo recargar tu saldo? */}
                                                                        <div className="w-full bg-caiman-navy-900/50 border border-caiman-mint/20 rounded-xl p-4 space-y-3">
                                                                            <div className="flex items-center gap-2">
                                                                                <Info className="w-5 h-5 text-caiman-mint flex-shrink-0" />
                                                                                <p className="text-sm font-semibold text-caiman-mint">¿Cómo recargar tu saldo?</p>
                                                                            </div>
                                                                            <ol className="space-y-2 mt-3">
                                                                                <li className="flex gap-2.5 items-start">
                                                                                    <span className="w-[22px] h-[22px] flex-shrink-0 flex items-center justify-center rounded-full bg-caiman-mint/10 border border-caiman-mint/25 text-caiman-mint text-xs font-bold">1</span>
                                                                                    <div>
                                                                                        <p className="text-sm font-semibold text-caiman-slate-50">Realiza la transferencia</p>
                                                                                        <p className="text-xs text-caiman-slate-400 leading-relaxed">Envía el importe al número indicado en pantalla.</p>
                                                                                    </div>
                                                                                </li>
                                                                                <li className="flex gap-2.5 items-start">
                                                                                    <span className="w-[22px] h-[22px] flex-shrink-0 flex items-center justify-center rounded-full bg-caiman-mint/10 border border-caiman-mint/25 text-caiman-mint text-xs font-bold">2</span>
                                                                                    <div>
                                                                                        <p className="text-sm font-semibold text-caiman-slate-50">Guarda el comprobante</p>
                                                                                        <p className="text-xs text-caiman-slate-400 leading-relaxed">Conserva el recibo generado por tu banco.</p>
                                                                                    </div>
                                                                                </li>
                                                                                <li className="flex gap-2.5 items-start">
                                                                                    <span className="w-[22px] h-[22px] flex-shrink-0 flex items-center justify-center rounded-full bg-caiman-mint/10 border border-caiman-mint/25 text-caiman-mint text-xs font-bold">3</span>
                                                                                    <div>
                                                                                        <p className="text-sm font-semibold text-caiman-slate-50">Solicita la acreditación</p>
                                                                                        <p className="text-xs text-caiman-slate-400 leading-relaxed">Sube el comprobante y pulsa el botón inferior.</p>
                                                                                    </div>
                                                                                </li>
                                                                            </ol>
                                                                        </div>

                                    <p className="text-sm text-caiman-slate-300 font-medium">Realiza la transferencia a:</p>

                    {['T-Bank', 'SberBank', 'AlfaBank', 'BT-Bank'].includes(activeTab) ||
                     ['Aani', 'duPay', 'IBAN'].includes(activeTab) ? (
                        tabInfo.number.includes('CONSTRUCCIÓN') || tabInfo.number.startsWith('EN ') ? (
                            <div className="bg-caiman-navy-900/60 border border-caiman-mint/20 rounded-xl p-4 text-center text-caiman-mint font-medium">
                                Detalles del método {activeTab} - En construcción
                            </div>
                        ) : (
                            <div className="relative flex items-center justify-between bg-caiman-navy-900/70 border border-caiman-mint/20 rounded-xl p-4">
                                <div>
                                    <p className="text-xs text-caiman-mint font-semibold uppercase tracking-wider mb-1">{tabInfo.numberLabel}</p>
                                    <p className="text-xl font-bold text-caiman-slate-50 tracking-wide">{tabInfo.number}</p>
                                </div>
                                <button
                                    onClick={handleCopyNumber}
                                    className="relative p-2 hover:bg-caiman-navy-800/80 rounded-lg transition-colors text-caiman-mint"
                                    title="Copiar al portapapeles"
                                    type="button"
                                >
                                    {copiedNum ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                    {copiedNum && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 6, scale: 0.8 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap bg-caiman-mint text-caiman-navy-900 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg z-10"
                                        >
                                            ¡Copiado!
                                        </motion.span>
                                    )}
                                </button>
                            </div>
                        )
                    ) : (
                        <div className="bg-caiman-navy-900/60 border border-caiman-mint/20 rounded-xl p-4 text-center text-caiman-mint font-medium">
                            Detalles del método {activeTab} - En construcción
                        </div>
                    )}

                    {/* IBAN info for Dubai */}
                    {currencyParam === 'AED' && activeTab === 'IBAN' && (
                        <div className="bg-background border border-border rounded-xl p-4 space-y-3">
                            <div className="grid gap-1">
                                <p className="text-xs text-text-main/50 font-semibold uppercase">Account Holder Name</p>
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-text-main">Jorge Rodriguez</p>
                                    <CopyBtn text="Jorge Rodriguez" />
                                </div>
                            </div>
                            <div className="grid gap-1">
                                <p className="text-xs text-text-main/50 font-semibold uppercase">Bank Name</p>
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-text-main">Mashreq Bank</p>
                                    <CopyBtn text="Mashreq Bank" />
                                </div>
                            </div>
                            <div className="grid gap-1">
                                <p className="text-xs text-text-main/50 font-semibold uppercase">Account Number</p>
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-text-main">019101498721</p>
                                    <CopyBtn text="019101498721" />
                                </div>
                            </div>
                            <div className="grid gap-1">
                                <p className="text-xs text-text-main/50 font-semibold uppercase">IBAN</p>
                                <div className="flex justify-between items-center">
                                    <p className="font-bold text-text-main break-all">AE020330000019101498721</p>
                                    <CopyBtn text="AE020330000019101498721" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Upload Zone */}
                <div>
                    <p className="text-sm text-text-main/70 font-medium mb-3">Comprobante de pago</p>
                    <div
                        className={clsx(
                            "relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all min-h-[200px]",
                            dragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-text-main/30 bg-background/50",
                            file ? "border-primary bg-primary/5" : "",
                            missingFile ? "border-red-500/70" : ""
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleChange}
                        />

                        {file ? (
                            <div className="text-primary">
                                <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                                <p className="font-semibold text-text-main mb-1">{file.name}</p>
                                <p className="text-sm text-text-main/60">Archivo seleccionado</p>
                            </div>
                        ) : (
                            <div className="text-text-main/40">
                                <Upload className="w-12 h-12 mx-auto mb-3" />
                                <p className="font-semibold text-text-main mb-1">Arrastra el archivo aquí</p>
                                <p className="text-sm">o selecciona archivo para subir</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Aviso: falta subir el comprobante */}
                {missingFile && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.15 }}
                        className="flex items-center gap-2 bg-red-500/15 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 text-sm"
                        role="alert"
                    >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <span>Debes subir el comprobante de transferencia antes de solicitar la acreditación.</span>
                    </motion.div>
                )}

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                >
                    Solicitar acreditación
                </button>
            </motion.div>
        </div>
    );
};

export default Recharge;