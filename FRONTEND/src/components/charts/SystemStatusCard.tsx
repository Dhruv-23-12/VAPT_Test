import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgress } from '../common/CircularProgress';

function SystemStatusCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-gradient-to-br from-[#081B28] to-[#0C1F2E] border border-cyan-500/20 rounded-xl p-6 shadow-lg shadow-cyan-500/10 backdrop-blur-sm h-full"
      role="region"
      aria-label="System Status"
    >
      <h3 className="text-lg font-semibold text-white mb-6">System Status</h3>
      <div className="grid grid-cols-2 gap-6">
        <CircularProgress percentage={87} label="Scanner Health" color="green" size={100} />
        <CircularProgress percentage={94} label="Database Status" color="cyan" size={100} />
        <CircularProgress percentage={76} label="API Response" color="purple" size={100} />
        <CircularProgress percentage={91} label="Network Status" color="pink" size={100} />
      </div>
    </motion.div>
  );
}

export default SystemStatusCard; 