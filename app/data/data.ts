export interface ProjectLink {
  name: string;
  url: string;
  description: string;
  icon: string;
}

export interface Profile {
  name: string;
  image: string;
  workplace: string;
  education: string;
}

export interface TeachingProject {
  title: string;
  mainGoal: string;
  description: string;
  objective: string;
  projectLinks: ProjectLink[];
}

export interface Contact {
  type: string;
  icon: string;
  value: string;
  link: string;
}

export interface FooterData {
  license: string;
  copyright: string;
}