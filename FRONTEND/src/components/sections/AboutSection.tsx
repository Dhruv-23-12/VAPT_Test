
import { Shield, Users, FileText } from 'lucide-react';
import AnimatedScaleInHeading from '../animations/AnimatedScaleInHeading';
import AnimatedSlideInText from '../animations/AnimatedSlideInText';

const AboutSection = () => {
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

  const missionVisionValues = [
    {
      icon: <Shield className="h-8 w-8" />, bg: 'bg-blue-600',
      title: 'Our Mission',
      desc: 'To protect businesses from cyber threats by providing world-class vulnerability assessment and penetration testing services.'
    },
    {
      icon: <Users className="h-8 w-8" />, bg: 'bg-slate-600',
      title: 'Our Vision',
      desc: 'To be the trusted cybersecurity partner for organizations worldwide, making the digital world safer through innovative security testing.'
    },
    {
      icon: <FileText className="h-8 w-8" />, bg: 'bg-indigo-600',
      title: 'Our Values',
      desc: 'Integrity, excellence, and transparency in everything we do. We believe in ethical hacking practices and delivering actionable insights.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <AnimatedScaleInHeading text="About SecureVAPT" />
          <AnimatedSlideInText text="We are a team of certified cybersecurity professionals dedicated to helping organizations strengthen their security posture." />
        </div>
        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {missionVisionValues.map((item, idx) => (
            <div
              key={item.title}
              className="text-center p-6 animate"
              data-aos="fade-up"
              data-aos-delay={String(100 * idx)}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${item.bg} text-white mb-6`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-100 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        {/* Team Section */}
        <div className="text-center mb-12">
          <AnimatedScaleInHeading text="Meet Our Expert Team" />
          <AnimatedSlideInText text="Our certified security professionals bring years of experience in identifying and exploiting vulnerabilities." />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-300/20 animate"
              data-aos="fade-up"
              data-aos-delay={String(100 * index)}
            >
              <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                {member.image}
              </div>
              <h4 className="text-xl font-bold mb-2">{member.name}</h4>
              <p className="text-slate-100 mb-3">{member.role}</p>
              <div className="text-sm text-blue-300 font-medium">
                {member.credentials}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
