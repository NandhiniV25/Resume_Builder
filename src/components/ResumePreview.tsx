import React from 'react';
import type { ResumeData } from '../types/resume';

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div
      id="resume-preview"
      className="bg-white p-12 shadow-lg min-h-[1056px] w-[816px]"
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {data.fullName && (
        <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.fullName}</h1>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
            {data.email && <span>{data.email}</span>}
            {data.phone && <span>•</span>}
            {data.phone && <span>{data.phone}</span>}
            {data.location && <span>•</span>}
            {data.location && <span>{data.location}</span>}
            {data.linkedin && (
              <>
                <span>•</span>
                <span>{data.linkedin}</span>
              </>
            )}
            {data.website && (
              <>
                <span>•</span>
                <span>{data.website}</span>
              </>
            )}
          </div>
        </div>
      )}

      {data.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-800 mb-3">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
            {data.summary}
          </p>
        </div>
      )}

      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-800 mb-3">
            Professional Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-sm text-gray-700">
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </p>
                  </div>
                  <div className="text-sm text-gray-700 text-right">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-line mt-2">
                    {exp.description}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-800 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree}
                      {edu.field && ` in ${edu.field}`}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {edu.institution}
                      {edu.location && ` • ${edu.location}`}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-700">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-700 text-right">
                    {edu.startDate} - {edu.endDate || 'Present'}
                  </div>
                </div>
                {edu.description && (
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line mt-1">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 uppercase border-b border-gray-800 mb-3">
            Skills
          </h2>
          <div className="space-y-2">
            {data.skills.map((category, index) => (
              <div key={index}>
                <span className="font-bold text-gray-900">{category.category}: </span>
                <span className="text-sm text-gray-800">
                  {category.skills.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {!data.fullName &&
        !data.summary &&
        data.experience.length === 0 &&
        data.education.length === 0 &&
        data.skills.length === 0 && (
          <div className="flex items-center justify-center h-96 text-gray-400">
            <div className="text-center">
              <p className="text-xl font-medium">Your Resume Preview</p>
              <p className="text-sm mt-2">
                Start filling out the form to see your resume come to life
              </p>
            </div>
          </div>
        )}
    </div>
  );
}
