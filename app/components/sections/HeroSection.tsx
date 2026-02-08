"use client";

import { motion } from "framer-motion";
import { FiArrowDown, FiBook, FiCode, FiUsers } from "react-icons/fi";

export default function HeroSection() {
  return (
    <section id="home" className="min-h-[80vh] flex items-center pt-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">
                    Enseignant STI
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  Innovation
                  <span className="block text-gray-600">Pédagogique</span>
                  <span className="block text-gray-900">Numérique</span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                  Je transforme l&apos;enseignement des{" "}
                  <span className="font-semibold text-gray-900">
                    Systèmes et Technologies de l&apos;Information
                  </span>
                  pour les élèves de 4ème année SI à travers une numérisation
                  complète et moderne.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                <div className="text-center p-4 bg-white border border-gray-100 rounded-xl">
                  <FiBook className="w-6 h-6 text-gray-700 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">STI</div>
                  <div className="text-sm text-gray-600">Matière</div>
                </div>

                <div className="text-center p-4 bg-white border border-gray-100 rounded-xl">
                  <FiUsers className="w-6 h-6 text-gray-700 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    4ème SI
                  </div>
                  <div className="text-sm text-gray-600">Niveau</div>
                </div>

                <div className="text-center p-4 bg-white border border-gray-100 rounded-xl">
                  <FiCode className="w-6 h-6 text-gray-700 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-sm text-gray-600">Numérisé</div>
                </div>

                <div className="text-center p-4 bg-white border border-gray-100 rounded-xl">
                  <div className="w-6 h-6 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl">📚</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">5+</div>
                  <div className="text-sm text-gray-600">Projets</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100" />

              <div className="absolute inset-0 opacity-5">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px),
                                  linear-gradient(to bottom, #000 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>

              {/* Content Overlay */}
              <div className="relative p-8 lg:p-12">
                <div className="space-y-6">
                  <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                    <div className="text-sm font-medium text-gray-500 mb-2">
                      Projet Principal
                    </div>
                    <div className="text-xl font-bold text-gray-900 mb-3">
                      Numérisation STI
                    </div>
                    <p className="text-gray-600 text-sm">
                      Transformation complète du programme en ressources
                      digitales interactives
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                      <div className="text-sm text-gray-500">Objectif</div>
                      <div className="font-semibold text-gray-900">
                        Modernisation
                      </div>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl">
                      <div className="text-sm text-gray-500">Format</div>
                      <div className="font-semibold text-gray-900">
                        100% Digital
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center text-gray-400"
          >
            <span className="text-xs mb-2">Découvrir</span>
            <FiArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
