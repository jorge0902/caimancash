import React from 'react';
import { ShoppingBag, Clock, TrendingUp, Wallet } from 'lucide-react';

const stats = [
    {
        title: 'Órdenes Totales',
        value: '1,245',
        change: '+12%',
        icon: ShoppingBag,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10'
    },
    {
        title: 'Pendientes',
        value: '23',
        change: '4 urgentes',
        icon: Clock,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10'
    },
    {
        title: 'Volumen AED (Hoy)',
        value: '45,200',
        change: '+8.1%',
        icon: TrendingUp,
        color: 'text-primary',
        bg: 'bg-primary/10'
    },
    {
        title: 'Saldo Socios (USDT)',
        value: '12,850',
        change: 'Disponible',
        icon: Wallet,
        color: 'text-purple-500',
        bg: 'bg-purple-500/10'
    },
];

export function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <div key={index} className="bg-surface border border-border rounded-xl p-6 hover:border-primary/50 transition-colors cursor-pointer group">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${stat.change.includes('+') ? 'text-primary bg-primary/10' : 'text-text-muted bg-white/5'}`}>
                            {stat.change}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-text-muted text-sm font-medium">{stat.title}</h3>
                        <p className="text-2xl font-bold text-white mt-1 group-hover:text-primary transition-colors">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
