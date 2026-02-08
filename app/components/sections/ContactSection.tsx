'use client';

import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiGithub, FiFacebook, FiMessageSquare } from 'react-icons/fi';
import { CONTACT_DATA } from '../../data/constants';

export default function ContactSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const cardHoverVariants = {
    hover: {
      y: -5,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      transition: { duration: 0.2 }
    }
  };

  const getIcon = (iconName: string) => {
    const iconClass = "w-5 h-5";
    switch (iconName) {
      case 'Mail': return <FiMail className={iconClass} />;
      case 'Phone': return <FiPhone className={iconClass} />;
      case 'Github': return <FiGithub className={iconClass} />;
      case 'Facebook': return <FiFacebook className={iconClass} />;
      default: return <FiMessageSquare className={iconClass} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-gradient-to-br from-blue-50 to-blue-100/50';
      case 'téléphone': return 'bg-gradient-to-br from-green-50 to-emerald-100/50';
      case 'github': return 'bg-gradient-to-br from-gray-50 to-gray-100/50';
      case 'facebook': return 'bg-gradient-to-br from-blue-50 to-sky-100/50';
      default: return 'bg-gradient-to-br from-gray-50 to-gray-100/50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'email': return 'text-blue-600 group-hover:text-blue-700';
      case 'téléphone': return 'text-green-600 group-hover:text-emerald-700';
      case 'github': return 'text-gray-700 group-hover:text-gray-900';
      case 'facebook': return 'text-blue-700 group-hover:text-sky-800';
      default: return 'text-gray-600 group-hover:text-gray-800';
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case 'email': return 'bg-gradient-to-br from-blue-100 to-blue-200';
      case 'téléphone': return 'bg-gradient-to-br from-green-100 to-emerald-200';
      case 'github': return 'bg-gradient-to-br from-gray-100 to-gray-200';
      case 'facebook': return 'bg-gradient-to-br from-blue-100 to-sky-200';
      default: return 'bg-gradient-to-br from-gray-100 to-gray-200';
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Contactez-moi
          </h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full mx-auto mb-6" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Pour toute question, suggestion ou collaboration, n&apos;hésitez pas à me contacter
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {CONTACT_DATA.map((contact) => (
              <motion.a
                key={contact.type}
                href={contact.link}
                target={contact.type === 'github' || contact.type === 'facebook' ? '_blank' : '_self'}
                rel={contact.type === 'github' || contact.type === 'facebook' ? 'noopener noreferrer' : ''}
                variants={itemVariants}
                whileHover="hover"
                className="group relative block"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Card Background */}
                <div className={`relative ${getBgColor(contact.type)} backdrop-blur-[2px] rounded-2xl border border-white/50 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden`}>
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  {/* Content */}
                  <div className="relative p-6 lg:p-8">
                    <div className="flex items-center space-x-5">
                      <div className={`w-14 h-14 rounded-2xl ${getIconBg(contact.type)} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                        <div className={getIconColor(contact.type)}>
                          {getIcon(contact.icon)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                          {contact.type}
                        </p>
                        <p className="text-gray-900 font-bold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300 truncate">
                          {contact.value}
                        </p>
                      </div>
                      <div className={`${getIconColor(contact.type)} opacity-0 group-hover:opacity-100 transform translate-x-3 group-hover:translate-x-0 transition-all duration-300`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            Réponse sous 24h pour les contacts professionnels
          </p>
        </motion.div>
      </div>
    </section>
  );
}