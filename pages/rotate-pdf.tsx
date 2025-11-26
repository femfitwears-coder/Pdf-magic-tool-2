import { useState } from 'react'
import Layout from '@/components/Layout'
import ToolHeader from '@/components/ToolHeader'
import { rotatePdf, downloadFile } from '@/lib/pdfUtils'

export default function RotatePDF() {
  const [processing, setProcessing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [rotation, setRotation] = useState<90 | 180 | 270>(90)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleRotate = async () => {
    if (!selectedFile) return

    setProcessing(true)
    try {
      const rotatedPdf = await rotatePdf(selectedFile, rotation)
      downloadFile(rotatedPdf, `rotated-${rotation}.pdf`)
    } catch (error) {
      console.error('Error rotating PDF:', error)
      alert('Error rotating PDF. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Layout 
      title="Rotate PDF" 
      description="Rotate all pages in your PDF document by 90, 180, or 270 degrees. Free and secure."
    >
      <ToolHeader
        title="Rotate PDF"
        description="Rotate all pages in your PDF document"
        icon="🔄"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Instructions */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Rotate PDF</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Select a PDF file</li>
            <li>Choose rotation angle (90°, 180°, or 270°)</li>
            <li>Click rotate and download the result</li>
          </ol>
        </div>

        {/* Upload Area */}
        <div className="card p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select PDF File
              </label>
              <input
                type="file"
                onChange={handleFileSelect}
                accept="application/pdf"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">Selected: {selectedFile.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rotation Angle
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rotation"
                    value="90"
                    checked={rotation === 90}
                    onChange={() => setRotation(90)}
                    className="mr-2"
                  />
                  90° Clockwise
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rotation"
                    value="180"
                    checked={rotation === 180}
                    onChange={() => setRotation(180)}
                    className="mr-2"
                  />
                  180°
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rotation"
                    value="270"
                    checked={rotation === 270}
                    onChange={() => setRotation(270)}
                    className="mr-2"
                  />
                  270° Clockwise
                </label>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleRotate}
                disabled={!selectedFile || processing}
                className="btn-primary"
              >
                {processing ? 'Processing...' : 'Rotate PDF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
