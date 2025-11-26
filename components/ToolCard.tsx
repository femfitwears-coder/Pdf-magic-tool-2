import React from 'react'
import Link from 'next/link'

interface ToolCardProps {
  title: string
  description: string
  icon: string
  href: string
}

export default function ToolCard({ title, description, icon, href }: ToolCardProps) {
  return (
    <Link href={href} className="card p-6 hover:border-primary-500 transition-all duration-200 group">
      <div className="flex items-start gap-4">
        <div className="text-4xl group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
