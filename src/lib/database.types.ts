export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      resumes: {
        Row: {
          id: string;
          user_id: string | null;
          title: string;
          full_name: string;
          email: string;
          phone: string;
          location: string;
          linkedin: string;
          website: string;
          summary: string;
          template_style: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          title?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          location?: string;
          linkedin?: string;
          website?: string;
          summary?: string;
          template_style?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          title?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          location?: string;
          linkedin?: string;
          website?: string;
          summary?: string;
          template_style?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      resume_education: {
        Row: {
          id: string;
          resume_id: string;
          institution: string;
          degree: string;
          field: string;
          location: string;
          start_date: string;
          end_date: string;
          gpa: string;
          description: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          resume_id: string;
          institution?: string;
          degree?: string;
          field?: string;
          location?: string;
          start_date?: string;
          end_date?: string;
          gpa?: string;
          description?: string;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          resume_id?: string;
          institution?: string;
          degree?: string;
          field?: string;
          location?: string;
          start_date?: string;
          end_date?: string;
          gpa?: string;
          description?: string;
          order_index?: number;
          created_at?: string;
        };
      };
      resume_experience: {
        Row: {
          id: string;
          resume_id: string;
          company: string;
          position: string;
          location: string;
          start_date: string;
          end_date: string;
          description: string;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          resume_id: string;
          company?: string;
          position?: string;
          location?: string;
          start_date?: string;
          end_date?: string;
          description?: string;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          resume_id?: string;
          company?: string;
          position?: string;
          location?: string;
          start_date?: string;
          end_date?: string;
          description?: string;
          order_index?: number;
          created_at?: string;
        };
      };
      resume_skills: {
        Row: {
          id: string;
          resume_id: string;
          category: string;
          skills: string[];
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          resume_id: string;
          category?: string;
          skills?: string[];
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          resume_id?: string;
          category?: string;
          skills?: string[];
          order_index?: number;
          created_at?: string;
        };
      };
    };
  };
}
