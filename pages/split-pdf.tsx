import { useState } from 'react'
import Layout from '@/components/Layout'
import ToolHeader from '@/components/ToolHeader'
import ToolControls from '@/components/ToolControls'
import { splitPdf, downloadFile } from '@/lib/pdfUtils'

export default function SplitPDF() {
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<Uint8Array[] | null>(null)

  const handleFilesSelected = async (fileList: FileList) => {
    const file = fileList[0]
    setProcessing(true)
    setResult(null)

    try {
      const splitPdfs = await splitPdf(file)
      setResult(splitPdfs)
    } catch (error) {
      console.error('Error splitting PDF:', error)
      alert('Error splitting PDF. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const handleDownloadAll = () => {
    if (result) {
      result.forEach((pdf, index) => {
        downloadFile(pdf, `page-${index + 1}.pdf`)
      })
    }
  }

  const handleDownloadSingle = (pdf: Uint8Array, index: number) => {
    downloadFile(pdf, `page-${index + 1}.pdf`)
  }

  return (
    <Layout 
      title="Split PDF" 
      description="Split a PDF into separate pages. Each page becomes its own PDF file. Free and secure."
    >
      <ToolHeader
        title="Split PDF"
        description="Separate a PDF into individual pages"
        icon="✂️"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Instructions */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Split PDF</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Select a PDF file to split</li>
            <li>Each page will be extracted as a separate PDF</li>
            <li>Download individual pages or all at once</li>
          </ol>
        </div>

        {/* Upload Area */}
        <div className="card p-8 mb-8">
          <ToolControls
            onFilesSelected={handleFilesSelected}
            acceptedFileTypes="application/pdf"
            multiple={false}
            processing={processing}
            buttonText="Select PDF File"
          />
        </div>

        {/* Download Result */}
        {result && (
          <div className="card p-8">
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-semibold mb-2 text-green-900">PDF Split Successfully!</h3>
              <p className="text-gray-600 mb-4">{result.length} pages extracted</p>
              <button onClick={handleDownloadAll} className="btn-primary">
                Download All Pages
              </button>
            </div>

            <div className="border-t pt-6 mt-6">
              <h4 className="font-semibold mb-4">Download Individual Pages:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {result.map((pdf, index) => (
                  <button
                    key={index}
                    onClick={() => handleDownloadSingle(pdf, index)}
                    className="btn-secondary text-sm py-2 px-3"
                  >
                    Page {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
