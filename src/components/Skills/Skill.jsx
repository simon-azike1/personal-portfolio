import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillsAPI } from '../../services/api';
import { useI18n } from '../../context/I18nContext';

const Skills = () => {
  const { t } = useI18n();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await skillsAPI.getAll();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Define capability categories with titles and explanations
  const capabilityCategories = [
    {
      id: 'frontend',
      title: t('skills.capabilities.frontend.title'),
      explanation: t('skills.capabilities.frontend.explanation'),
      icon: 'Code', // We'll use Lucide icons
      skills: groupedSkills.frontend || []
    },
    {
      id: 'backend',
      title: t('skills.capabilities.backend.title'),
      explanation: t('skills.capabilities.backend.explanation'),
      icon: 'Database',
      skills: groupedSkills.backend || []
    },
    {
      id: 'design',
      title: t('skills.capabilities.design.title'),
      explanation: t('skills.capabilities.design.explanation'),
      icon: 'Palette',
      skills: [] // We'll extract design-related skills or leave empty for now
    },
    {
      id: 'devops',
      title: t('skills.capabilities.devops.title'),
      explanation: t('skills.capabilities.devops.explanation'),
      icon: 'Server',
      skills: groupedSkills.tools || [] // Treat tools as DevOps for now
    }
  ];

  return (
    <section id="skills" className="py-24 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            {t('skills.title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        {loading ? (
          <div className="text-center py-12 text-text-tertiary">{t('skills.loading')}</div>
        ) : Object.keys(groupedSkills).length === 0 ? (
          <div className="text-center py-12 text-text-tertiary">{t('skills.empty')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilityCategories
              .filter(category => category.skills.length > 0)
              .map((category) => (
                <motion.div
                  key={category.id}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 hover:border-accent-primary/20"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: capabilityCategories.indexOf(category) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-accent-primary/10 rounded-xl">
                      {/* Dynamic icon based on category - for now using a placeholder */}
                      <span className="text-accent-primary text-2xl">{category.icon.substring(0, 1).toUpperCase()}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">{category.title}</h3>
                      <p className="text-text-secondary">{category.explanation}</p>
                    </div>
                  </div>

                  {/* Skills list for this category */}
                  <div className="space-y-3">
                    {category.skills.map((skill, index) => (
                      <div key={skill._id} className="flex items-center gap-3 px-3 py-2 bg-accent-primary/5 rounded-md text-sm">
                        <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
                        <span className="text-text-secondary">{skill.name}</span>
                        <span className="ml-auto text-accent-primary/70 text-xs">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
