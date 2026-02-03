import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { ExperienceEntry } from '../types/resume';

interface ExperienceFormProps {
  experience: ExperienceEntry[];
  onChange: (experience: ExperienceEntry[]) => void;
}

export function ExperienceForm({ experience, onChange }: ExperienceFormProps) {
  const addExperience = () => {
    onChange([
      ...experience,
      {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const removeExperience = (index: number) => {
    onChange(experience.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, updates: Partial<ExperienceEntry>) => {
    const newExperience = [...experience];
    newExperience[index] = { ...newExperience[index], ...updates };
    onChange(newExperience);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {experience.map((exp, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-700">Experience #{index + 1}</h3>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(index, { company: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Company Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position *
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(index, { position: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExperience(index, { location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(index, { startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jan 2020"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(index, { endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Present"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Responsibilities & Achievements *
              </label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(index, { description: e.target.value })}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="• Led development of key features&#10;• Improved system performance by 40%&#10;• Mentored junior developers"
              />
              <p className="mt-1 text-xs text-gray-500">
                Tip: Use bullet points (•) for better readability
              </p>
            </div>
          </div>
        </div>
      ))}

      {experience.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No experience entries yet. Click "Add Experience" to get started.
        </div>
      )}
    </div>
  );
}
