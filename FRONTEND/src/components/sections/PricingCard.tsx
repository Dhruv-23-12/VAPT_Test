import { Shield, FileText, Cloud, CheckCircle, Star, Zap, Users, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  domains: string;
  scans: {
    light: string;
    medium: string;
    deep: string;
    authenticated: string;
  };
  coverage: string;
  tools: string;
  reports: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface PricingCardProps {
  plan: Plan;
  isYearly: boolean;
  delay: number;
  horizontal?: boolean;
}

const planIcons: Record<string, JSX.Element> = {
  Free: <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /></svg>,
  Basic: <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l7 4v6c0 5-3.5 9.74-7 10-3.5-.26-7-5-7-10V6l7-4z" /></svg>,
  Advanced: <svg className="w-8 h-8 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
  Team: <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path d="M5.5 21a7.5 7.5 0 0 1 13 0" /></svg>,
  Enterprise: <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>,
};

const planColors: Record<string, string> = {
  Basic: 'border-blue-100',
  Advanced: 'border-cyan-400',
  Team: 'border-indigo-200',
  Enterprise: 'border-orange-200',
};

const PricingCard = ({ plan, isYearly, delay, horizontal = false }: PricingCardProps) => {
  const navigate = useNavigate();
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isYearly ? 'year' : 'month';
  const icon = planIcons[plan.name] || null;
  const borderColor = plan.name === 'Free' ? 'border-gray-100 bg-gray-50' : 'border-gray-200';
  
  let displayPrice = price;
  let displayPeriod = period;
  let subLabel = '';
  if (isYearly && plan.monthlyPrice > 0) {
    displayPrice = plan.yearlyPrice / 12;
    displayPeriod = 'mo';
    subLabel = 'billed yearly';
  }
  
  // Handler for Choose Plan button
  const handleChoosePlan = () => {
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    // Add any further logic for logged-in users here (e.g., redirect to checkout)
  };

  return (
    <div
      className={`relative bg-white rounded-2xl p-8 ${horizontal ? 'flex flex-row min-h-[340px] items-stretch' : 'flex flex-col min-h-[750px]'} transition-all duration-300 hover:shadow-xl border-2 border-gray-300 hover:border-blue-500 hover:scale-105`}
      style={{ animationDelay: `${delay}s` }}
    >
      {horizontal ? (
        <>
          {/* Left: Icon and details */}
          <div className="flex flex-col justify-center items-center w-1/3 pr-8 border-r border-gray-200">
            <div className="mb-4">{icon}</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <div className="mb-2">
              <span className="text-4xl font-bold text-gray-900">${displayPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              <span className="text-slate-600">/{displayPeriod}</span>
              {subLabel && <span className="block text-xs text-green-600 font-semibold mt-1">{subLabel}</span>}
            </div>
            <div className="flex items-center justify-center space-x-1 text-slate-600 text-sm">
              <Cloud className="w-4 h-4 text-blue-600" />
              <span>{plan.domains}</span>
            </div>
          </div>
          {/* Right: Features and CTA */}
          <div className="flex-1 flex flex-col justify-between pl-8">
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Features</h4>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <Link to="/customize-enterprise" className="w-full h-10 px-4 rounded-xl font-semibold text-sm bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 hover:shadow-lg transition-all">Customize Plan</Link>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Popular Badge */}
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="inline-flex items-center space-x-2 bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                <Star className="w-4 h-4 fill-current" />
                <span className="whitespace-nowrap">Most Popular</span>
              </div>
            </div>
          )}
          {/* Plan Icon */}
          <div className="flex justify-center mb-4">{icon}</div>
          {/* Header */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <div className="mb-2">
              <span className="text-4xl font-bold text-gray-900">${displayPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              <span className="text-slate-600">/{displayPeriod}</span>
              {subLabel && <span className="block text-xs text-green-600 font-semibold mt-1">{subLabel}</span>}
            </div>
            <div className="flex items-center justify-center space-x-1 text-slate-600 text-sm">
              <Cloud className="w-4 h-4 text-blue-600" />
              <span>{plan.domains}</span>
            </div>
          </div>
          {/* Scans */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-3">
              <Zap className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Scans Included</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Light Scans:</span>
                <span className="font-medium text-gray-900">{plan.scans.light}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Medium Scans:</span>
                <span className="font-medium text-gray-900">{plan.scans.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Deep Scans:</span>
                <span className="font-medium text-gray-900">{plan.scans.deep}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Authenticated:</span>
                <span className="font-medium text-gray-900">{plan.scans.authenticated}</span>
              </div>
            </div>
          </div>
          {/* Coverage */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Coverage</h4>
            </div>
            <p className="text-sm text-slate-700 bg-blue-50 rounded px-2 py-1 inline-block">{plan.coverage}</p>
          </div>
          {/* Tools */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Settings className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Tools Used</h4>
            </div>
            <p className="text-sm text-slate-700 bg-blue-50 rounded px-2 py-1 inline-block">{plan.tools}</p>
          </div>
          {/* Reports */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Reporting</h4>
            </div>
            <p className="text-sm text-slate-700 bg-blue-50 rounded px-2 py-1 inline-block">{plan.reports}</p>
          </div>
          {/* Features */}
          <div className="mb-8 flex-1">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-900">Features</h4>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* CTA Button */}
          {plan.name === 'Enterprise' ? (
            <Link to="/customize-enterprise" className="w-full h-10 px-4 rounded-xl font-semibold text-sm bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 hover:shadow-lg transition-all">Customize Plan</Link>
          ) : (
            <button
              type="button"
              className={
                plan.name === 'Free'
                  ? 'w-full h-10 px-4 rounded-xl font-semibold text-sm mt-auto transition-all duration-200 bg-gray-200 text-blue-700 hover:bg-blue-100 hover:text-blue-900 hover:shadow flex items-center justify-center cursor-pointer'
                  : 'w-full h-10 px-4 rounded-xl font-semibold text-sm mt-auto transition-all duration-200 bg-slate-900 text-white hover:bg-slate-800 hover:shadow-lg flex items-center justify-center cursor-pointer'
              }
              onClick={() => {
                window.location.href = '/login';
              }}
            >
              {plan.cta}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export type { Plan };
export default PricingCard;