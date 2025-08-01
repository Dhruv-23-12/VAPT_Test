
import { Shield, Clock, FileText } from 'lucide-react';
import AnimatedScaleInHeading from '../animations/AnimatedScaleInHeading';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Fast & Efficient',
      description: 'Complete VAPT assessments within 5-10 business days without disrupting your operations.',
      color: 'text-blue-600'
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Compliance Ready',
      description: 'Meet industry standards with reports that satisfy ISO 27001, PCI DSS, and GDPR requirements.',
      color: 'text-slate-600'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Expert Certified',
      description: 'Our team holds top industry certifications including OSCP, CEH, and CISSP.',
      color: 'text-indigo-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedScaleInHeading text="Why Choose Our VAPT Services?" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine cutting-edge tools with expert knowledge to deliver comprehensive security assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 animate"
              data-aos="fade-up"
              data-aos-delay={String(200 * index)}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-6 ${benefit.color}`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
