import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { EducationEntry } from '../types/resume';

interface EducationFormProps {
  education: EducationEntry[];
  onChange: (education: EducationEntry[]) => void;
}

export function EducationForm({ education, onChange }: EducationFormProps) {
  const addEducation = () => {
    onChange([
      ...education,
      {
        institution: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: '',
      },
    ]);
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, updates: Partial<EducationEntry>) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], ...updates };
    onChange(newEducation);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>

      {education.map((edu, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-700">Education #{index + 1}</h3>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution *
              </label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => updateEducation(index, { institution: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="University Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree *
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEducation(index, { degree: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Bachelor of Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Field of Study *
              </label>
              <input
                type="text"
                value={edu.field}
                onChange={(e) => updateEducation(index, { field: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) => updateEducation(index, { location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Boston, MA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, { startDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Sep 2018"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="text"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, { endDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="May 2022 or Present"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) => updateEducation(index, { gpa: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="3.8/4.0"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Details
              </label>
              <textarea
                value={edu.description}
                onChange={(e) => updateEducation(index, { description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Honors, awards, relevant coursework..."
              />
            </div>
          </div>
        </div>
      ))}

      {education.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No education entries yet. Click "Add Education" to get started.
        </div>
      )}
    </div>
  );
}
