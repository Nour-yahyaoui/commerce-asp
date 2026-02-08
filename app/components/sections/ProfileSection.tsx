"use client";

import { motion } from "framer-motion";
import {
  FiBook,
  FiFileText,
  FiCode,
  FiFolder,
  FiHelpCircle,
  FiExternalLink,
  FiCheckCircle,
} from "react-icons/fi";
import { TEACHING_PROJECT } from "../../data/constants";

export default function TeachingProjects() {
  const projectStats = [
    { label: "Accessibilité", value: "100%" },
    { label: "Interactivité", value: "Élevée" },
    { label: "Modernité", value: "Maximale" },
    { label: "Impact", value: "Significatif" },
  ];

  const getIcon = (iconName: string) => {
    const iconClass = "w-5 h-5";
    switch (iconName) {
      case "Book":
        return <FiBook className={iconClass} />;
      case "FileText":
        return <FiFileText className={iconClass} />;
      case "Code":
        return <FiCode className={iconClass} />;
      case "Folder":
        return <FiFolder className={iconClass} />;
      case "HelpCircle":
        return <FiHelpCircle className={iconClass} />;
      default:
        return <FiBook className={iconClass} />;
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center">
            {/* Profile Image */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="mb-8"
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">

                <img
                  src="/photo.png"
                  alt="ABIDI Mohamed Fadhel"
                  className="object-cover w-full h-full"
                />
              </div>
            </motion.div>

            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Projet de Numérisation
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Transformation complète de la matière STI en ressources digitales
              modernes et interactives
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Dirigé par{" "}
              <span className="font-semibold text-gray-700">
                ABIDI Mohamed Fadhel
              </span>
            </div>
          </div>
        </motion.div>

        {/* Project Overview with Author Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-12"
        >
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Author Info */}
              <div className="lg:col-span-1">
                <div className="flex flex-col items-center lg:items-start">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-gray-200">
                    <img
                      src="/photo.png"
                      alt="ABIDI Mohamed Fadhel"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    ABIDI Mohamed Fadhel
                  </h4>
                  <p className="text-gray-600 text-sm text-center lg:text-left">
                    Enseignant STI
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    Lycée Monji Slim Sbiba
                  </p>
                </div>
              </div>

              {/* Project Stats */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {projectStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Objectifs Principaux
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Moderniser l&apos;enseignement avec des outils
                        numériques contemporains
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Rendre les ressources accessibles sur tous les appareils
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FiCheckCircle className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        Créer une expérience d&apos;apprentissage interactive et
                        engageante
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Cards with Author Signature */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEACHING_PROJECT.projectLinks.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all h-full overflow-hidden flex flex-col">
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-100 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <div className="text-gray-700">
                          {getIcon(project.icon)}
                        </div>
                      </div>
                      <FiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {project.name}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Footer with Author */}
                  <div className="p-4 bg-gray-50 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <img
                            src="/photo.png"
                            alt="Author"
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="text-xs font-medium text-gray-900">
                            ABIDI M. Fadhel
                          </div>
                          <div className="text-xs text-gray-500">Auteur</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">
                        {index + 1}/{TEACHING_PROJECT.projectLinks.length}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Impact with Large Author Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mt-16"
        >
          <div className="bg-gray-900 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Author Sidebar */}
              <div className="lg:col-span-1 p-8 flex flex-col items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900">
                <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-700 mb-6">
                  <img
                    src="/photo.png"
                    alt="ABIDI Mohamed Fadhel"
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  ABIDI Mohamed Fadhel
                </h3>
                <p className="text-gray-300 text-center">
                  Enseignant STI & Porteur du Projet
                </p>
                <p className="text-gray-400 text-sm mt-4 text-center">
                  Lycée Monji Slim Sbiba
                  <br />
                  Tunisie
                </p>
              </div>

              {/* Impact Content */}
              <div className="lg:col-span-2 p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Impact sur l&apos;Éducation
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Ce projet représente une avancée significative dans la
                  digitalisation de l&apos;enseignement en Tunisie. En
                  centralisant toutes les ressources pédagogiques sur une
                  plateforme unique, nous créons un écosystème
                  d&apos;apprentissage moderne, accessible et évolutif.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">1</div>
                    <div className="text-sm text-gray-300">Plateforme</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">5</div>
                    <div className="text-sm text-gray-300">Composants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">∞</div>
                    <div className="text-sm text-gray-300">Accessibilité</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      100%
                    </div>
                    <div className="text-sm text-gray-300">Digital</div>
                  </div>
                </div>

                {/* Quote */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <p className="text-gray-400 italic">
                    &ldquo;Notre objectif est de préparer les élèves aux défis
                    numériques du 21ème siècle en transformant radicalement
                    notre manière d&apos;enseigner.&rdquo;
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    - ABIDI Mohamed Fadhel
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
