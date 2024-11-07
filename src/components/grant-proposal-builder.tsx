'use client'

import { useState } from 'react'

export default function GrantProposalBuilder() {
  const [activeSection, setActiveSection] = useState('overview')
  
  const sections = [
    { id: 'overview', label: 'Project Overview' },
    { id: 'goals', label: 'Goals & Objectives' },
    { id: 'methodology', label: 'Methodology' },
    { id: 'budget', label: 'Budget' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'evaluation', label: 'Evaluation Plan' }
  ]

  return (
    <div className="space-y-6">
      {/* Section Navigation */}
      <div className="flex space-x-2 border-b">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 ${
              activeSection === section.id
                ? 'border-b-2 border-blue-500 font-semibold'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Content Editor */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {sections.find(s => s.id === activeSection)?.label}
          </h2>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => {/* Add save functionality */}}
          >
            Save Progress
          </button>
        </div>

        <textarea
          className="w-full h-[500px] p-4 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder={`Enter your ${activeSection} details here...`}
        />

        <div className="flex justify-between">
          <button 
            className="px-4 py-2 text-blue-500 hover:text-blue-600"
            onClick={() => {/* Add AI assist functionality */}}
          >
            Ask AI for help
          </button>
          <div className="space-x-2">
            <button className="px-4 py-2 border rounded hover:bg-gray-50">
              Preview
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 