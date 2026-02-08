import { Profile, TeachingProject, Contact, FooterData, ProjectLink } from './data';

export const PROFILE_DATA: Profile = {
  name: 'ABIDI Mohamed Fadhel',
  image: '/assets/images/photo.png',
  workplace: 'Lycée Monji Slim Sbiba',
  education: "Titulaire depuis 2013 d'une Licence Fondamentale en Sciences de l'Informatique, obtenue à la Faculté des Sciences de Tunis"
};

export const TEACHING_PROJECT: TeachingProject = {
  title: 'Projets Pédagogiques en Cours',
  mainGoal: 'Numérisation complète de la matière "Systèmes et Technologies de l\'Information"',
  description: 'Destiné aux élèves de 4ème année Sciences de l\'Informatique.',
  objective: 'Moderniser l\'enseignement en le rendant plus accessible, interactif et adapté aux outils numériques contemporains.',
  projectLinks: [
    {
      name: 'Cours',
      url: '/cours.html',
      description: 'Supports structurés et illustrés au format PDF',
      icon: 'Book'
    },
    {
      name: 'TDs',
      url: '/tds.html',
      description: 'Travaux Dirigés avec énoncés clairs et corrections détaillées',
      icon: 'FileText'
    },
    {
      name: 'TPs',
      url: '/tps.html',
      description: 'Travaux Pratiques sous forme de pages web interactives',
      icon: 'Code'
    },
    {
      name: 'Annexes',
      url: '/annexes.html',
      description: 'Documents complémentaires et ressources additionnelles',
      icon: 'Folder'
    },
    {
      name: 'Quiz',
      url: 'https://fodel.github.io/quiz-sti',
      description: 'Plateforme interactive d\'évaluation des connaissances',
      icon: 'HelpCircle'
    }
  ]
};

export const CONTACT_DATA: Contact[] = [
  { type: 'email', icon: 'Mail', value: 'medfadhel.abidi@gmail.com', link: 'mailto:medfadhel.abidi@gmail.com' },
  { type: 'téléphone', icon: 'Phone', value: '+216 28 552 707', link: 'tel:+21628552707' },
  { type: 'github', icon: 'Github', value: 'github.com/fodel', link: 'https://github.com/fodel' },
  { type: 'facebook', icon: 'Facebook', value: 'facebook.com/mohamedelfadhel.abidi', link: 'https://www.facebook.com/mohamedelfadhel.abidi' }
];

export const FOOTER_DATA: FooterData = {
  license: 'Contenu mis à disposition selon les termes de la licence Creative Commons CC BY-NC-SA - Ne pas utiliser pour des objectifs commerciaux.',
  copyright: 'ABIDI Mohamed Fadhel'
};