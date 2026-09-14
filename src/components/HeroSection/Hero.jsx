import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ChevronDown, Download } from 'lucide-react';
import profileAbout from '../../assets/Images/profile-about.jpg';
import profileMain2 from '../../assets/Images/profile-main2.png';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen bg-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg-secondary via-bg-primary to-bg-secondary"></div>
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-accent-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent-secondary/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-16 sm:pb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[calc(100vh-10rem)]"
          >
            {/* Text Content */}
            <div className="space-y-6">
              {/* Eyebrow badge with status dot */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent-primary/10 text-accent-primary text-xs font-medium border border-accent-primary/20">
                <span className="h-2 w-2 rounded-full bg-accent-primary"></span>
                {t('nav.available')}
              </motion.div>

              {/* Large headline with accent-highlighted words */}
              <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary leading-tight tracking-tighter">
                We Build{' '}
                <span className="text-accent-primary">
                  Modern Digital Experiences
                </span>
                {' '}
                <span className="text-accent-primary">
                  For Brands Ready To Stand Out
                </span>
              </motion.h1>

              {/* Short supporting paragraph */}
              <motion.p variants={itemVariants} className="text-lg text-text-secondary leading-relaxed max-w-2xl">
                We combine strategy, design, and development to create responsive, high-performance websites that help businesses communicate clearly, build trust, and convert attention into action.
              </motion.p>

              {/* CTA group */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mt-6">
                {/* Primary CTA */}
                <button
                  onClick={() => scrollToSection('projects')}
                  className="btn btn-primary hover:-translate-y-0.5 transition-transform duration-300"
                >
                  View Our Work
                  <span className="ml-2">→</span>
                </button>

                {/* Secondary CTA */}
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-secondary hover:-translate-y-0.5 transition-transform duration-300"
                >
                  Let’s Talk
                </button>
              </motion.div>
            </div>

            {/* Image Content */}
            <motion.div
              variants={imageVariants}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem]">
<img
                   src={profileMain2}
                   alt="Profile image"
                   className="w-full h-full object-cover rounded-3xl shadow-2xl"
                 />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-accent-primary to-transparent opacity-20"></div>


              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <div className="mt-10 flex justify-center">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center gap-2 rounded-full bg-bg-secondary/80 px-4 py-2 text-text-primary shadow-md backdrop-blur-sm hover:text-accent-primary transition-colors cursor-pointer"
              onClick={() => scrollToSection("about")}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              >
                <ChevronDown size={20} />
              </motion.div>
              <span className="text-sm">{t('hero.scroll')}</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          className="text-center mb-16"
        >
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary">
              {t('about.title')}
            </h2>
        </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-lg p-8 border border-border"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                <img src={profileAbout} alt="Simon Azike - Professional" className="w-full h-full object-cover rounded-full" />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-card rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-accent-primary rounded-full"></div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-text-primary">{t('about.name')}</h3>
                <p className="text-lg text-text-secondary">{t('about.role')}</p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Mail size={16} className="text-accent-primary" />
                    <span>azikeshinye@gmail.com</span>
                  </div>
                  <a
                    href={`https://wa.me/212751780853?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition-colors"
                  >
                    <Phone size={16} className="text-accent-primary" />
                    <span>+212 751-780853</span>
                  </a>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <MapPin size={16} className="text-accent-primary" />
                    <span>Sale Rabat, Morocco</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Journey Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-lg p-8 border border-border"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">{t('about.journeyTitle')}</h3>
                  <div className="w-20 h-1 bg-accent-primary"></div>
                </div>

                <div className="space-y-4 text-text-secondary leading-relaxed">
                  <p>
                    {t('about.journeyText')}
                  </p>

                  <details className="about-disclosure rounded-xl border border-border bg-bg-secondary/50 p-4">
                    <summary className="cursor-pointer text-accent-primary font-medium">
                      {t('about.cardiffTitle')}
                    </summary>
                    <div className="about-disclosure__content mt-3 text-sm text-text-secondary space-y-2">
                      <p>
                        {t('about.cardiffBody')}
                      </p>
                      <a
                        href="https://www.cardiffmet.ac.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent-primary hover:text-accent-hover transition-colors"
                      >
                        {t('about.cardiffLink')}
                      </a>
                    </div>
                  </details>

                  <div className="bg-bg-secondary/50 p-4 rounded-lg border-l-4 border-accent-primary">
                    <p className="text-text-secondary">
                      {t('about.journeyNote')}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-accent-primary block">2022</span>
                    <span className="text-sm text-text-tertiary">{t('about.statsStart')}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-accent-primary block">20+</span>
                    <span className="text-sm text-text-tertiary">{t('about.statsSkills')}</span>
</div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-accent-primary block">âˆž</span>
                    <span className="text-sm text-text-tertiary">{t('about.statsPassion')}</span>
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