import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ChevronDown,
  Code2,
  Database,
  Server,
  Palette,
  Rocket,
  Layers3,
  Sparkles,
} from 'lucide-react';
import profileAbout from '../../assets/Images/profile-about.jpg';
import heroPhoto from '../../assets/Images/simon_hero .jpg';
import { useI18n } from '../../context/I18nContext';

const Hero = () => {
  const { t } = useI18n();
  const whatsappMessage = encodeURIComponent(t('contact.whatsappMessage'));

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const techStack = [
    { icon: Code2, label: 'React', className: 'top-8 left-2 md:left-8' },
    { icon: Database, label: 'MongoDB', className: 'top-16 right-4 md:right-10' },
    { icon: Server, label: 'API', className: 'bottom-12 left-0 md:left-6' },
    { icon: Palette, label: 'UI/UX', className: 'bottom-20 right-0 md:right-8' },
    { icon: Rocket, label: 'Deploy', className: 'top-1/2 -left-4 md:-left-8' },
    { icon: Layers3, label: 'Next', className: 'top-1/2 -right-3 md:-right-8' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotate: -6 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <>
      <section id="home" className="relative min-h-screen overflow-hidden bg-bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.24),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(135deg,#0b1120_0%,#111827_30%,#0f172a_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,42,0.88),rgba(15,23,42,0.52),rgba(15,23,42,0.9))]" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-8 lg:px-12 lg:pb-20 lg:pt-28">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid min-h-[calc(100vh-10rem)] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-accent-primary backdrop-blur-sm"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-accent-primary shadow-[0_0_14px_rgba(99,102,241,0.8)]" />
                {t('nav.available')}
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl"
              >
                I build{' '}
                <span className="text-accent-primary">premium digital products</span>{' '}
                that feel sharp, fast, and easy to trust.
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg"
              >
                {t('hero.intro')}
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="btn btn-primary"
                >
                  {t('hero.viewWork')}
                  <span aria-hidden="true">→</span>
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-secondary hidden sm:inline-flex"
                >
                  {t('hero.contact')}
                </button>
                <a
                  href={`https://wa.me/212751780853?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary border-accent-primary/40 text-accent-primary hover:bg-accent-primary/10"
                >
                  <MessageCircle size={18} />
                  Let's talk
                </a>
              </motion.div>
            </div>

            <motion.div variants={imageVariants} className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-accent-primary/20 via-transparent to-violet-500/20 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/40 p-3 shadow-[0_30px_80px_rgba(15,23,42,0.6)] backdrop-blur-sm">
                  <img
                    src={heroPhoto}
                    alt="Simon Azike portrait"
                    className="h-[520px] w-full rounded-[1.5rem] object-cover object-center"
                  />
                </div>

                {techStack.map(({ icon: Icon, label, className }, index) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + index * 0.12, duration: 0.45 }}
                    className={`absolute ${className} flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 text-xs font-medium text-slate-200 shadow-lg backdrop-blur-md`}
                  >
                    <Icon size={14} className="text-accent-primary" />
                    {label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div className="mt-10 flex justify-center">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex cursor-pointer flex-col items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-slate-200 shadow-md backdrop-blur-sm transition-colors hover:text-accent-primary"
              onClick={() => scrollToSection('about')}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              >
                <ChevronDown size={20} />
              </motion.div>
              <span className="text-sm">{t('hero.scroll')}</span>
            </motion.button>
          </div>
        </div>
      </section>

      <section id="about" className="bg-bg-secondary py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {t('about.title')}
            </h2>
          </motion.div>

          <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-border bg-card p-8 shadow-lg"
            >
              <div className="relative mx-auto mb-6 h-52 w-52 overflow-hidden rounded-full border-4 border-accent-primary/20 shadow-xl">
                <img src={profileAbout} alt="Simon Azike - Professional" className="h-full w-full object-cover" />
              </div>

              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-bold text-text-primary">{t('about.name')}</h3>
                <p className="text-lg text-text-secondary">{t('about.role')}</p>

                <div className="space-y-3 pt-3 text-left text-text-secondary">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-accent-primary" />
                    <span>azikeshinye@gmail.com</span>
                  </div>
                  <a
                    href={`https://wa.me/212751780853?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-text-secondary transition-colors hover:text-accent-primary"
                  >
                    <Phone size={16} className="text-accent-primary" />
                    <span>+212 751-780853</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-accent-primary" />
                    <span>Sale Rabat, Morocco</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-[2rem] border border-border bg-card p-8 shadow-lg"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-2xl font-bold text-text-primary">{t('about.journeyTitle')}</h3>
                  <div className="h-1 w-20 rounded-full bg-accent-primary" />
                </div>

                <div className="space-y-4 text-base leading-relaxed text-text-secondary">
                  <p>{t('about.journeyText')}</p>

                  <details className="about-disclosure rounded-xl border border-border bg-bg-secondary/50 p-4">
                    <summary className="cursor-pointer font-medium text-accent-primary">
                      {t('about.cardiffTitle')}
                    </summary>
                    <div className="about-disclosure__content mt-3 space-y-2 text-sm text-text-secondary">
                      <p>{t('about.cardiffBody')}</p>
                      <a
                        href="https://www.cardiffmet.ac.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent-primary transition-colors hover:text-accent-hover"
                      >
                        {t('about.cardiffLink')}
                      </a>
                    </div>
                  </details>

                  <div className="rounded-xl border-l-4 border-accent-primary bg-bg-secondary/50 p-4">
                    <p>{t('about.journeyNote')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;