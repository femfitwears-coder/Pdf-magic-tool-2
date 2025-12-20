import { useState } from 'react'
import Layout from '@/components/Layout'
import ToolHeader from '@/components/ToolHeader'
import ToolControls from '@/components/ToolControls'
import { compressPdf, downloadFile } from '@/lib/pdfUtils'
import AdBox from '../components/AdBox';

export default function CompressPDF() {
  const [processing, setProcessing] = useState(false)
  const [originalSize, setOriginalSize] = useState<number>(0)
  const [compressedSize, setCompressedSize] = useState<number>(0)
  const [result, setResult] = useState<Uint8Array | null>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
  }

  const handleFilesSelected = async (fileList: FileList) => {
    const file = fileList[0]
    setOriginalSize(file.size)
    setProcessing(true)
    setResult(null)

    try {
      const compressedPdf = await compressPdf(file)
      setCompressedSize(compressedPdf.length)
      setResult(compressedPdf)
    } catch (error) {
      console.error('Error compressing PDF:', error)
      alert('Error compressing PDF. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  const handleDownload = () => {
    if (result) {
      downloadFile(result, 'compressed.pdf')
    }
  }

  const compressionPercentage = originalSize > 0 
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0

  return (
    <Layout 
      title="Compress PDF" 
      description="Reduce PDF file size by removing metadata and optimizing the document structure."
    >
      <ToolHeader
        title="Compress PDF"
        description="Reduce PDF file size"
        icon="🗜️"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Instructions */}
        <div className="card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Compress PDF</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Select a PDF file to compress</li>
            <li>The tool will optimize and reduce file size</li>
            <li>Download the compressed PDF file</li>
          </ol>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-900">
              <strong>Note:</strong> This tool removes metadata and optimizes the PDF structure. 
              Compression results vary depending on the original file.
            </p>
          </div>
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
          <div className="card p-8 text-center bg-green-50 border-green-200">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-2xl font-semibold mb-4 text-green-900">PDF Compressed Successfully!</h3>
            
            <div className="grid grid-cols-3 gap-4 mb-6 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Original Size</p>
                <p className="text-lg font-semibold">{formatFileSize(originalSize)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Compressed Size</p>
                <p className="text-lg font-semibold">{formatFileSize(compressedSize)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Reduction</p>
                <p className="text-lg font-semibold text-green-600">{compressionPercentage}%</p>
              </div>
            </div>

           <button
  onClick={() => {
    window.open("https://otieu.com/4/10353085", "_blank");
    handleDownload();
  }}
  className="btn-primary"
>
  Download Compressed PDF
</button>

          </div>
        )}
      </div>
    </Layout>
  )
}

<AdBox />
