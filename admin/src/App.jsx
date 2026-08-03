import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, Users, MessageSquare, Menu, X, LogOut, Bell } from 'lucide-react';
import { StatsGrid } from './components/StatsGrid';
import { OrdersTable } from './components/OrdersTable';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background text-text-main flex font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:relative lg:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-border">
            <span className="text-xl font-bold text-primary tracking-tight">Caimán<span className="text-white">Panel</span></span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-medium">
              <LayoutDashboard size={20} />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-white/5 hover:text-white transition-colors font-medium">
              <ShoppingBag size={20} />
              Órdenes
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-white/5 hover:text-white transition-colors font-medium">
              <Users size={20} />
              Clientes
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-text-muted hover:bg-white/5 hover:text-white transition-colors font-medium">
              <MessageSquare size={20} />
              Mensajes
            </a>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Admin</p>
                <p className="text-xs text-text-muted truncate">admin@caimancash.com</p>
              </div>
              <LogOut size={18} className="text-text-muted hover:text-red-400 transition-colors" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-4 lg:px-8">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 text-text-muted hover:text-white"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            <button className="p-2 text-text-muted hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Page Title */}
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">Panel de Control</h1>
              <p className="text-text-muted mt-1">Bienvenido al centro de operaciones de Caimán Cash.</p>
            </div>

            {/* Metrics Grid */}
            <StatsGrid />

            {/* Orders Table */}
            <div className="h-[600px]">
              <OrdersTable />
            </div>

          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
