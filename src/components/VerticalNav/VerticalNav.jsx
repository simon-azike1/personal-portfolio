import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  Briefcase,
  Folder,
  Mail
} from 'lucide-react';
import { useI18n } from '../../context/I18nContext';

const VerticalNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useI18n();

  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Hide vertical nav on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  const navItems = [
    { id: 'home', name: t('nav.home'), icon: Home },
    { id: 'about', name: t('nav.about'), icon: User },
    { id: 'skills', name: t('nav.skills'), icon: Briefcase },
    { id: 'projects', name: t('nav.projects'), icon: Folder },
    { id: 'contact', name: t('nav.contact'), icon: Mail }
  ];

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      navItems.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(item.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollTo(id), 120);
    } else {
      scrollTo(id);
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed left-0 top-14 bottom-0 w-14 z-40 flex items-center ${
      isScrolled ? 'bg-bg-primary/90 backdrop-blur-sm border-r border-border' : 'bg-bg-primary/50 backdrop-blur-sm'
    }`}>
      <div className="flex flex-col h-full items-center justify-center gap-6 p-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
              activeSection === item.id
                ? 'bg-accent-primary/20 text-accent-primary hover:bg-accent-primary/10'
                : 'text-text-secondary hover:bg-bg-secondary/50 hover:text-text-primary'
            }`}
            aria-label={item.name}
            title={item.name}
          >
            <item.icon size={20} />
          </button>
        ))}
      </div>
    </nav>
  );
};

export default VerticalNav;