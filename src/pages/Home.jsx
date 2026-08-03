import React from 'react';
import BalanceCard from '../components/BalanceCard';
import RemittanceWidget from '../components/RemittanceWidget';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Top Section: Account Status */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <BalanceCard />
            </motion.section>

            {/* Main Section: Widget */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center"
            >
                <RemittanceWidget />
            </motion.section>
        </div>
    );
};

export default Home;
