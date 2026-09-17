import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Github, Facebook, Instagram, Music2, Sun, Moon, Download, Youtube } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import logo from '/Images/logo.png';
import { useI18n } from '../../context/I18nContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    setSpinning(true);
    const timer = setTimeout(() => {
      setSpinning(false);
    }, 1500); // Match animation duration
    return () => clearTimeout(timer);
  }, []);

  // Hide navbar on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  const navItems = [
    // { id: 'home', name: t('nav.home') },
    // { id: 'about', name: t('nav.about') },
    // { id: 'skills', name: t('nav.skills') },
    // { id: 'projects', name: t('nav.projects') },
    // { id: 'contact', name: t('nav.contact') }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/simon-azike1' },
    { name: 'YouTube', icon: Youtube, url: 'https://www.youtube.com/@SimzikTech' },
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/simon.azike/' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/azikeshinye/' },
    { name: 'X', icon: X, url: 'https://x.com/SimonAzike75984' },
    { name: 'TikTok', icon: Music2, url: 'https://vm.tiktok.com/ZS9AdRJ2hEkFB-jKJhr/' }
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
    setIsOpen(false);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('nav')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed p-4 top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-bg-primary/90 backdrop-blur-sm border-b border-border'
            : 'bg-bg-primary/50 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
{/* Logo */}
             <a
               href="/"
               className="flex items-center gap-3"
               onClick={(e) => {
                 e.preventDefault();
                 scrollToSection('home');
               }}
               aria-label="SimZik Home"
             >
               <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/20 p-[2px] shadow-md transition-transform duration-300 hover:scale-105">
<span className={`h-full w-full rounded-full bg-bg-primary p-[2px] ${spinning ? 'animate-spin' : ''}`}>
                    <img src={logo} alt="SimZik logo" className="h-full w-full rounded-full object-cover" />
                  </span>
               </span>
             </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-accent-primary'
                      : 'text-text-secondary hover:text-accent-primary'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

{/* Desktop Actions */}
             <div className="hidden lg:flex items-center gap-4">
               {socialLinks.map(({ name, icon: Icon, url }) => (
                 <a
                   key={name}
                   href={url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-text-secondary hover:text-accent-primary transition-colors"
                   title={name}
                 >
                   <Icon size={20} />
                 </a>
               ))}

               {/* Theme Toggle */}
               <button
                 onClick={toggleTheme}
                 className="w-10 h-10 rounded-full bg-bg-secondary/50 border border-accent-primary/20 flex items-center justify-center text-text-primary hover:bg-accent-primary/10"
                 aria-label={theme === 'light' ? t('nav.darkMode') : t('nav.lightMode')}
               >
                 {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
               </button>

               {/* Resume/Capabilities Link */}
               <a
                 href="/Azike_Simon_Software_Engineer.pdf"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn btn-outline"
               >
                 <Download size={18} />
                 {t('nav.resume')}
               </a>
             </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 rounded-full bg-bg-secondary/50 border border-accent-primary/20 flex items-center justify-center text-text-primary"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              aria-label={t('nav.toggleMenu')}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
            <div className="md:hidden bg-bg-primary/95 backdrop-blur-sm border-t border-border">
              <div className="px-6 py-8 space-y-6">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-full ${
                      activeSection === item.id
                        ? 'bg-accent-primary/20 text-accent-primary font-medium'
                        : 'text-text-primary hover:bg-bg-secondary/50'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full py-3 px-4 rounded-full bg-bg-secondary/50 border border-accent-primary/20 text-text-primary font-medium flex items-center justify-center gap-2"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={18} />
                    <span>{t('nav.lightMode')}</span>
                  </>
                ) : (
                  <>
                    <Moon size={18} />
                    <span>{t('nav.darkMode')}</span>
                  </>
                )}
              </button>

              {/* <div className="pt-4 border-t border-border">
                <p className="block text-sm text-text-tertiary mb-3">
                  {t('nav.language')}
                </p>
                <LanguageSwitcher
                  value={language}
                  onChange={setLanguage}
                  label={t('nav.language')}
                  fullWidth
                />
              </div> */}

              {/* Mobile Social Links */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-text-tertiary mb-3">{t('nav.connect')}</p>
                <div className="flex gap-3">
                  {socialLinks.map(({ name, icon: Icon, url }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 rounded-full bg-bg-secondary/50 border border-accent-primary/20 flex items-center justify-center gap-2 text-text-secondary"
                    >
                      <Icon size={18} />
                      <span className="text-sm">{name}</span>
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
