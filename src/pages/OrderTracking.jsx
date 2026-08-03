import React, { useState } from 'react';
import CaimanTrack from '../components/CaimanTrack';
import { RefreshCcw } from 'lucide-react';

const OrderTracking = () => {
    const [status, setStatus] = useState('verifying');

    const steps = [
        { value: 'verifying', label: '1. Verificando' },
        { value: 'approved', label: '2. Aprobado' },
        { value: 'en_route', label: '3. En Camino' },
        { value: 'delivery_point', label: '4. En Punto' },
        { value: 'delivered', label: '5. Entregado' },
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Rastreo de Orden #CM-8521</h1>

            <CaimanTrack
                currentStatus={status}
                onConfirmReceipt={() => setStatus('delivered')}
            />

            {/* Demo Controls */}
            <div className="mt-12 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 mb-4 text-gray-500 font-semibold text-sm uppercase tracking-wider">
                    <RefreshCcw className="w-4 h-4" /> Control de Demo
                </div>
                <div className="flex flex-wrap gap-2">
                    {steps.map((step) => (
                        <button
                            key={step.value}
                            onClick={() => setStatus(step.value)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${status === step.value
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {step.label}
                        </button>
                    ))}
                </div>
                <p className="mt-4 text-xs text-gray-400">
                    * En producción, este estado se actualizaría automáticamente desde Supabase.
                </p>
            </div>
        </div>
    );
};

export default OrderTracking;
