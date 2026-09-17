import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  Mail,
  ChevronRight,
  X
} from 'lucide-react';
import { projectsAPI } from '../../services/api';
import { useI18n } from '../../context/I18nContext';

const Projects = () => {
  const { t } = useI18n();
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="projects"
      className="py-24 bg-bg-secondary"
      aria-label={t('projects.sectionLabel')}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
          <div className="mt-6 space-y-4 text-text-secondary">
            <p className="text-sm uppercase tracking-[0.2em] text-text-tertiary">{t('projects.metaTitle')}</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent-primary"></span>
                <span>{t('projects.metaOne')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent-primary"></span>
                <span>{t('projects.metaTwo')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-accent-primary"></span>
                <span>{t('projects.metaThree')}</span>
              </li>
            </ul>
          </div>
        </motion.header>

        {/* Projects */}
        {loading ? (
          <div className="text-center py-12 text-text-tertiary">{t('projects.loading')}</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-text-tertiary">{t('projects.empty')}</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.article
                key={project._id}
                variants={itemVariants}
                className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group hover:border-accent-primary/20"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full bg-accent-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-accent-hover"
                          aria-label={`View ${project.title} live`}
                        >
                          <ExternalLink size={14} />
                          <span>Live</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
                          aria-label={`View ${project.title} source code`}
                        >
                          <Github size={14} />
                          <span>Code</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="px-3 py-1 bg-bg-secondary/50 text-accent-primary rounded-full font-medium border border-accent-primary/20">{project.category}</span>
                    {project.featured && (
                      <span className="px-3 py-1 bg-bg-secondary/50 text-accent-secondary rounded-full font-medium border border-accent-primary/20">{t('projects.featured')}</span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>

                  <p className="text-text-secondary leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-3 py-1 bg-bg-secondary/50 text-text-secondary rounded-md text-xs font-medium border border-border">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-primary hover:text-accent-hover flex items-center gap-2"
                      >
                        <ExternalLink size={14} />
                        <span>{t('projects.viewLive')}</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-primary hover:text-accent-hover flex items-center gap-2 ml-4"
                      >
                        <Github size={14} />
                        <span>{t('projects.viewCode')}</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.94, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.96, y: 24, opacity: 0 }}
                className="relative max-h-[calc(100vh-2rem)] w-full max-w-5xl overflow-y-auto rounded-[2rem] border border-border bg-bg-primary shadow-[0_30px_80px_rgba(15,23,42,0.65)]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="sticky right-4 top-4 z-20 ml-auto flex h-11 w-11 translate-y-4 items-center justify-center rounded-full border border-border bg-bg-tertiary text-text-primary shadow-lg transition hover:bg-accent-primary hover:text-white"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>

                <div className="relative -mt-11 h-[280px] w-full overflow-hidden md:h-[360px]">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/35 to-transparent" />
                </div>

                <div className="space-y-6 p-6 md:p-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="mb-3 text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
                        {selectedProject.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary">
                        <span className="rounded-full border border-accent-primary/30 bg-accent-primary/10 px-3 py-1 font-medium text-accent-primary">
                          {selectedProject.category}
                        </span>
                        {selectedProject.featured && (
                          <span className="rounded-full border border-accent-secondary/30 bg-accent-secondary/10 px-3 py-1 font-medium text-accent-secondary">
                            {t('projects.featured')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
                    <div className="space-y-5">
                      <div>
                        <h4 className="mb-3 text-xl font-bold text-text-primary">{t('projects.overview')}</h4>
                        <p className="text-base leading-7 text-text-secondary">{selectedProject.description}</p>
                      </div>

                      <div>
                        <h4 className="mb-3 text-xl font-bold text-text-primary">{t('projects.technologies')}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="rounded-xl border border-border bg-bg-secondary px-3 py-2 text-sm font-medium text-text-secondary"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-1">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
                        >
                          <ExternalLink size={18} />
                          {t('projects.viewLive')}
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full border border-accent-primary/50 bg-transparent px-5 py-3 text-sm font-semibold text-accent-primary transition hover:bg-accent-primary/10"
                        >
                          <Github size={18} />
                          {t('projects.viewCode')}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Projects;