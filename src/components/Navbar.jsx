import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, PlusCircle, User, LogOut, Ticket } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

export default function Navbar({ onOpenAuth, onOpenListParking, currentUser, onSignOut }) {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.findParking'), href: '#find-parking' },
    { name: t('nav.vehicleAssistance'), href: '#vehicle-assistance' },
    { name: t('nav.promotions'), href: '#promotions' },
    { name: t('nav.howItWorks'), href: '#how-it-works' },
    { name: t('nav.whyParkease'), href: '#why-choose-us' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const navOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center group cursor-pointer"
          >
            <Logo size="default" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-semibold text-slate-600 hover:text-sky-600 rounded-lg hover:bg-sky-50/70 transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle Button */}
            <LanguageToggle />

            {/* My Bookings CTA */}
            <Link
              to="/my-bookings"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-all border border-sky-200/80 cursor-pointer"
            >
              <Ticket className="w-3.5 h-3.5 text-sky-600" />
              <span>{t('nav.myBookings')}</span>
            </Link>

            {/* List Your Parking CTA */}
            <button
              onClick={onOpenListParking}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all border border-slate-200/70 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-sky-600" />
              <span>{t('nav.listParking')}</span>
            </button>

            {currentUser ? (
              /* Signed in profile badge */
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-100">
                  <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="text-left text-xs leading-none">
                    <span className="font-bold text-slate-800 block">{currentUser.name}</span>
                    <span className="text-[10px] text-sky-600 font-medium">{currentUser.role}</span>
                  </div>
                </div>
                <button
                  onClick={onSignOut}
                  title={t('nav.signOut')}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Auth Buttons */
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-sky-600 transition-colors cursor-pointer"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-sm hover:shadow transition-all cursor-pointer"
                >
                  {t('nav.register')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Actions: Language Toggle & Menu Button */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <LanguageToggle variant="compact" />
            <button
              onClick={() => onOpenAuth(currentUser ? 'profile' : 'login')}
              className="p-2 text-slate-600 hover:text-sky-600"
              aria-label="User account"
            >
              <User className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/80 bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl animate-fade-in">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="block px-3 py-2.5 text-base font-semibold text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/my-bookings"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs bg-sky-50 text-sky-700 border border-sky-200"
            >
              <Ticket className="w-4 h-4 text-sky-600" />
              <span>{t('nav.myBookings')}</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenListParking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm bg-slate-900 text-white shadow-sm"
            >
              <PlusCircle className="w-4 h-4 text-sky-400" />
              <span>{t('nav.listParking')}</span>
            </button>

            {currentUser ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-sky-50">
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900">{currentUser.name}</div>
                  <div className="text-[11px] text-sky-700">{currentUser.role}</div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="text-xs font-semibold text-rose-600 hover:underline"
                >
                  {t('nav.signOut')}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  {t('nav.login')}
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="py-2.5 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-500 shadow-sm"
                >
                  {t('nav.register')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
