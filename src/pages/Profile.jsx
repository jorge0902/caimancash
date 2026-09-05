import React, { useState } from 'react';
import { User, MapPin, Phone, Lock, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('Usuario');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSave = () => {
        // Demo: conservar los datos no es necesario (mock)
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-caiman-navy-700/50 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-caiman-slate-50" />
                </button>
                <h1 className="text-2xl font-bold text-caiman-slate-50">Perfil y Configuración</h1>
            </div>

            <div className="bg-caiman-navy-800/70 rounded-2xl border border-caiman-navy-500/50 p-8 space-y-6 backdrop-blur-sm">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-caiman-slate-300/80">Nombre(s)</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-caiman-slate-400/60" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-caiman-mint/60 text-caiman-slate-50 placeholder-caiman-slate-400/50"
                                placeholder="Tu nombre"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-caiman-slate-300/80">Apellidos (opcional)</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-caiman-mint/60 text-caiman-slate-50 placeholder-caiman-slate-400/50"
                            placeholder="Tus apellidos"
                        />
                    </div>
                </div>

                {/* Country */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-caiman-slate-300/80">País</label>
                    <div className="flex items-center w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-lg py-3 pl-10 pr-4 text-caiman-slate-50">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-caiman-slate-400/60" />
                                            <svg viewBox="0 0 3 2" className="w-6 h-4 mr-2 rounded-[2px] flex-shrink-0" aria-hidden="true">
                                                <rect width="3" height="2" fill="#fff" />
                                                <rect y="0.67" width="3" height="0.66" fill="#0039A6" />
                                                <rect y="1.33" width="3" height="0.67" fill="#D52B1E" />
                                            </svg>
                                            <span className="font-medium">Rusia</span>
                                        </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-caiman-slate-300/80">Teléfono recomendado</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-caiman-slate-400/60" />
                        <div className="absolute left-10 top-1/2 -translate-y-1/2 font-medium text-caiman-slate-400/70 pl-1">+7</div>
                                                <input
                                                    type="tel"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="w-full bg-caiman-navy-900/60 border border-caiman-navy-500/50 rounded-lg py-3 pl-20 pr-4 focus:outline-none focus:ring-2 focus:ring-caiman-mint/60 text-caiman-slate-50 placeholder-caiman-slate-400/50"
                                                    placeholder="965 123-45-67"
                                                />
                    </div>
                </div>

                <div className="border-t border-caiman-navy-500/40 pt-6 mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <button className="flex items-center justify-center gap-2 text-caiman-slate-300/80 hover:text-caiman-slate-50 font-medium px-4 py-2 hover:bg-caiman-navy-700/40 rounded-lg transition-colors">
                        <Lock className="w-4 h-4" />
                        Cambiar contraseña
                    </button>

                    <div className="flex items-center gap-3">
                                            <button onClick={() => navigate(-1)} className="px-4 py-2 text-sm text-caiman-slate-300 font-medium hover:bg-caiman-navy-700/40 rounded-lg transition-colors">
                                                Atrás
                                            </button>
                                            <button onClick={handleSave} className="bg-caiman-mint hover:brightness-110 text-caiman-navy-900 px-4 py-2 text-sm rounded-lg font-bold shadow-md shadow-caiman-mint/20 transition-all flex items-center gap-1.5">
                                                <Save className="w-4 h-4" />
                                                Guardar cambios
                                            </button>
                                        </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;