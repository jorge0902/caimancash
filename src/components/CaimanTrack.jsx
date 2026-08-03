import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calculator, Check, Banknote, MapPin, PartyPopper, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

const STATUS_STEPS = [
    { id: 'verifying', label: 'Bajo Verificación', description: 'Estamos confirmando tu depósito en Dubái', icon: Search },
    { id: 'approved', label: 'Pago Aprobado', description: 'Fondos verificados. Tu orden ha sido publicada', icon: Check },
    { id: 'en_route', label: 'En Camino', description: 'Un repartidor en Cuba ha tomado tu orden', icon: Banknote },
    { id: 'delivery_point', label: 'En Punto de Entrega', description: 'Nuestro socio está en la ubicación', icon: MapPin },
    { id: 'delivered', label: 'Entregado', description: 'Remesa entregada con éxito', icon: PartyPopper },
];

const CaimanTrack = ({ currentStatus = 'verifying', onConfirmReceipt }) => {
    const currentIndex = STATUS_STEPS.findIndex(step => step.id === currentStatus);

    return (
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <span className="text-2xl">🐊</span> Seguimiento de Envío
            </h2>

            <div className="relative pl-4">
                {/* Background Line */}
                <div className="absolute left-[19px] top-2 bottom-2 w-1 bg-gray-100 rounded-full -z-10" />

                {/* Progress Line (Animated) */}
                <motion.div
                    className="absolute left-[19px] top-2 w-1 bg-[#2DD4BF] rounded-full -z-10 origin-top"
                    initial={{ height: '0%' }}
                    animate={{ height: `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}% ` }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                />

                <div className="space-y-8">
                    {STATUS_STEPS.map((step, index) => {
                        const isCompleted = index <= currentIndex;
                        const isCurrent = index === currentIndex;
                        const StepIcon = step.icon;

                        return (
                            <div key={step.id} className="relative flex items-start gap-4 group">
                                {/* Node Icon */}
                                <div
                                    className={clsx(
                                        "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 bg-white shrink-0",
                                        isCompleted
                                            ? "border-[#2DD4BF] text-[#2DD4BF]"
                                            : "border-gray-200 text-gray-300"
                                    )}
                                >
                                    {isCompleted ? (
                                        isCurrent && index !== STATUS_STEPS.length - 1 ? (
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            >
                                                <StepIcon className="w-5 h-5" />
                                            </motion.div>
                                        ) : (
                                            <CheckCircle2 className="w-6 h-6" />
                                        )
                                    ) : (
                                        <div className="w-3 h-3 rounded-full bg-gray-200" />
                                    )}

                                    {/* Travelling Caiman Animation */}
                                    {isCurrent && index < STATUS_STEPS.length - 1 && (
                                        <motion.div
                                            className="absolute top-10 left-1/2 -translate-x-1/2 text-2xl z-20 pointer-events-none"
                                            initial={{ y: 0, opacity: 0 }}
                                            animate={{ y: [0, 20, 40], opacity: [0, 1, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        >
                                            🐊
                                        </motion.div>
                                    )}
                                </div>

                                {/* Text Content */}
                                <div className={clsx("flex-1 pt-1", isCompleted ? "opacity-100" : "opacity-60")}>
                                    <div className="flex justify-between items-start">
                                        <h3 className={clsx("font-bold text-base", isCurrent ? "text-[#2DD4BF]" : "text-gray-900")}>
                                            {step.label}
                                        </h3>
                                        {isCompleted && (
                                            <span className="text-xs font-mono text-gray-400">Hoy, 2:30 PM</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">{step.description}</p>

                                    {/* Action Button for Delivery */}
                                    {step.id === 'delivery_point' && isCurrent && (
                                        <motion.button
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            onClick={onConfirmReceipt}
                                            className="mt-4 bg-[#2DD4BF] hover:bg-[#26b8a5] text-white text-sm font-bold px-4 py-2 rounded-lg shadow-md transition-all active:scale-95 flex items-center gap-2"
                                        >
                                            Confirmar Recepción ✅
                                        </motion.button>
                                    )}

                                    {/* Delivered State Message */}
                                    {step.id === 'delivered' && isCompleted && (
                                        <div className="mt-2 text-green-600 text-sm font-medium bg-green-50 px-3 py-1 rounded-lg inline-block">
                                            ¡Orden completada!
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CaimanTrack;
