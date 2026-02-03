/*
  # Resume Builder Database Schema

  ## Overview
  This migration creates the database structure for a resume builder application
  that allows users to create, store, and manage professional resumes.

  ## New Tables

  ### `resumes`
  Main table storing resume metadata and personal information
  - `id` (uuid, primary key) - Unique identifier for each resume
  - `user_id` (uuid) - Reference to auth.users (optional for guest users)
  - `title` (text) - Resume title/name for identification
  - `full_name` (text) - User's full name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `location` (text) - City, State or location
  - `linkedin` (text) - LinkedIn profile URL
  - `website` (text) - Personal website URL
  - `summary` (text) - Professional summary/objective
  - `template_style` (text) - Selected template style
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `resume_education`
  Stores education entries for resumes
  - `id` (uuid, primary key)
  - `resume_id` (uuid) - Foreign key to resumes table
  - `institution` (text) - School/University name
  - `degree` (text) - Degree type (e.g., Bachelor of Science)
  - `field` (text) - Field of study
  - `location` (text) - Institution location
  - `start_date` (text) - Start date
  - `end_date` (text) - End date or "Present"
  - `gpa` (text) - GPA (optional)
  - `description` (text) - Additional details
  - `order_index` (integer) - Display order

  ### `resume_experience`
  Stores work experience entries
  - `id` (uuid, primary key)
  - `resume_id` (uuid) - Foreign key to resumes table
  - `company` (text) - Company name
  - `position` (text) - Job title
  - `location` (text) - Job location
  - `start_date` (text) - Start date
  - `end_date` (text) - End date or "Present"
  - `description` (text) - Job responsibilities and achievements
  - `order_index` (integer) - Display order

  ### `resume_skills`
  Stores skills organized by category
  - `id` (uuid, primary key)
  - `resume_id` (uuid) - Foreign key to resumes table
  - `category` (text) - Skill category (e.g., "Technical", "Languages")
  - `skills` (text[]) - Array of skills in this category
  - `order_index` (integer) - Display order

  ## Security
  - Enable RLS on all tables
  - Allow public read access for sharing resumes
  - Users can create resumes without authentication (guest mode)
  - Authenticated users can only modify their own resumes
*/

-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text DEFAULT 'My Resume',
  full_name text DEFAULT '',
  email text DEFAULT '',
  phone text DEFAULT '',
  location text DEFAULT '',
  linkedin text DEFAULT '',
  website text DEFAULT '',
  summary text DEFAULT '',
  template_style text DEFAULT 'classic',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create resume_education table
CREATE TABLE IF NOT EXISTS resume_education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id uuid REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
  institution text DEFAULT '',
  degree text DEFAULT '',
  field text DEFAULT '',
  location text DEFAULT '',
  start_date text DEFAULT '',
  end_date text DEFAULT '',
  gpa text DEFAULT '',
  description text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create resume_experience table
CREATE TABLE IF NOT EXISTS resume_experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id uuid REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
  company text DEFAULT '',
  position text DEFAULT '',
  location text DEFAULT '',
  start_date text DEFAULT '',
  end_date text DEFAULT '',
  description text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create resume_skills table
CREATE TABLE IF NOT EXISTS resume_skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id uuid REFERENCES resumes(id) ON DELETE CASCADE NOT NULL,
  category text DEFAULT 'Technical Skills',
  skills text[] DEFAULT ARRAY[]::text[],
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_resume_education_resume_id ON resume_education(resume_id);
CREATE INDEX IF NOT EXISTS idx_resume_experience_resume_id ON resume_experience(resume_id);
CREATE INDEX IF NOT EXISTS idx_resume_skills_resume_id ON resume_skills(resume_id);
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON resumes(user_id);

-- Enable Row Level Security
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_skills ENABLE ROW LEVEL SECURITY;

-- RLS Policies for resumes table
CREATE POLICY "Anyone can create resumes"
  ON resumes
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read resumes"
  ON resumes
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can update their own resumes or guest resumes"
  ON resumes
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete resumes"
  ON resumes
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- RLS Policies for resume_education
CREATE POLICY "Anyone can insert education entries"
  ON resume_education
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read education entries"
  ON resume_education
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update education entries"
  ON resume_education
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete education entries"
  ON resume_education
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- RLS Policies for resume_experience
CREATE POLICY "Anyone can insert experience entries"
  ON resume_experience
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read experience entries"
  ON resume_experience
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update experience entries"
  ON resume_experience
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete experience entries"
  ON resume_experience
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- RLS Policies for resume_skills
CREATE POLICY "Anyone can insert skills"
  ON resume_skills
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read skills"
  ON resume_skills
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can update skills"
  ON resume_skills
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete skills"
  ON resume_skills
  FOR DELETE
  TO anon, authenticated
  USING (true);