
import { Shield, Users, FileText } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'Lead Security Consultant',
      credentials: 'OSCP, CEH, CISSP',
      image: 'SC'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Senior Penetration Tester',
      credentials: 'OSCP, GCIH, GPEN',
      image: 'MR'
    },
    {
      name: 'Emily Johnson',
      role: 'Cloud Security Specialist',
      credentials: 'AWS Security, CCSP',
      image: 'EJ'
    },
    {
      name: 'David Kim',
      role: 'Mobile Security Expert',
      credentials: 'GMOB, CEH',
      image: 'DK'
    }
  ];

  const timeline = [
    { year: '2018', event: 'Company founded by cybersecurity veterans' },
    { year: '2019', event: 'Achieved ISO 27001 certification' },
    { year: '2020', event: 'Expanded to cloud security services' },
    { year: '2021', event: 'Reached 100+ successful assessments' },
    { year: '2022', event: 'Added mobile application testing' },
    { year: '2023', event: 'Launched 24/7 security monitoring' },
    { year: '2024', event: '500+ assessments completed, trusted by Fortune 500' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About SecureVAPT
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are a team of certified cybersecurity professionals dedicated to helping organizations strengthen their security posture through comprehensive VAPT services.
          </p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To protect businesses from cyber threats by providing world-class vulnerability assessment and penetration testing services that identify and eliminate security weaknesses.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the trusted cybersecurity partner for organizations worldwide, making the digital world safer through innovative security testing and continuous improvement.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 text-purple-600 mb-6">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Integrity, excellence, and transparency in everything we do. We believe in ethical hacking practices and delivering actionable insights that drive real security improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our certified security professionals bring years of experience in identifying and exploiting vulnerabilities across various platforms and technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-6 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-3">{member.role}</p>
                  <div className="text-sm text-blue-600 font-medium">
                    {member.credentials}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              From startup to trusted security partner - here's how we've grown
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-blue-600">{item.year}</span>
                </div>
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full mx-6 flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 text-lg">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Industry Certifications
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {['ISO 27001', 'CEH', 'OSCP', 'CISSP', 'GCIH', 'GPEN', 'CCSP', 'GMOB', 'AWS Security', 'GDPR'].map((cert) => (
              <div key={cert} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <span className="text-sm font-medium text-gray-700">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
