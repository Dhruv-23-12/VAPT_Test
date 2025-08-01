import React, { useState } from 'react';
import { Cloud, Zap, Shield, FileText, Users, Settings, CheckCircle, PlusCircle, Upload, ChevronDown, ChevronUp, Lock, Key, UserCheck, UserPlus, HelpCircle, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const scanTypes = [
  {
    category: 'Light Scans',
    description: 'Nmap, WhatWeb',
    icon: <Cloud className="w-5 h-5 text-blue-500" />, // Placeholder
    key: 'light',
  },
  {
    category: 'Medium Scans',
    description: 'Nikto, SSLyze, Dirsearch, ZAP Passive',
    icon: <Zap className="w-5 h-5 text-blue-500" />,
    key: 'medium',
  },
  {
    category: 'Deep Scans',
    description: 'ZAP Active, WPScan, CMS Scanner',
    icon: <Shield className="w-5 h-5 text-blue-500" />,
    key: 'deep',
  },
  {
    category: 'Authenticated Scans',
    description: 'ZAP + Selenium',
    icon: <Key className="w-5 h-5 text-blue-500" />,
    key: 'authenticated',
  },
  {
    category: 'Manual Pentesting',
    description: 'Optional add-on',
    icon: <UserCheck className="w-5 h-5 text-blue-500" />,
    key: 'manual',
  },
];

const complianceOptions = [
  'PCI-DSS',
  'ISO 27001',
  'SOC 2',
  'HIPAA',
  'GDPR',
];

const reportFormats = ['PDF', 'JSON', 'CSV'];
const deliveryOptions = ['Email', 'Webhook', 'API'];
const platforms = ['Cloud', 'On-Prem', 'Hybrid'];
const slaOptions = ['2hr', '4hr', '24hr'];

const CustomizeEnterprisePlan: React.FC = () => {
  // State for all sections
  const [domains, setDomains] = useState(1);
  const [frequency, setFrequency] = useState('Monthly');
  const [continuous, setContinuous] = useState(false);
  const [scanCounts, setScanCounts] = useState({ light: 0, medium: 0, deep: 0, authenticated: 0, manual: 0 });
  const [compliance, setCompliance] = useState<string[]>([]);
  const [customCompliance, setCustomCompliance] = useState('');
  const [reportFormat, setReportFormat] = useState('PDF');
  const [reportQty, setReportQty] = useState(1);
  const [branding, setBranding] = useState<File | null>(null);
  const [delivery, setDelivery] = useState<string[]>([]);
  const [platform, setPlatform] = useState('Cloud');
  const [apiAccess, setApiAccess] = useState(false);
  const [cicd, setCicd] = useState(false);
  const [roleAccess, setRoleAccess] = useState(false);
  const [sso, setSso] = useState(false);
  const [sla, setSla] = useState('24hr');
  const [advisor, setAdvisor] = useState(false);
  const [support, setSupport] = useState(false);
  const [remediation, setRemediation] = useState(false);

  // Handlers
  const handleScanCount = (key: string, delta: number) => {
    setScanCounts((prev) => ({ ...prev, [key]: Math.max(0, prev[key as keyof typeof prev] + delta) }));
  };
  const handleCompliance = (option: string) => {
    setCompliance((prev) => prev.includes(option) ? prev.filter(c => c !== option) : [...prev, option]);
  };
  const handleDelivery = (option: string) => {
    setDelivery((prev) => prev.includes(option) ? prev.filter(d => d !== option) : [...prev, option]);
  };

  // Estimate cost (placeholder logic)
  const estimateCost = () => {
    let base = 100;
    base += domains * 10;
    base += scanCounts.light * 5 + scanCounts.medium * 10 + scanCounts.deep * 20 + scanCounts.authenticated * 30;
    if (scanCounts.manual > 0) base += scanCounts.manual * 100;
    if (continuous) base += 200;
    if (advisor) base += 150;
    if (support) base += 100;
    if (remediation) base += 120;
    base += compliance.length * 20;
    if (customCompliance) base += 30;
    if (branding) base += 50;
    if (apiAccess) base += 40;
    if (cicd) base += 40;
    if (roleAccess) base += 30;
    if (sso) base += 30;
    if (sla === '2hr') base += 200;
    else if (sla === '4hr') base += 100;
    return base;
  };

  return (
    <div className="bg-white min-h-screen flex flex-col md:flex-row">
      {/* Back Button */}
      <div className="absolute left-6 top-6 z-20">
        <Link to="/" className="inline-flex items-center px-4 py-2 rounded-lg border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 font-semibold shadow-sm transition-all">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Other Plans
        </Link>
      </div>
      {/* Main Form */}
      <div className="flex-1 max-w-3xl mx-auto p-6 pb-32">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Customize Your Enterprise Plan</h1>
        <p className="mb-8 text-gray-600">Build a plan tailored to your organization's needs. Select features, compliance, integrations, and more.</p>
        {/* 1. Domains & Frequency */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-blue-500" /> Domains & Frequency</h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Domains:</span>
              <input type="number" min={1} max={100} value={domains} onChange={e => setDomains(Number(e.target.value))} className="w-20 border rounded-lg px-2 py-1 focus:border-blue-500 outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Frequency:</span>
              <select value={frequency} onChange={e => setFrequency(e.target.value)} className="border rounded-lg px-2 py-1 focus:border-blue-500 outline-none">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>On-Demand</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={continuous} onChange={e => setContinuous(e.target.checked)} className="accent-blue-600 w-4 h-4" />
                <span className="ml-2 text-gray-700">Continuous Monitoring</span>
              </label>
            </div>
          </div>
        </div>
        {/* 2. Select Scan Types */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Shield className="w-5 h-5 text-blue-500" /> Select Scan Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scanTypes.map(type => (
              <div key={type.key} className={`rounded-xl border-2 p-4 flex flex-col gap-2 shadow-sm transition-all ${scanCounts[type.key as keyof typeof scanCounts] > 0 ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {type.icon}
                  <span className="font-semibold text-gray-900">{type.category}</span>
                  <span className="text-xs text-gray-500">{type.description}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => handleScanCount(type.key, -1)} className="rounded-full bg-gray-200 w-7 h-7 flex items-center justify-center text-lg text-gray-600 disabled:opacity-40" disabled={scanCounts[type.key as keyof typeof scanCounts] === 0}><ChevronDown /></button>
                  <span className="text-lg font-bold w-6 text-center">{scanCounts[type.key as keyof typeof scanCounts]}</span>
                  <button onClick={() => handleScanCount(type.key, 1)} className="rounded-full bg-blue-500 w-7 h-7 flex items-center justify-center text-lg text-white"><ChevronUp /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* 3. Compliance Standards */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-blue-500" /> Compliance Standards</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {complianceOptions.map(option => (
              <label key={option} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${compliance.includes(option) ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <input type="checkbox" checked={compliance.includes(option)} onChange={() => handleCompliance(option)} className="accent-blue-600 w-4 h-4" />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input type="text" placeholder="Add custom compliance..." value={customCompliance} onChange={e => setCustomCompliance(e.target.value)} className="border rounded-lg px-2 py-1 focus:border-blue-500 outline-none" />
            <button onClick={() => { if (customCompliance) { setCompliance([...compliance, customCompliance]); setCustomCompliance(''); }}} className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center gap-1"><PlusCircle className="w-4 h-4" /> Add</button>
          </div>
        </div>
        {/* 4. Reporting Needs */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-blue-500" /> Reporting Needs</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Format:</span>
              <select value={reportFormat} onChange={e => setReportFormat(e.target.value)} className="border rounded-lg px-2 py-1 focus:border-blue-500 outline-none">
                {reportFormats.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-700">Reports/month:</span>
              <input type="number" min={1} max={100} value={reportQty} onChange={e => setReportQty(Number(e.target.value))} className="w-20 border rounded-lg px-2 py-1 focus:border-blue-500 outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" checked={!!branding} onChange={e => setBranding(e.target.checked ? new File([], 'logo.png') : null)} className="accent-blue-600 w-4 h-4" />
                <span className="ml-2 text-gray-700">Custom Branding</span>
              </label>
              <label className="flex items-center cursor-pointer ml-2">
                <Upload className="w-5 h-5 text-blue-500" />
                <input type="file" accept="image/*" className="hidden" onChange={e => setBranding(e.target.files?.[0] || null)} />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {deliveryOptions.map(option => (
              <label key={option} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${delivery.includes(option) ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <input type="checkbox" checked={delivery.includes(option)} onChange={() => handleDelivery(option)} className="accent-blue-600 w-4 h-4" />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
        {/* 5. Access & Integration */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Settings className="w-5 h-5 text-blue-500" /> Access & Integration</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {platforms.map(opt => (
              <label key={opt} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${platform === opt ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <input type="radio" checked={platform === opt} onChange={() => setPlatform(opt)} className="accent-blue-600 w-4 h-4" />
                <span>{opt}</span>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={apiAccess} onChange={e => setApiAccess(e.target.checked)} className="accent-blue-600 w-4 h-4" />
              <span>API Access</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={cicd} onChange={e => setCicd(e.target.checked)} className="accent-blue-600 w-4 h-4" />
              <span>CI/CD Integration</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={roleAccess} onChange={e => setRoleAccess(e.target.checked)} className="accent-blue-600 w-4 h-4" />
              <span>Role-based Access</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={sso} onChange={e => setSso(e.target.checked)} className="accent-blue-600 w-4 h-4" />
              <span>SSO / MFA</span>
            </label>
          </div>
        </div>
        {/* 6. Support & SLA */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-blue-500" /> Support & SLA</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            {slaOptions.map(opt => (
              <label key={opt} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${sla === opt ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <input type="radio" checked={sla === opt} onChange={() => setSla(opt)} className="accent-blue-600 w-4 h-4" />
                <span>{opt} SLA</span>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={advisor} onChange={e => setAdvisor(e.target.checked)} className="accent-blue-600 w-4 h-4" />
              <span>Dedicated Security Advisor</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={support} onChange={e => setSupport(e.target.checked)} className="accent-blue-600 w-4 h-4" />
              <span>24/7 Support</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={remediation} onChange={e => setRemediation(e.target.checked)} className="accent-blue-600 w-4 h-4" />
              <span>Remediation Help</span>
            </label>
          </div>
        </div>
        {/* Final CTA Section */}
        <div className="flex gap-4 mt-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all">Submit Custom Plan</button>
          <button className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-50 transition-all">Talk to Sales</button>
        </div>
      </div>
      {/* Sticky Summary Card */}
      <div className="w-full md:w-96 md:fixed md:right-0 md:top-0 md:h-screen p-6 bg-white border-l border-gray-100 shadow-md flex flex-col">
        <div className="sticky top-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Summary</h2>
          <div className="space-y-2 text-gray-700">
            <div><b>Domains:</b> {domains}</div>
            <div><b>Frequency:</b> {frequency}{continuous && ' + Continuous'}</div>
            <div>
              <b>Scans:</b>
              <ul className="ml-4 list-disc">
                {Object.entries(scanCounts).map(([k, v]) => v > 0 && <li key={k}>{scanTypes.find(t => t.key === k)?.category}: {v}</li>)}
              </ul>
            </div>
            <div><b>Compliance:</b> {compliance.concat(customCompliance ? [customCompliance] : []).join(', ') || 'None'}</div>
            <div><b>Reports:</b> {reportQty} × {reportFormat}</div>
            <div><b>Branding:</b> {branding ? branding.name : 'No'}</div>
            <div><b>Delivery:</b> {delivery.join(', ') || 'None'}</div>
            <div><b>Platform:</b> {platform}</div>
            <div><b>Integrations:</b> {[apiAccess && 'API', cicd && 'CI/CD', roleAccess && 'Role-based', sso && 'SSO/MFA'].filter(Boolean).join(', ') || 'None'}</div>
            <div><b>SLA:</b> {sla}</div>
            <div><b>Support:</b> {[advisor && 'Advisor', support && '24/7', remediation && 'Remediation'].filter(Boolean).join(', ') || 'None'}</div>
          </div>
          <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-lg font-bold flex items-center justify-between">
            <span>Estimated Cost</span>
            <span>${estimateCost()}</span>
          </div>
          <button className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition-all">Request Custom Quote</button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeEnterprisePlan; 