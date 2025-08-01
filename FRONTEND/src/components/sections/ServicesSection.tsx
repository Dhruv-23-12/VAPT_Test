import { Shield, Phone, Cloud, Grid2x2 } from 'lucide-react';
import PricingCard, { Plan } from './PricingCard';
import { useState } from 'react';
import AnimatedScaleInHeading from '../animations/AnimatedScaleInHeading';
import AnimatedSlideInText from '../animations/AnimatedSlideInText';

const ServicesSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const services = [
    {
      icon: <Grid2x2 className="h-12 w-12" />,
      title: 'Web Application Testing',
      description: 'Comprehensive security testing of web applications including OWASP Top 10 vulnerabilities, business logic flaws, and authentication bypass.',
      features: ['SQL Injection Testing', 'XSS Detection', 'Authentication Testing', 'Authorization Flaws'],
      price: 'Starting from $2,500',
      duration: '5-7 days'
    },
    {
      icon: <Phone className="h-12 w-12" />,
      title: 'Mobile App Security',
      description: 'In-depth security assessment of iOS and Android applications covering client-side and server-side vulnerabilities.',
      features: ['Static Code Analysis', 'Dynamic Testing', 'API Security', 'Data Storage Review'],
      price: 'Starting from $3,000',
      duration: '7-10 days'
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: 'Network Penetration Testing',
      description: 'External and internal network security testing to identify vulnerabilities in your network infrastructure.',
      features: ['External Testing', 'Internal Testing', 'Wireless Security', 'Social Engineering'],
      price: 'Starting from $4,000',
      duration: '7-14 days'
    },
    {
      icon: <Cloud className="h-12 w-12" />,
      title: 'Cloud Security Assessment',
      description: 'Security evaluation of cloud infrastructure including AWS, Azure, and GCP configurations and policies.',
      features: ['Configuration Review', 'IAM Assessment', 'Storage Security', 'Compliance Check'],
      price: 'Starting from $3,500',
      duration: '5-10 days'
    }
  ];

  const plans: Plan[] = [
    {
      name: 'Free',
      monthlyPrice: 0,
      yearlyPrice: 0,
      domains: '1 Domain',
      scans: { light: '1/month', medium: '0', deep: '0', authenticated: '0' },
      coverage: 'Basic',
      tools: 'Nmap',
      reports: 'PDF',
      features: [
        'Basic vulnerability scan',
        'Email support',
      ],
      cta: 'Get Started',
      popular: false,
    },
    {
      name: 'Basic',
      monthlyPrice: 299,
      yearlyPrice: 299 * 12 * 0.8,
      domains: '1-3 Domains',
      scans: { light: '5/month', medium: '3/month', deep: '1/month', authenticated: '0' },
      coverage: 'OWASP Top 10, SSL/TLS',
      tools: 'Nmap, OpenVAS, SSLyze',
      reports: '1 PDF per scan',
      features: [
        'Basic vulnerability scanning',
        'Email support',
        'Monthly reports',
      ],
      cta: 'Choose Plan',
      popular: false,
    },
    {
      name: 'Advanced',
      monthlyPrice: 599,
      yearlyPrice: 599 * 12 * 0.8,
      domains: '5-10 Domains',
      scans: { light: '15/month', medium: '8/month', deep: '4/month', authenticated: '2/month' },
      coverage: 'OWASP Top 10, SSL, CMS CVEs, API Testing',
      tools: 'Nmap, ZAP, Nikto, Burp Suite',
      reports: 'Detailed PDF + Executive Summary',
      features: [
        'Advanced threat detection',
        'Risk scoring & prioritization',
        '24/7 email support',
        'Bi-weekly reports',
      ],
      cta: 'Choose Plan',
      popular: true,
    },
    {
      name: 'Team',
      monthlyPrice: 999,
      yearlyPrice: 999 * 12 * 0.8,
      domains: '10-25 Domains',
      scans: { light: '30/month', medium: '15/month', deep: '8/month', authenticated: '5/month' },
      coverage: 'Full OWASP, CMS, API, Mobile, Cloud Config',
      tools: 'Nmap, ZAP, Nikto, Burp Suite, Custom Scripts',
      reports: 'Multi-format reports + Dashboard',
      features: [
        'CI/CD integration',
        'Team collaboration tools',
        'Priority phone support',
        'Weekly reports',
        'Custom scan schedules',
      ],
      cta: 'Choose Plan',
      popular: false,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 0,
      yearlyPrice: 0,
      domains: 'Unlimited',
      scans: { light: 'Custom', medium: 'Custom', deep: 'Custom', authenticated: 'Custom' },
      coverage: 'Comprehensive + Custom Checks',
      tools: 'Full Suite + Custom Tools',
      reports: 'White-label reports + API access',
      features: [
        'SSO/MFA integration',
        '24/7 dedicated support',
        'Custom integrations',
        'On-demand reporting',
        'Compliance templates',
        'Dedicated account manager',
      ],
      cta: 'Customize Plan',
      popular: false,
    },
  ];

  return (
    <>
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedScaleInHeading text="Our Services" />
            <AnimatedSlideInText text="Explore our comprehensive range of VAPT services tailored to your business needs." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((service, idx) => (
              <div
                key={service.title}
                className="bg-white rounded-xl p-8 shadow-md border border-gray-200 text-center animate"
                data-aos="fade-up"
                data-aos-delay={String(100 * idx)}
              >
                <div className="flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="text-left text-gray-500 mb-4 list-disc list-inside">
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <div className="text-lg font-semibold text-blue-600 mb-2">{service.price}</div>
                <div className="text-sm text-gray-400 mb-4">{service.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <AnimatedScaleInHeading text="Pricing Plans" />
            <AnimatedSlideInText text="Choose the plan that fits your business needs. All plans include comprehensive VAPT services." />
          </div>
          {/* Monthly/Yearly Toggle */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className={`font-semibold ${!isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Monthly</span>
            <button
              className={`relative w-14 h-8 rounded-full transition-colors duration-200 focus:outline-none ${isYearly ? 'bg-blue-200' : 'bg-gray-200'}`}
              onClick={() => setIsYearly((v) => !v)}
              aria-label="Toggle yearly pricing"
            >
              <span
                className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${isYearly ? 'translate-x-6' : ''}`}
              />
            </button>
            <span className={`font-semibold ${isYearly ? 'text-slate-900' : 'text-slate-400'}`}>Yearly</span>
            {isYearly && (
              <span className="ml-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">Save 20%</span>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center md:items-stretch">
            {plans.filter(plan => plan.name !== 'Enterprise').map((plan, idx) => (
              <div className="flex-1 flex" key={plan.name}
                style={{
                  opacity: 0,
                  transform: 'translateY(40px)',
                  animation: `fadeSlideUp 0.7s forwards`,
                  animationDelay: `${0.5 + idx * 0.2}s`
                }}
              >
                <PricingCard plan={plan} isYearly={isYearly} delay={idx * 0.1} />
              </div>
            ))}
          </div>
          {/* Enterprise plan below all others */}
          <div className="mt-12 flex justify-center">
            <div className="w-full"
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                animation: `fadeSlideUp 0.7s forwards`,
                animationDelay: `${0.5 + plans.length * 0.2}s`
              }}
            >
              <PricingCard plan={plans.find(plan => plan.name === 'Enterprise')} isYearly={isYearly} delay={0.5} horizontal={true} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
