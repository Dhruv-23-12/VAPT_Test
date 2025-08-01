
const TrustSection = () => {
  const clients = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'SecureBank', logo: 'SB' },
    { name: 'HealthSystem', logo: 'HS' },
    { name: 'RetailGroup', logo: 'RG' },
    { name: 'EduPlatform', logo: 'EP' },
    { name: 'FinanceHub', logo: 'FH' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" data-aos="fade-up">Trusted by Leading Organizations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            We've helped hundreds of companies strengthen their security posture through comprehensive VAPT services.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
          {clients.map((client, idx) => (
            <div
              key={client.name}
              className="flex items-center justify-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              data-aos="fade-up"
              data-aos-delay={String(100 * idx)}
            >
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {client.logo}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-8" data-aos="fade-up">Our Certifications</h3>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200" data-aos="fade-up" data-aos-delay="0">
              <span className="text-sm font-medium text-gray-700">ISO 27001</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200" data-aos="fade-up" data-aos-delay="100">
              <span className="text-sm font-medium text-gray-700">CEH Certified</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200" data-aos="fade-up" data-aos-delay="200">
              <span className="text-sm font-medium text-gray-700">OSCP</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200" data-aos="fade-up" data-aos-delay="300">
              <span className="text-sm font-medium text-gray-700">CISSP</span>
            </div>
            <div className="bg-white px-6 py-3 rounded-lg shadow-sm border border-gray-200" data-aos="fade-up" data-aos-delay="400">
              <span className="text-sm font-medium text-gray-700">GDPR Ready</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
