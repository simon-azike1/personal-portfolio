import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Briefcase,
  Code,
  MessageSquare,
  LogOut,
  Plus,
  Sun,
  Moon
} from 'lucide-react';
import ProjectsManager from './components/ProjectsManager';
import SkillsManager from './components/SkillsManager';
import TestimonialsManager from './components/TestimonialsManager';
import { useTheme } from '../../context/ThemeContext';
import logo from '/Images/logo.png';
import { useI18n } from '../../context/I18nContext';
import LanguageSwitcher from '../../components/LanguageSwitcher';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [quickAction, setQuickAction] = useState({ tab: null, token: 0 });
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();

  const menuItems = [
    { id: 'overview', name: t('admin.menu.overview'), icon: LayoutDashboard },
    { id: 'projects', name: t('admin.menu.projects'), icon: Briefcase },
    { id: 'skills', name: t('admin.menu.skills'), icon: Code },
    { id: 'testimonials', name: t('admin.menu.testimonials'), icon: MessageSquare },
  ];

  const handleQuickAction = (tab) => {
    setQuickAction({ tab, token: Date.now() });
    setActiveTab(tab);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="min-h-screen bg-theme-bg-primary text-theme-text-primary">
      <nav className="sticky top-0 z-50 border-b border-theme bg-theme-card/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <a href="/" className="flex items-center gap-3" aria-label="SimzikTech Home">
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-theme-accent-primary to-theme-accent-secondary p-[2px] shadow-md transition-transform duration-300 hover:scale-105">
                  <span className="h-full w-full rounded-full bg-theme-bg-primary p-[2px]">
                    <img src={logo} alt="SimzikTech logo" className="h-full w-full rounded-full object-cover" />
                  </span>
                </span>
                <span className="brand-wordmark brand-wordmark-hover text-base font-medium italic text-theme-text-primary">
                  SimzikTech
                </span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher value={language} onChange={setLanguage} label={t('nav.language')} />
              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-theme bg-theme-bg-secondary text-theme-text-primary transition hover:border-theme-accent-primary"
                aria-label={theme === 'light' ? t('nav.darkMode') : t('nav.lightMode')}
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-theme-text-secondary transition hover:bg-theme-bg-secondary"
              >
                <LogOut size={20} />
                {t('admin.logout')}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-theme bg-theme-card p-3 shadow-sm">
              <div className="mb-3 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-theme-text-tertiary">
                Workspace
              </div>
              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                        activeTab === item.id
                          ? 'bg-theme-accent-primary text-white shadow-md shadow-emerald-500/20'
                          : 'text-theme-text-secondary hover:bg-theme-bg-secondary'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && <OverviewSection onQuickAction={handleQuickAction} />}
              {activeTab === 'projects' && <ProjectsManager quickAction={quickAction} />}
              {activeTab === 'skills' && <SkillsManager quickAction={quickAction} />}
              {activeTab === 'testimonials' && <TestimonialsManager quickAction={quickAction} />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Overview Section Component
const OverviewSection = ({ onQuickAction }) => {
  const stats = [
    { label: 'admin.stats.projects', value: '9', color: 'bg-primary-dark' },
    { label: 'admin.stats.skills', value: '8', color: 'bg-primary' },
    { label: 'admin.stats.testimonials', value: '3', color: 'bg-primary-light' },
    { label: 'admin.stats.years', value: '2+', color: 'bg-dark' },
  ];

  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2 text-3xl font-bold text-theme-text-primary">{t('admin.overviewTitle')}</h2>
        <p className="text-theme-text-secondary">{t('admin.overviewSubtitle')}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-2xl border border-theme bg-theme-card p-5 shadow-sm"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} shadow-sm`}>
              <span className="text-xl font-bold text-white">{stat.value.charAt(0)}</span>
            </div>
            <p className="mb-1 text-sm text-theme-text-secondary">{t(stat.label)}</p>
            <p className="text-3xl font-bold text-theme-text-primary">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-theme bg-theme-card p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-theme-text-primary">{t('admin.quickActions')}</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <button
            onClick={() => onQuickAction('projects')}
            className="flex items-center gap-3 rounded-xl border border-theme bg-theme-bg-secondary p-4 text-left transition hover:border-theme-accent-primary hover:bg-theme-bg-primary"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-accent-primary/10 text-theme-accent-primary"><Plus size={18} /></span>
            <span className="font-medium text-theme-text-secondary">{t('admin.addProject')}</span>
          </button>
          <button
            onClick={() => onQuickAction('skills')}
            className="flex items-center gap-3 rounded-xl border border-theme bg-theme-bg-secondary p-4 text-left transition hover:border-theme-accent-primary hover:bg-theme-bg-primary"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-accent-primary/10 text-theme-accent-primary"><Plus size={18} /></span>
            <span className="font-medium text-theme-text-secondary">{t('admin.addSkill')}</span>
          </button>
          <button
            onClick={() => onQuickAction('testimonials')}
            className="flex items-center gap-3 rounded-xl border border-theme bg-theme-bg-secondary p-4 text-left transition hover:border-theme-accent-primary hover:bg-theme-bg-primary"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-theme-accent-primary/10 text-theme-accent-primary"><Plus size={18} /></span>
            <span className="font-medium text-theme-text-secondary">{t('admin.addTestimonial')}</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-theme bg-theme-card p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-bold text-theme-text-primary">{t('admin.recentActivity')}</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 border-b border-theme pb-4">
            <div className="mt-2 h-2.5 w-2.5 rounded-full bg-theme-accent-primary" />
            <div className="flex-1">
              <p className="font-medium text-theme-text-secondary">{t('admin.activityProject')}</p>
              <p className="text-sm text-theme-text-tertiary">{t('admin.timeTwoHours')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 border-b border-theme pb-4">
            <div className="mt-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <div className="flex-1">
              <p className="font-medium text-theme-text-secondary">{t('admin.activitySkill')}</p>
              <p className="text-sm text-theme-text-tertiary">{t('admin.timeOneDay')}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-2 h-2.5 w-2.5 rounded-full bg-sky-500" />
            <div className="flex-1">
              <p className="font-medium text-theme-text-secondary">{t('admin.activityTestimonial')}</p>
              <p className="text-sm text-theme-text-tertiary">{t('admin.timeThreeDays')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
