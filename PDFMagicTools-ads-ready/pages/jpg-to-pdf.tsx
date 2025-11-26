import { useState } from 'react'
import Layout from '@/components/Layout'
import ToolHeader from '@/components/ToolHeader'
import ToolControls from '@/components/ToolControls'
import { imagesToPdf, downloadFile } from '@/lib/pdfUtils'
import AdBox from '../components/AdBox';

export default function JpgToPDF() {
  const [processing, setProcessing] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [result, setResult] = useState<Uint8Array | null>(null)

  const handleFilesSelected = async (fileList: FileList) => {
    const files = Array.from(fileList)
    setSelectedFiles(files)
    setProcessing(true)
    setResult(null)

    try {
      const pdf = await imagesToPdf(files)
      setResult(pdf)
    } catch (error) {
      console.error('Error converting images to PDF:', error)
      alert('Error converting images to PDF. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      downloadFile(result, 'images.pdf')
    }
  }

  return (
    <Layout 
      title="JPG to PDF" 
      description="Convert JPG and PNG images to a PDF document. Combine multiple images into one PDF file."
    >
      <ToolHeader
        title="JPG to PDF"
        description="Convert images to a PDF document"
        icon="🖼️"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Instructions */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Convert JPG to PDF</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Select one or more image files (JPG, PNG)</li>
            <li>Images will be added in the order you select them</li>
            <li>Download the generated PDF file</li>
          </ol>
        </div>

        {/* Upload Area */}
        <div className="card p-8 mb-8">
          <ToolControls
            onFilesSelected={handleFilesSelected}
            acceptedFileTypes="image/jpeg,image/jpg,image/png"
            multiple={true}
            processing={processing}
            buttonText={selectedFiles.length > 0 ? `Selected ${selectedFiles.length} image(s)` : 'Select Images'}
          />

          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Selected Images:</h3>
              <ul className="space-y-1">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {index + 1}. {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Download Result */}
        {result && (
          <div className="card p-8 text-center bg-green-50 border-green-200">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-semibold mb-4 text-green-900">PDF Created Successfully!</h3>
            <button onClick={handleDownload} className="btn-primary">
              Download PDF
            </button>
          </div>
        )}
      </div>
    </Layout>
  )
}

<AdBox />
