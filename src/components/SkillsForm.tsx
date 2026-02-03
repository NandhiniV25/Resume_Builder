import React from 'react';
import { Plus, Trash2, X } from 'lucide-react';
import type { SkillCategory } from '../types/resume';

interface SkillsFormProps {
  skills: SkillCategory[];
  onChange: (skills: SkillCategory[]) => void;
}

export function SkillsForm({ skills, onChange }: SkillsFormProps) {
  const addCategory = () => {
    onChange([
      ...skills,
      {
        category: '',
        skills: [],
      },
    ]);
  };

  const removeCategory = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, updates: Partial<SkillCategory>) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], ...updates };
    onChange(newSkills);
  };

  const addSkillToCategory = (categoryIndex: number, skill: string) => {
    if (!skill.trim()) return;
    const newSkills = [...skills];
    newSkills[categoryIndex].skills = [...newSkills[categoryIndex].skills, skill.trim()];
    onChange(newSkills);
  };

  const removeSkillFromCategory = (categoryIndex: number, skillIndex: number) => {
    const newSkills = [...skills];
    newSkills[categoryIndex].skills = newSkills[categoryIndex].skills.filter(
      (_, i) => i !== skillIndex
    );
    onChange(newSkills);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        <button
          onClick={addCategory}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {skills.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="p-4 border border-gray-200 rounded-lg space-y-3 bg-gray-50"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-700">Category #{categoryIndex + 1}</h3>
            <button
              onClick={() => removeCategory(categoryIndex)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name *
            </label>
            <input
              type="text"
              value={category.category}
              onChange={(e) =>
                updateCategory(categoryIndex, { category: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Technical Skills, Languages, Tools"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Type a skill and press Enter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkillToCategory(categoryIndex, e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  addSkillToCategory(categoryIndex, input.value);
                  input.value = '';
                }}
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-colors"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkillFromCategory(categoryIndex, skillIndex)}
                    className="hover:text-blue-900"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>

            {category.skills.length === 0 && (
              <p className="text-sm text-gray-500 italic">No skills added yet</p>
            )}
          </div>
        </div>
      ))}

      {skills.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No skill categories yet. Click "Add Category" to get started.
        </div>
      )}
    </div>
  );
}
