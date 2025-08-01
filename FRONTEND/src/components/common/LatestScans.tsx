import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

type ScanStatus = 'completed' | 'running' | 'failed';
type ScanSeverity = 'high' | 'medium' | 'low';

interface Scan {
  id: number;
  target: string;
  type: string;
  status: ScanStatus;
  severity: ScanSeverity;
  time: string;
  findings: number;
}

const scans: Scan[] = [
  {
    id: 1,
    target: '192.168.1.100',
    type: 'Port Scan',
    status: 'completed',
    severity: 'high',
    time: '2 hours ago',
    findings: 12
  },
  {
    id: 2,
    target: 'api.company.com',
    type: 'Web Application',
    status: 'running',
    severity: 'medium',
    time: '5 minutes ago',
    findings: 0
  },
  {
    id: 3,
    target: '10.0.0.50',
    type: 'Vulnerability Scan',
    status: 'completed',
    severity: 'low',
    time: '1 day ago',
    findings: 3
  },
  {
    id: 4,
    target: 'mail.company.com',
    type: 'SSL/TLS Check',
    status: 'failed',
    severity: 'high',
    time: '3 hours ago',
    findings: 0
  }
];

const statusIcons = {
  completed: CheckCircle,
  running: Clock,
  failed: XCircle
};

const statusColors = {
  completed: 'text-green-400',
  running: 'text-blue-400',
  failed: 'text-red-400'
};

const severityColors = {
  high: 'bg-red-500/20 border-red-500/30 text-red-400',
  medium: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400',
  low: 'bg-green-500/20 border-green-500/30 text-green-400'
};

function LatestScans() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-gradient-to-br from-[#081B28] to-[#0C1F2E] border border-cyan-500/20 rounded-xl p-6 shadow-lg shadow-cyan-500/10 backdrop-blur-sm"
      aria-label="Latest vulnerability and port scans"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Latest Scans</h3>
        <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4" role="list">
        {scans.map((scan, index) => {
          const StatusIcon = statusIcons[scan.status];
          return (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 border border-gray-600/20 rounded-lg p-4 hover:border-cyan-500/30 transition-all cursor-pointer"
              role="listitem"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <StatusIcon className={`w-5 h-5 ${statusColors[scan.status]}`} />
                  <div>
                    <p className="text-white font-medium">{scan.target}</p>
                    <p className="text-gray-400 text-sm">{scan.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${severityColors[scan.severity]}`}>
                    {scan.severity.toUpperCase()}
                  </span>
                  
                  {scan.findings > 0 && (
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      <span className="text-orange-400 text-sm font-medium">{scan.findings}</span>
                    </div>
                  )}
                  
                  <span className="text-gray-400 text-sm">{scan.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default LatestScans; 