
import { Shield, Phone, Cloud, Grid2x2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive VAPT Services
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Protect your digital assets with our professional vulnerability assessment and penetration testing services.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-blue-600 mr-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <div>
                      <div className="text-lg font-semibold text-blue-600">{service.price}</div>
                      <div className="text-sm text-gray-500">{service.duration}</div>
                    </div>
                    <Link
                      to="/contact"
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does a typical VAPT assessment take?
              </h3>
              <p className="text-gray-600">
                Most assessments take 5-14 days depending on the scope and complexity. We provide detailed timelines during our initial consultation.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Will testing affect our production systems?
              </h3>
              <p className="text-gray-600">
                We use safe testing methodologies that minimize impact on production systems. All testing is coordinated with your team and can be scheduled during maintenance windows.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What reports do we receive after testing?
              </h3>
              <p className="text-gray-600">
                You receive a comprehensive report including executive summary, technical findings, risk ratings, and detailed remediation recommendations.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
            >
              Schedule Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
