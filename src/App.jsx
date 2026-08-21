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
import History from './pages/History';
import Account from './pages/Account';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="cuenta" element={<Account />} />
        <Route path="enviar-remesa" element={<SendRemittance />} />
        <Route path="send" element={<SendRemittance />} />
        <Route path="tracking/:ref" element={<Tracking />} />
        <Route path="mis-remesas" element={<History />} />
        <Route path="history" element={<History />} />
        <Route path="recharge" element={<Recharge />} />
        <Route path="profile" element={<Profile />} />
        <Route path="activity" element={<Activity />} />
        <Route path="mobile-banner" element={<MobileBannerPreview />} />
      </Route>
    </Routes>
  );
};

export default App;
