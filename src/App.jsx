import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import Recharge from './pages/Recharge';
import Profile from './pages/Profile';
import Activity from './pages/Activity';
import MobileBannerPreview from './pages/MobileBannerPreview';
import SendRemittance from './pages/SendRemittance';
import Tracking from './pages/Tracking';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recharge" element={<Recharge />} />
        <Route path="profile" element={<Profile />} />
        <Route path="activity" element={<Activity />} />
        <Route path="mobile-banner" element={<MobileBannerPreview />} />
        <Route path="send" element={<SendRemittance />} />
        <Route path="tracking/:ref" element={<Tracking />} />
        {/* Tracking route removed temporarily */}
        {/* Placeholder for history if needed, otherwise it will be blank */}
        <Route path="history" element={<div className="p-8 text-center text-gray-500">Historial de órdenes (Próximamente)</div>} />
      </Route>
    </Routes>
  );
};

export default App;
