import { useState } from 'react'
import Layout from '@/components/Layout'
import ToolHeader from '@/components/ToolHeader'
import ToolControls from '@/components/ToolControls'
import AdSense from '@/components/AdSense'
import { mergePdfs, downloadFile } from '@/lib/pdfUtils'

export default function MergePDF() {
  const [processing, setProcessing] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [result, setResult] = useState<Uint8Array | null>(null)

  const handleFilesSelected = async (fileList: FileList) => {
    const files = Array.from(fileList)
    setSelectedFiles(files)
    setProcessing(true)
    setResult(null)

    try {
      const mergedPdf = await mergePdfs(files)
      setResult(mergedPdf)
    } catch (error) {
      console.error('Error merging PDFs:', error)
      alert('Error merging PDFs. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      downloadFile(result, 'merged.pdf')
    }
  }

  return (
    <Layout 
      title="Merge PDF" 
      description="Combine multiple PDF files into one document. Fast, free, and secure - all processing happens in your browser."
    >
      <ToolHeader
        title="Merge PDF"
        description="Combine multiple PDF files into a single document"
        icon="📄"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Instructions */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Merge PDFs</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click the button below to select multiple PDF files</li>
            <li>Files will be merged in the order you select them</li>
            <li>Download the combined PDF file</li>
          </ol>
        </div>

        {/* Upload Area */}
        <div className="card p-8 mb-8">
          <ToolControls
            onFilesSelected={handleFilesSelected}
            acceptedFileTypes="application/pdf"
            multiple={true}
            processing={processing}
            buttonText={selectedFiles.length > 0 ? `Selected ${selectedFiles.length} file(s)` : 'Select PDF Files'}
          />

          {selectedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Selected Files:</h3>
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
            <h3 className="text-2xl font-semibold mb-4 text-green-900">PDF Merged Successfully!</h3>
            <button onClick={handleDownload} className="btn-primary">
              Download Merged PDF
            </button>
          </div>
        )}

        {/* AdSense Ad Unit */}
        <div className="mt-8">
          <AdSense adSlot="1234567891" />
        </div>
      </div>
    </Layout>
  )
}
