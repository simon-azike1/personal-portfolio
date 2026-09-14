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
    <section id="projects" className="py-24 bg-bg-secondary" aria-label={t('projects.sectionLabel')}>
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
                <div className="relative aspect-[16/9] w-full">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    className="w-full h-full object-cover"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-accent-primary/20 rounded-full px-3 py-1 text-accent-primary hover:bg-accent-primary hover:text-white transition-colors"
                        aria-label={`View ${project.title} live`}
                      >
                        <ExternalLink size={16} />
                        <span>Live</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-accent-primary/20 rounded-full px-3 py-1 text-accent-primary hover:bg-accent-primary hover:text-white transition-colors"
                        aria-label={`View ${project.title} source code`}
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </a>
                    )}
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
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-bg-secondary/50 border border-accent-primary/20 flex items-center justify-center text-accent-primary hover:bg-accent-primary/20 transition-colors z-10"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>

                <div className="aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-text-primary mb-2">{selectedProject.title}</h3>
                    <div className="flex items-center gap-2 text-text-tertiary">
                      <span className="px-3 py-1 bg-bg-secondary/50 text-accent-primary rounded-full text-sm font-medium border border-accent-primary/20">{selectedProject.category}</span>
                      {selectedProject.featured && (
                        <>
                          <span>•</span>
                          <span className="text-accent-secondary">{t('projects.featured')}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-text-primary">{t('projects.overview')}</h4>
                    <p className="text-text-secondary leading-relaxed">{selectedProject.description}</p>

                    <h4 className="text-xl font-bold text-text-primary pt-4">{t('projects.technologies')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="px-4 py-2 bg-bg-secondary/50 text-text-secondary rounded-lg text-sm font-medium border border-border">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-6">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary w-auto py-3 px-6"
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
                          className="btn btn-outline w-auto py-3 px-6"
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
    </section>
  );
};

export default Projects;