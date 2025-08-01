
import { FileText, Download, Shield, TrendingUp } from 'lucide-react';
import AnimatedScaleInHeading from '../animations/AnimatedScaleInHeading';
import AnimatedSlideInText from '../animations/AnimatedSlideInText';

const ReportsSection = () => {
  const caseStudies = [
    {
      title: 'E-Commerce Platform Security Overhaul',
      industry: 'Retail',
      findings: '15 Critical, 23 High, 31 Medium vulnerabilities',
      impact: '99.8% vulnerability remediation achieved'
    },
    {
      title: 'Healthcare System HIPAA Compliance',
      industry: 'Healthcare',
      findings: '8 Critical, 15 High, 28 Medium vulnerabilities',
      impact: 'Achieved HIPAA compliance certification'
    },
    {
      title: 'FinTech Mobile App Security',
      industry: 'Financial Services',
      findings: '12 Critical, 18 High, 22 Medium vulnerabilities',
      impact: 'Prevented potential $2M+ security breach'
    }
  ];

  const beforeAfterItems = [
    {
      title: 'Before Assessment',
      color: 'bg-red-50 border-red-200',
      heading: 'text-red-600',
      scoreBg: 'bg-red-100',
      scoreText: 'text-red-800',
      bar: 'bg-red-600',
      value: 17,
      high: 28,
      score: '25/100',
      barHigh: 'bg-orange-500',
      barHighWidth: '70%',
      barWidth: '85%'
    },
    {
      title: 'After Remediation',
      color: 'bg-green-50 border-green-200',
      heading: 'text-green-600',
      scoreBg: 'bg-green-100',
      scoreText: 'text-green-800',
      bar: 'bg-green-600',
      value: 0,
      high: 2,
      score: '92/100',
      barHigh: 'bg-green-600',
      barHighWidth: '8%',
      barWidth: '5%'
    }
  ];

  return (
    <section id="reports" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedScaleInHeading text="Case Studies & Reports" />
          <AnimatedSlideInText text="Explore our successful security assessments and download our comprehensive methodology guides." />
        </div>
        {/* Case Studies */}
        <div className="mb-16">
          <AnimatedScaleInHeading text="Success Stories" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200 animate"
                data-aos="fade-up"
                data-aos-delay={String(100 * index)}
              >
                <div className="flex items-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600 mr-3" />
                  <span className="text-sm font-medium text-blue-600 uppercase tracking-wide">
                    {study.industry}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{study.title}</h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-1">Vulnerabilities Found</p>
                    <p className="text-xs text-gray-600">{study.findings}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <p className="text-sm font-medium text-gray-900 mb-1">Impact</p>
                    <p className="text-xs text-gray-600">{study.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Before vs After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {beforeAfterItems.map((item, idx) => (
            <div
              key={item.title}
              className={`${item.color} rounded-xl p-6 border animate`}
              style={{
                animation: `fadeSlideUp 0.7s forwards`,
                animationDelay: `${0.5 + idx * 0.2}s`
              }}
            >
              <h4 className={`text-xl font-bold ${item.heading} mb-6 text-center`}>{item.title}</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Critical Vulnerabilities</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                      <div className={`${item.bar} h-3 rounded-full`} style={{ width: item.barWidth }}></div>
                    </div>
                    <span className={`${item.heading} font-semibold`}>{item.value}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">High Risk Issues</span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-3 mr-3">
                      <div className={`${item.barHigh} h-3 rounded-full`} style={{ width: item.barHighWidth }}></div>
                    </div>
                    <span className={`${item.barHigh} font-semibold`}>{item.high}</span>
                  </div>
                </div>
              </div>
              <div className={`mt-6 p-4 ${item.scoreBg} rounded-lg`}>
                <p className={`${item.scoreText} text-sm font-medium`}>Security Score: {item.score}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-50 px-6 py-3 rounded-lg border border-gray-200">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">91% Improvement in Security Posture</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportsSection;
