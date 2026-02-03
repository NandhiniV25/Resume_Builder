export interface ResumeData {
  id?: string;
  title: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  templateStyle: string;
  education: EducationEntry[];
  experience: ExperienceEntry[];
  skills: SkillCategory[];
}

export interface EducationEntry {
  id?: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  description: string;
}

export interface ExperienceEntry {
  id?: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface SkillCategory {
  id?: string;
  category: string;
  skills: string[];
}
