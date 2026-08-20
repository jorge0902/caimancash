import React from 'react';
import { User, MapPin, Phone, Lock, Save, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 text-text-main" />
                </button>
                <h1 className="text-2xl font-bold text-text-main">Perfil y Configuración</h1>
            </div>

            <div className="bg-secondary rounded-2xl shadow-sm border border-border p-8 space-y-6 transition-colors duration-300">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-main/80">Nombre(s)</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-main/40" />
                            <input type="text" className="w-full bg-background border border-border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary text-text-main" placeholder="Tu nombre" defaultValue="Usuario" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-text-main/80">Apellidos (opcional)</label>
                        <input type="text" className="w-full bg-background border border-border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-text-main" placeholder="Tus apellidos" />
                    </div>
                </div>

                {/* Country */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-main/80">País</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-main/40" />
                        <select className="w-full bg-background border border-border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary appearance-none text-text-main">
                            <option value="AE">Emiratos Árabes Unidos (UAE) 🇦🇪</option>
                        </select>
                    </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-text-main/80">Teléfono recomendado</label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-main/40" />
                        <div className="absolute left-10 top-1/2 -translate-y-1/2 font-medium text-text-main/60 pl-1">+971</div>
                        <input type="tel" className="w-full bg-background border border-border rounded-lg py-3 pl-20 pr-4 focus:outline-none focus:ring-2 focus:ring-primary text-text-main" placeholder="50 123 4567" />
                    </div>
                </div>

                <div className="border-t border-border pt-6 mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <button className="flex items-center justify-center gap-2 text-text-main/70 hover:text-text-main font-medium px-4 py-2 hover:bg-background rounded-lg transition-colors">
                        <Lock className="w-4 h-4" />
                        Cambiar contraseña
                    </button>

                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="px-6 py-2.5 text-text-main font-medium hover:bg-background rounded-lg transition-colors">
                            Atrás
                        </button>
                        <button className="bg-primary hover:opacity-90 text-white px-6 py-2.5 rounded-lg font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2">
                            <Save className="w-5 h-5" />
                            Guardar cambios
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;
