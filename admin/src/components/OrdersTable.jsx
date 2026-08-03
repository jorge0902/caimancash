import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Eye, CheckCircle, Smartphone, Wallet } from 'lucide-react';

const mockOrders = [
    { id: '#ORD-7829', client: 'Ana García', amount: '500 AED', type: 'Remesa', status: 'verified', date: 'Hace 5 min' },
    { id: '#ORD-7830', client: 'Carlos Pérez', amount: '150 AED', type: 'Recarga', status: 'pending', date: 'Hace 12 min' },
    { id: '#ORD-7831', client: 'Roberto Díaz', amount: '1200 AED', type: 'Remesa', status: 'completed', date: 'Hace 1 hora' },
    { id: '#ORD-7832', client: 'María Rodriguez', amount: '350 AED', type: 'Internet', status: 'dispute', date: 'Hace 2 horas' },
    { id: '#ORD-7833', client: 'Elena Torres', amount: '800 AED', type: 'Remesa', status: 'on_way', date: 'Hace 3 horas' },
];

const statusConfig = {
    pending: { label: 'Por Revisar', color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
    verified: { label: 'De Camino', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    on_way: { label: 'En Reparto', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
    completed: { label: 'Entregado', color: 'bg-primary/10 text-primary border-primary/20' },
    dispute: { label: 'Disputa', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
};

export function OrdersTable() {
    const [filter, setFilter] = useState('all');

    return (
        <div className="bg-surface border border-border rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
            {/* Header & Filters */}
            <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 justify-between items-center bg-surface/50">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    Órdenes Recientes
                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">Live</span>
                </h2>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar por ID, nombre..."
                            className="w-full bg-background border border-border rounded-lg pl-9 pr-4 py-2 text-sm text-text-main focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>
                    <button className="p-2 border border-border rounded-lg hover:bg-white/5 text-text-muted hover:text-white transition-colors">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-2 border-b border-border overflow-x-auto no-scrollbar">
                {['Todos', 'Por Revisar', 'De Camino', 'Entregados', 'Problemas'].map((tab) => (
                    <button
                        key={tab}
                        className="px-3 py-1.5 text-sm font-medium rounded-md text-text-muted hover:text-white hover:bg-white/5 whitespace-nowrap transition-colors"
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-background sticky top-0 z-10">
                        <tr>
                            <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID Orden</th>
                            <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Monto</th>
                            <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {mockOrders.map((order) => {
                            const status = statusConfig[order.status] || statusConfig.pending;
                            return (
                                <tr key={order.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-mono text-sm text-text-main font-medium">{order.id}</span>
                                        <p className="text-xs text-text-muted mt-0.5">{order.date}</p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-text-muted">
                                                {order.client.charAt(0)}
                                            </div>
                                            <span className="text-sm text-text-main">{order.client}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm font-bold text-white">{order.amount}</span>
                                        <p className="text-xs text-text-muted mt-0.5 flex items-center gap-1">
                                            {order.type === 'Recarga' ? <Smartphone size={10} /> : <Wallet size={10} />}
                                            {order.type}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>
                                            {status.label}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <button className="p-1.5 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors" title="Ver detalles">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-1.5 hover:bg-green-500/20 hover:text-green-500 rounded-lg transition-colors" title="Aprobar">
                                                <CheckCircle size={16} />
                                            </button>
                                            <button className="p-1.5 hover:bg-white/10 text-text-muted hover:text-white rounded-lg transition-colors">
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
