import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X, Shield } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '#services' },
    { name: 'About', path: '#about' },
    { name: 'Reports', path: '#reports' },
    { name: 'Contact', path: '#contact' },
    { name: 'Pricing', path: '#pricing' },
  ];

  const handleNavClick = (path: string) => {
    if (path === '/') {
      // Smooth scroll to top
      if (window.location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    } else if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleGetStarted = () => {
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <span
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                navigate('/');
              }
              setIsMenuOpen(false);
            }}
          >
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">SecureVAPT</span>
          </span>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.path.startsWith('#') ? (
                <a
                  key={item.name}
                  href={item.path}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                  className="px-3 py-2 text-sm font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600 cursor-pointer"
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="px-3 py-2 text-sm font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              )
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="border border-black text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all duration-200 cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer ml-2"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              {navItems.map((item) => (
                item.path.startsWith('#') ? (
                  <a
                    key={item.name}
                    href={item.path}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.path); }}
                    className="block px-3 py-2 text-base font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-3 py-2 text-base font-medium transition-colors duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50 cursor-pointer"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              ))}
              <Link
                to="/login"
                className="block w-full text-left px-3 py-2 mt-4 bg-blue-600 text-white rounded-lg text-base font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
