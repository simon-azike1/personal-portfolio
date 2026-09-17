import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Facebook,
  Instagram,
  Music2,
  Send,
  CheckCircle,
  AlertCircle,
  XCircle,
  X,
  Youtube
} from 'lucide-react';
import { useI18n } from '../../context/I18nContext';
import { contactAPI } from '../../services/api';

const Contact = () => {
  const { t } = useI18n();
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const whatsappMessage = encodeURIComponent(t('contact.whatsappMessage'));

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.infoEmail'),
      value: 'azikeshinye@gmail.com',
      link: 'mailto:azikeshinye@gmail.com',
      description: t('contact.infoEmailDesc'),
      ariaLabel: 'Send email to azikeshinye@gmail.com'
    },
    {
      icon: Phone,
      title: t('contact.infoPhone'),
      value: '+212 751-780853',
      link: `https://wa.me/212751780853?text=${whatsappMessage}`,
      description: t('contact.infoPhoneDesc'),
      ariaLabel: 'Message +212 751-780853 on WhatsApp'
    },
    {
      icon: MapPin,
      title: t('contact.infoLocation'),
      value: 'Sale, Rabat, Morocco',
      link: 'https://maps.google.com/?q=Sale,Rabat,Morocco',
      description: t('contact.infoLocationDesc'),
      ariaLabel: 'View Sale, Rabat, Morocco on Google Maps'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub',
      url: 'https://github.com/simon-azike1',
      ariaLabel: 'Visit my GitHub profile'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      url: 'https://www.youtube.com/@SimzikTech',
      ariaLabel: 'Visit my YouTube channel'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      url: 'https://www.facebook.com/simon.azike/',
      ariaLabel: 'Visit my Facebook profile'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/azikeshinye/',
      ariaLabel: 'Visit my Instagram profile'
    },
    {
      icon: X,
      name: 'X',
      url: 'https://x.com/SimonAzike75984',
      ariaLabel: 'Visit my X profile'
    },
    {
      icon: Music2,
      name: 'TikTok',
      url: 'https://vm.tiktok.com/ZS9AdRJ2hEkFB-jKJhr/',
      ariaLabel: 'Visit my TikTok profile'
    }
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateMessage = (message) => {
    return message.trim().length >= 10;
  };

  const validateForm = () => {
    const errors = {};

    if (!validateName(formData.user_name)) {
      errors.user_name = t('forms.invalidName');
    }

    if (!validateEmail(formData.user_email)) {
      errors.user_email = t('forms.invalidEmail');
    }

    if (!validateMessage(formData.message)) {
      errors.message = t('forms.invalidMessage');
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous error message
    setErrorMessage('');

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setFormStatus('loading');

    try {
      await contactAPI.send(formData);
      
      setFormStatus('success');
      setFormData({ user_name: '', user_email: '', message: '' });
      
    } catch (error) {
      console.error('Email sending failed:', error);
      
      setFormStatus('error');
      
      // Set user-friendly error message
      setErrorMessage(error.message || t('forms.sendNetwork'));

      // Auto-hide error message after 7 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage('');
      }, 7000);
    }
  };

  const handleDismissMessage = () => {
    setFormStatus('idle');
    setErrorMessage('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.section
      id="contact"
      className="py-24 bg-bg-secondary"
      aria-label={t('contact.sectionLabel')}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-text-secondary">
              {t('contact.subtitle')}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info - Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Collaborative headline and invitation */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-text-primary">
                {t('contact.invitationTitle')}
              </h3>
              <p className="text-text-secondary">
                {t('contact.invitationDescription')}
              </p>
              
              {/* Availability statement */}
              <div className="flex items-start gap-4 p-4 bg-bg-secondary/50 rounded-lg border border-accent-primary/20">
                <div className="w-10 h-10 flex items-center justify-center bg-accent-primary/20 rounded-full">
                  <span className="h-2 w-2 rounded-full bg-accent-primary"></span>
                </div>
                <div>
                  <h4 className="font-bold text-text-primary">{t('contact.availability')}</h4>
                  <p className="text-text-secondary">{t('contact.availabilityDescription')}</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.title}
                    variants={itemVariants}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="flex items-start gap-4 p-6 bg-card rounded-xl hover:shadow-lg transition-shadow duration-300 border border-border group"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label={info.ariaLabel}
                  >
                    <div className="w-12 h-12 bg-bg-secondary/50 rounded-lg flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-colors flex-shrink-0" aria-hidden="true">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-text-primary text-lg mb-1">{info.title}</h3>
                      <p className="text-accent-primary font-medium mb-1">{info.value}</p>
                      <span className="text-sm text-text-tertiary">{info.description}</span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="bg-card rounded-xl p-6 border border-border"
            >
              <h3 className="text-xl font-bold text-text-primary mb-4">{t('contact.connectTitle')}</h3>
              <div className="flex flex-wrap gap-4" role="navigation" aria-label="Social media links">
                {socialLinks.map(({ icon: Icon, name, url, ariaLabel }) => (
                  <motion.a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 bg-bg-secondary/50 hover:bg-accent-primary/20 hover:text-white text-text-secondary rounded-lg transition-colors font-medium border border-border"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label={ariaLabel}
                  >
                    <Icon size={20} />
                    <span>{name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 shadow-lg border border-border"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-text-primary mb-2">{t('contact.sendTitle')}</h3>
              <p className="text-text-secondary">
                {t('contact.sendSubtitle')}
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
              aria-label={t('contact.formLabel')}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-text-primary mb-2">
                    {t('contact.fullName')} <span className="text-red-500" aria-label={t('contact.required')}>*</span>
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-bg-primary text-text-primary ${
                      fieldErrors.user_name
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-border focus:ring-accent-primary/20 focus:border-accent-primary/20'
                    }`}
                    placeholder={t('contact.placeholderName')}
                    required
                    disabled={formStatus === 'loading'}
                    aria-invalid={!!fieldErrors.user_name}
                    aria-describedby={fieldErrors.user_name ? "user_name_error" : undefined}
                  />
                  {fieldErrors.user_name && (
                    <span id="user_name_error" className="text-sm text-red-600 mt-1 block" role="alert">
                      {fieldErrors.user_name}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-text-primary mb-2">
                    {t('contact.email')} <span className="text-red-500" aria-label={t('contact.required')}>*</span>
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors bg-bg-primary text-text-primary ${
                      fieldErrors.user_email
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-border focus:ring-accent-primary/20 focus:border-accent-primary/20'
                    }`}
                    placeholder={t('contact.placeholderEmail')}
                    required
                    disabled={formStatus === 'loading'}
                    aria-invalid={!!fieldErrors.user_email}
                    aria-describedby={fieldErrors.user_email ? "user_email_error" : undefined}
                  />
                  {fieldErrors.user_email && (
                    <span id="user_email_error" className="text-sm text-red-600 mt-1 block" role="alert">
                      {fieldErrors.user_email}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                  {t('contact.message')} <span className="text-red-500" aria-label={t('contact.required')}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none bg-bg-primary text-text-primary ${
                    fieldErrors.message
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-border focus:ring-accent-primary/20 focus:border-accent-primary/20'
                  }`}
                    placeholder={t('contact.placeholderMessage')}
                    rows="6"
                    required
                    disabled={formStatus === 'loading'}
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? "message_error" : undefined}
                />
                {fieldErrors.message && (
                  <span id="message_error" className="text-sm text-red-600 mt-1 block" role="alert">
                    {fieldErrors.message}
                  </span>
                )}
                <span className="text-sm text-text-tertiary mt-1 block" aria-live="polite">
                  {formData.message.length} {t('contact.count')}
                </span>
              </div>

              <motion.button
                type="submit"
                className={`w-full btn ${
                  formStatus === 'success' ? 'bg-accent-primary hover:bg-accent-hover text-white' : 
                  formStatus === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' : 
                  'btn-primary'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={formStatus === 'loading'}
                whileHover={{ scale: formStatus === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: formStatus === 'loading' ? 1 : 0.98 }}
                aria-busy={formStatus === 'loading'}
              >
                {formStatus === 'loading' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    aria-hidden="true"
                  />
                )}
                {formStatus === 'success' && <CheckCircle size={18} aria-hidden="true" />}
                {formStatus === 'error' && <AlertCircle size={18} aria-hidden="true" />}
                {formStatus === 'idle' && <Send size={18} aria-hidden="true" />}

                <span>
                  {formStatus === 'loading' && t('contact.sending')}
                  {formStatus === 'success' && t('contact.sent')}
                  {formStatus === 'error' && t('contact.retry')}
                  {formStatus === 'idle' && t('contact.submit')}
                </span>
              </motion.button>
            </form>

            {/* Status Messages */}
            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-6 backdrop-blur-sm"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="contact-success-title"
                  onClick={handleDismissMessage}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative w-full max-w-md overflow-hidden rounded-3xl border border-accent-primary/30 bg-bg-primary p-8 text-center shadow-2xl sm:p-10"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-accent-primary" />
                    <button
                      onClick={handleDismissMessage}
                      className="absolute right-4 top-4 rounded-full p-2 text-text-tertiary transition-colors hover:bg-bg-secondary hover:text-text-primary"
                      aria-label="Dismiss success message"
                    >
                      <XCircle size={22} />
                    </button>
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-4 border-accent-primary/30 bg-bg-secondary p-1.5 text-accent-primary shadow-[0_0_0_10px_rgba(92,191,13,0.06)]">
                      <img src="/Images/logo.png" alt="SimzikTech logo" className="h-full w-full rounded-full object-cover" />
                    </div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-primary">SimzikTech</p>
                    <h4 id="contact-success-title" className="text-3xl font-black tracking-tight text-text-primary">
                      {t('contact.successTitle')}
                    </h4>
                    <p className="mx-auto mt-4 max-w-sm text-base leading-7 text-text-secondary">
                      {t('contact.successBody')}
                    </p>
                    <button
                      onClick={handleDismissMessage}
                      className="mt-8 inline-flex items-center justify-center rounded-full bg-accent-primary px-7 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
                    >
                      {t('contact.submit')}
                    </button>
                  </motion.div>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <h4 className="font-bold text-red-900 dark:text-red-100">{t('contact.errorTitle')}</h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      {errorMessage || t('contact.errorBody')}
                    </p>
                  </div>
                  <button
                    onClick={handleDismissMessage}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 transition-colors"
                    aria-label="Dismiss error message"
                  >
                    <XCircle size={18} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        
      </div>
    </motion.section>
  );
};

export default Contact;
