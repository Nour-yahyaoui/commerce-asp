'use client';

import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { FOOTER_DATA } from '../data/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* License */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <p className="text-sm text-gray-600 leading-relaxed">
              {FOOTER_DATA.license}
            </p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
              <p>
                &copy; {currentYear} - {FOOTER_DATA.copyright}
              </p>
              
              <div className="hidden md:block">•</div>
              
              <div className="flex items-center gap-2">
                <span>Créé avec</span>
                <FiHeart className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}