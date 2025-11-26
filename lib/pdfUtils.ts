import { PDFDocument, rgb, degrees } from 'pdf-lib'

// Lazy import pdfjs-dist to avoid SSR issues
let pdfjsLib: any = null
if (typeof window !== 'undefined') {
  import('pdfjs-dist').then((pdfjs) => {
    pdfjsLib = pdfjs
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
  })
}

export async function mergePdfs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create()

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    copiedPages.forEach((page) => mergedPdf.addPage(page))
  }

  return await mergedPdf.save()
}

export async function splitPdf(file: File): Promise<Uint8Array[]> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const pageCount = pdf.getPageCount()
  const splitPdfs: Uint8Array[] = []

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create()
    const [copiedPage] = await newPdf.copyPages(pdf, [i])
    newPdf.addPage(copiedPage)
    const pdfBytes = await newPdf.save()
    splitPdfs.push(pdfBytes)
  }

  return splitPdfs
}

export async function rotatePdf(file: File, rotation: 90 | 180 | 270): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const pages = pdf.getPages()

  pages.forEach((page) => {
    const currentRotation = page.getRotation().angle
    page.setRotation(degrees(currentRotation + rotation))
  })

  return await pdf.save()
}

export async function imagesToPdf(imageFiles: File[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()

  for (const imageFile of imageFiles) {
    const arrayBuffer = await imageFile.arrayBuffer()
    const imageBytes = new Uint8Array(arrayBuffer)
    
    let image
    const fileType = imageFile.type.toLowerCase()
    
    if (fileType === 'image/jpeg' || fileType === 'image/jpg') {
      image = await pdfDoc.embedJpg(imageBytes)
    } else if (fileType === 'image/png') {
      image = await pdfDoc.embedPng(imageBytes)
    } else {
      throw new Error(`Unsupported image type: ${fileType}`)
    }

    const page = pdfDoc.addPage([image.width, image.height])
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    })
  }

  return await pdfDoc.save()
}

export async function pdfToImages(file: File): Promise<Blob[]> {
  if (typeof window === 'undefined') {
    throw new Error('pdfToImages can only be used in the browser')
  }

  // Ensure pdfjs is loaded
  if (!pdfjsLib) {
    const pdfjs = await import('pdfjs-dist')
    pdfjsLib = pdfjs
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
  }

  const arrayBuffer = await file.arrayBuffer()
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
  const pdf = await loadingTask.promise
  const images: Blob[] = []

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum)
    const viewport = page.getViewport({ scale: 2.0 })
    
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not get canvas context')
    
    canvas.width = viewport.width
    canvas.height = viewport.height

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to create blob'))
      }, 'image/jpeg', 0.95)
    })

    images.push(blob)
  }

  return images
}

export async function compressPdf(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)

  // Remove metadata to reduce size
  pdf.setTitle('')
  pdf.setAuthor('')
  pdf.setSubject('')
  pdf.setKeywords([])
  pdf.setProducer('')
  pdf.setCreator('')

  // Save with compression options
  const pdfBytes = await pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  })

  return pdfBytes
}

export function downloadFile(data: Uint8Array | Blob, filename: string) {
  if (typeof window === 'undefined') {
    throw new Error('downloadFile can only be used in the browser')
  }
  
  const blob = data instanceof Blob ? data : new Blob([data as BlobPart], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
