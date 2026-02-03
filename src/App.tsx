import { useState, useEffect } from 'react';
import { FileText, Save, Download, Eye, EyeOff } from 'lucide-react';
import { PersonalInfoForm } from './components/PersonalInfoForm';
import { EducationForm } from './components/EducationForm';
import { ExperienceForm } from './components/ExperienceForm';
import { SkillsForm } from './components/SkillsForm';
import { ResumePreview } from './components/ResumePreview';
import { supabase } from './lib/supabase';
import type { ResumeData } from './types/resume';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    title: 'My Resume',
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
    templateStyle: 'classic',
    education: [],
    experience: [],
    skills: [],
  });

  const [activeTab, setActiveTab] = useState('personal');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [resumeId, setResumeId] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      loadResume(id);
    }
  }, []);

  const loadResume = async (id: string) => {
    const { data: resume } = await supabase
      .from('resumes')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (resume) {
      const { data: education } = await supabase
        .from('resume_education')
        .select('*')
        .eq('resume_id', id)
        .order('order_index');

      const { data: experience } = await supabase
        .from('resume_experience')
        .select('*')
        .eq('resume_id', id)
        .order('order_index');

      const { data: skills } = await supabase
        .from('resume_skills')
        .select('*')
        .eq('resume_id', id)
        .order('order_index');

      setResumeData({
        id: resume.id,
        title: resume.title,
        fullName: resume.full_name,
        email: resume.email,
        phone: resume.phone,
        location: resume.location,
        linkedin: resume.linkedin,
        website: resume.website,
        summary: resume.summary,
        templateStyle: resume.template_style,
        education:
          education?.map((e) => ({
            id: e.id,
            institution: e.institution,
            degree: e.degree,
            field: e.field,
            location: e.location,
            startDate: e.start_date,
            endDate: e.end_date,
            gpa: e.gpa,
            description: e.description,
          })) || [],
        experience:
          experience?.map((e) => ({
            id: e.id,
            company: e.company,
            position: e.position,
            location: e.location,
            startDate: e.start_date,
            endDate: e.end_date,
            description: e.description,
          })) || [],
        skills:
          skills?.map((s) => ({
            id: s.id,
            category: s.category,
            skills: s.skills,
          })) || [],
      });
      setResumeId(id);
    }
  };

  const updateResumeData = (updates: Partial<ResumeData>) => {
    setResumeData((prev) => ({ ...prev, ...updates }));
  };

  const saveResume = async () => {
    setSaving(true);
    setSaveMessage('');

    try {
      let currentResumeId = resumeId;

      if (currentResumeId) {
        const { error } = await supabase
          .from('resumes')
          .update({
            title: resumeData.title,
            full_name: resumeData.fullName,
            email: resumeData.email,
            phone: resumeData.phone,
            location: resumeData.location,
            linkedin: resumeData.linkedin,
            website: resumeData.website,
            summary: resumeData.summary,
            template_style: resumeData.templateStyle,
            updated_at: new Date().toISOString(),
          })
          .eq('id', currentResumeId);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('resumes')
          .insert({
            title: resumeData.title,
            full_name: resumeData.fullName,
            email: resumeData.email,
            phone: resumeData.phone,
            location: resumeData.location,
            linkedin: resumeData.linkedin,
            website: resumeData.website,
            summary: resumeData.summary,
            template_style: resumeData.templateStyle,
          })
          .select()
          .single();

        if (error) throw error;
        currentResumeId = data.id;
        setResumeId(currentResumeId);
        window.history.pushState({}, '', `?id=${currentResumeId}`);
      }

      await supabase
        .from('resume_education')
        .delete()
        .eq('resume_id', currentResumeId);

      if (resumeData.education.length > 0) {
        await supabase.from('resume_education').insert(
          resumeData.education.map((edu, index) => ({
            resume_id: currentResumeId,
            institution: edu.institution,
            degree: edu.degree,
            field: edu.field,
            location: edu.location,
            start_date: edu.startDate,
            end_date: edu.endDate,
            gpa: edu.gpa,
            description: edu.description,
            order_index: index,
          }))
        );
      }

      await supabase
        .from('resume_experience')
        .delete()
        .eq('resume_id', currentResumeId);

      if (resumeData.experience.length > 0) {
        await supabase.from('resume_experience').insert(
          resumeData.experience.map((exp, index) => ({
            resume_id: currentResumeId,
            company: exp.company,
            position: exp.position,
            location: exp.location,
            start_date: exp.startDate,
            end_date: exp.endDate,
            description: exp.description,
            order_index: index,
          }))
        );
      }

      await supabase.from('resume_skills').delete().eq('resume_id', currentResumeId);

      if (resumeData.skills.length > 0) {
        await supabase.from('resume_skills').insert(
          resumeData.skills.map((skill, index) => ({
            resume_id: currentResumeId,
            category: skill.category,
            skills: skill.skills,
            order_index: index,
          }))
        );
      }

      setSaveMessage('Resume saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      console.error('Error saving resume:', error);
      setSaveMessage('Error saving resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const downloadPDF = () => {
    window.print();
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
          }
        }
      `}</style>

      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" size={32} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
                <p className="text-sm text-gray-600">
                  Create professional, ATS-friendly resumes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                {showPreview ? <EyeOff size={18} /> : <Eye size={18} />}
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>

              <button
                onClick={saveResume}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                <Save size={18} />
                {saving ? 'Saving...' : 'Save'}
              </button>

              <button
                onClick={downloadPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Download size={18} />
                Download PDF
              </button>
            </div>
          </div>

          {saveMessage && (
            <div
              className={`mt-3 p-3 rounded-md ${
                saveMessage.includes('Error')
                  ? 'bg-red-50 text-red-700'
                  : 'bg-green-50 text-green-700'
              }`}
            >
              {saveMessage}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1'}`}>
          <div className={showPreview ? '' : 'max-w-4xl mx-auto w-full'}>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="border-b border-gray-200 mb-6">
                <nav className="flex space-x-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div>
                {activeTab === 'personal' && (
                  <PersonalInfoForm data={resumeData} onChange={updateResumeData} />
                )}
                {activeTab === 'experience' && (
                  <ExperienceForm
                    experience={resumeData.experience}
                    onChange={(experience) => updateResumeData({ experience })}
                  />
                )}
                {activeTab === 'education' && (
                  <EducationForm
                    education={resumeData.education}
                    onChange={(education) => updateResumeData({ education })}
                  />
                )}
                {activeTab === 'skills' && (
                  <SkillsForm
                    skills={resumeData.skills}
                    onChange={(skills) => updateResumeData({ skills })}
                  />
                )}
              </div>
            </div>
          </div>

          {showPreview && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-[calc(100vh-120px)]">
                <div className="transform scale-75 origin-top-left" style={{ width: '133.33%' }}>
                  <ResumePreview data={resumeData} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
