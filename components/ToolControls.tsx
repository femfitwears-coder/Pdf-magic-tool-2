import React, { useRef } from 'react'

interface ToolControlsProps {
  onFilesSelected: (files: FileList) => void
  acceptedFileTypes: string
  multiple?: boolean
  processing: boolean
  buttonText?: string
}

export default function ToolControls({
  onFilesSelected,
  acceptedFileTypes,
  multiple = false,
  processing,
  buttonText = 'Select Files'
}: ToolControlsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files)
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        accept={acceptedFileTypes}
        multiple={multiple}
        className="hidden"
      />
      
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          disabled={processing}
          className="btn-primary px-8 py-4 text-lg"
        >
          {processing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            buttonText
          )}
        </button>
      </div>
    </div>
  )
}
