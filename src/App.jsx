import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Recharge from './pages/Recharge';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recharge" element={<Recharge />} />
        <Route path="profile" element={<Profile />} />
        {/* Tracking route removed temporarily */}
        {/* Placeholder for history if needed, otherwise it will be blank */}
        <Route path="history" element={<div className="p-8 text-center text-gray-500">Historial de órdenes (Próximamente)</div>} />
      </Route>
    </Routes>
  );
};

export default App;
