import { useState } from 'react'
import Layout from '@/components/Layout'
import ToolHeader from '@/components/ToolHeader'
import ToolControls from '@/components/ToolControls'
import { pdfToImages, downloadFile } from '@/lib/pdfUtils'

export default function PdfToJpg() {
  const [processing, setProcessing] = useState(false)
  const [result, setResult] = useState<Blob[] | null>(null)

  const handleFilesSelected = async (fileList: FileList) => {
    const file = fileList[0]
    setProcessing(true)
    setResult(null)

    try {
      const images = await pdfToImages(file)
      setResult(images)
    } catch (error) {
      console.error('Error converting PDF to images:', error)
      alert('Error converting PDF to images. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const handleDownloadAll = () => {
    if (result) {
      result.forEach((image, index) => {
        downloadFile(image, `page-${index + 1}.jpg`)
      })
    }
  }

  const handleDownloadSingle = (image: Blob, index: number) => {
    downloadFile(image, `page-${index + 1}.jpg`)
  }

  return (
    <Layout 
      title="PDF to JPG" 
      description="Convert PDF pages to JPG images. Extract each page as a high-quality image file."
    >
      <ToolHeader
        title="PDF to JPG"
        description="Convert PDF pages to JPG images"
        icon="📸"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Instructions */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Convert PDF to JPG</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Select a PDF file</li>
            <li>Each page will be converted to a JPG image</li>
            <li>Download individual images or all at once</li>
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
              <h3 className="text-2xl font-semibold mb-2 text-green-900">Conversion Successful!</h3>
              <p className="text-gray-600 mb-4">{result.length} image(s) created</p>
              <button onClick={handleDownloadAll} className="btn-primary">
                Download All Images
              </button>
            </div>

            <div className="border-t pt-6 mt-6">
              <h4 className="font-semibold mb-4">Download Individual Images:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {result.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleDownloadSingle(image, index)}
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
