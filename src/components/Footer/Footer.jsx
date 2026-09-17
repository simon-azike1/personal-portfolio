import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Code
} from 'lucide-react'
import { useI18n } from '../../context/I18nContext'

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentYear] = useState(new Date().getFullYear())
  const { t } = useI18n()

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide footer on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null
  }

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Social links data
  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/simon-azike1'
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://www.linkedin.com/in/simonzik/'
    },
    
    { 
      name: 'Email', 
      icon: Mail, 
      url: 'mailto:azikeshinye@gmail.com'
    }
  ]

  // Quick links data
  const quickLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.contact'), href: '#contact' }
  ]

  // Tech stack data
  const techStack = [
    { name: 'React', icon: '' },
    { name: 'Tailwind', icon: '' },
    { name: 'Framer Motion', icon: '' }
  ]

  return (
    <>
      {/* Enhanced Footer */}
      <footer className="border-t border-border bg-bg-secondary/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:px-8 lg:px-12">
          <div className="space-y-12">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_0.8fr_0.8fr] lg:gap-20">
              {/* Brand Section */}
              <motion.div
                className="space-y-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <a href="#home" className="inline-flex items-center gap-3 group">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-accent-primary/20 p-[2px] shadow-md transition-transform duration-300 hover:scale-105">
                    <span className="h-full w-full rounded-full bg-bg-primary p-[2px]">
                      <img src="/Images/logo.png" alt="SimZik logo" className="h-full w-full rounded-full object-cover" />
                    </span>
                  </span>
                  <span className="brand-wordmark brand-wordmark-hover text-xl font-bold italic text-text-primary">
                    SimzikTech
                  </span>
                </a>
                <p className="text-text-secondary leading-relaxed max-w-md">
                  {t('footer.tagline')}
                </p>
                <a
                  href="#projects"
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-accent-primary/30 bg-accent-primary/10 px-4 py-2.5 text-sm font-semibold text-accent-primary transition-colors hover:bg-accent-primary/20"
                >
                  {t('footer.cta')}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="space-y-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-lg text-text-primary">{t('footer.quickLinks')}</h3>
                <div className="flex flex-col gap-2">
                  {quickLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="inline-block text-sm text-text-secondary transition-colors hover:text-accent-primary"
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="space-y-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-lg text-text-primary">{t('footer.connect')}</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-bg-primary text-text-secondary transition-colors hover:border-accent-primary/40 hover:bg-accent-primary/15 hover:text-accent-primary"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Bottom */}
            <motion.div
              className="flex flex-col items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3">
                <p className="text-sm text-text-tertiary">
                  © {currentYear} SimzikTech. {t('footer.builtWithPassion')}
                </p>
                <button
                  onClick={() => navigate('/admin/login')}
                  className="text-text-tertiary transition-colors hover:text-accent-primary"
                  aria-label="Admin"
                >
                  •
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-text-tertiary">
                <Code size={14} />
                <span className="text-text-primary">{t('footer.builtWith')}</span>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      className="cursor-default rounded border border-border bg-bg-primary px-2.5 py-1 text-xs text-text-secondary transition-colors hover:border-accent-primary/40 hover:bg-accent-primary/15 hover:text-accent-primary"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent-primary text-white shadow-lg transition-colors hover:bg-accent-hover sm:bottom-8 sm:right-8"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={t('footer.scrollTop')}
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Footer
