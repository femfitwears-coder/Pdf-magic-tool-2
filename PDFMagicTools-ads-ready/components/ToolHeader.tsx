import React from 'react'

interface ToolHeaderProps {
  title: string
  description: string
  icon: string
}

export default function ToolHeader({ title, description, icon }: ToolHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-primary-100">{description}</p>
      </div>
    </div>
  )
}
