import React, { useState } from 'react';
import { Copy, Upload, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { getPaymentMethods } from '../config/exchangeRates';


const CopyBtn = ({ text }) => (
    <button
        onClick={() => navigator.clipboard.writeText(text)}
        className="p-1.5 hover:bg-secondary/50 rounded-lg transition-colors text-text-main/60"
        title="Copiar"
    >
        <Copy className="w-4 h-4" />
    </button>
);

const Recharge = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const currencyParam = urlParams.get('currency')?.toUpperCase() || 'RUB';
    const paymentMethods = getPaymentMethods(currencyParam);
    
    const [activeTab, setActiveTab] = useState(paymentMethods[0] || 'T-Bank');
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);

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
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    // Información específica por método de pago
    const getTabInfo = () => {
        // Métodos rusos con números reales
        const rubInfo = {
            'T-Bank': {
                numberLabel: 'Номер T-Bank',
                number: '+7 965 079-97-97',
                masked: '+7 *** 97-97'
            },
            'SberBank': {
                numberLabel: 'Номер SberBank',
                number: '+7 917 587-22-59',
                masked: '+7 *** 22-59'
            },
            'AlfaBank': {
                numberLabel: 'Номер AlfaBank',
                number: 'EN CONSTRUCCIÓN - Disponible próximamente',
                masked: '---'
            },
            'BT-Bank': {
                numberLabel: 'Номер BT-Bank',
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
                numberLabel: 'Número Aani',
                number: '+971 55 797 6925',
                masked: '+971 ****6925'
            },
            'duPay': {
                numberLabel: 'Número duPay',
                number: '+971 50 123 4567',
                masked: '+971 ****4567'
            },
            'IBAN': {
                numberLabel: 'IBAN (IBAN)',
                number: 'EN CONSTRUCCIÓN - Disponible próximamente',
                masked: '---'
            }
        };
        return aedInfo[activeTab] || aedInfo['Aani'];
    };

    const tabInfo = getTabInfo();

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-2xl font-bold text-text-main mb-6 text-center">Recargar Saldo</h1>

            {/* Moneda activa */}
            <div className="text-center mb-4 text-sm text-text-main/60">
                <span className="font-semibold">{currencyParam === 'RUB' ? 'RUB (₽)' : 'AED (د.إ)'}</span>
            </div>

            {/* Tabs */}
            <div className="flex overflow-x-auto gap-2 mb-8 bg-secondary p-1.5 rounded-xl no-scrollbar">
                {paymentMethods.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={clsx(
                            "flex-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap",
                            activeTab === tab
                                ? "bg-background text-text-main shadow-sm"
                                : "text-text-main/50 hover:text-text-main hover:bg-background/50"
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
                className="bg-secondary rounded-2xl shadow-sm border border-border p-6 space-y-8 transition-colors duration-300"
            >
                {/* Transfer Block */}
                <div className="space-y-4">
                    <p className="text-sm text-text-main/70 font-medium">Realiza la transferencia a:</p>

                    {['T-Bank', 'SberBank', 'AlfaBank', 'BT-Bank'].includes(activeTab) ||
                     ['Aani', 'duPay', 'IBAN'].includes(activeTab) ? (
                        tabInfo.number.includes('CONSTRUCCIÓN') || tabInfo.number.startsWith('EN ') ? (
                            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center text-orange-600 font-medium">
                                Detalles del método {activeTab} - En construcción
                            </div>
                        ) : (
                            <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-xl p-4">
                                <div>
                                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">{tabInfo.numberLabel}</p>
                                    <p className="text-xl font-bold text-text-main tracking-wide">{tabInfo.number}</p>
                                </div>
                                <button
                                    onClick={() => navigator.clipboard.writeText(tabInfo.number)}
                                    className="p-2 hover:bg-background rounded-lg transition-colors text-primary"
                                    title="Copiar al portapapeles"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                        )
                    ) : (
                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center text-orange-600 font-medium">
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
                            file ? "border-primary bg-primary/5" : ""
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

                {/* Submit Button */}
                <button className="w-full bg-primary hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
                    Solicitar acreditación
                </button>
            </motion.div>
        </div>
    );
};

export default Recharge;