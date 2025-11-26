import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export default function Layout({ children, title, description }: LayoutProps) {
  const router = useRouter()
  const siteTitle = 'PDF Tools - Free Online PDF Editor'
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const siteDescription = description || 'Free online PDF tools. Merge, split, rotate, compress PDFs and convert between PDF and JPG. All processing happens in your browser - 100% secure and private.'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const canonicalUrl = siteUrl ? `${siteUrl}${router.asPath}` : undefined

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="PDF tools, merge PDF, split PDF, compress PDF, PDF to JPG, JPG to PDF, rotate PDF, online PDF editor" />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        <meta property="og:site_name" content="PDF Tools" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={siteDescription} />
        
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
                PDF Tools
              </Link>
              <div className="flex items-center gap-6">
                <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Home
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-primary-600 transition-colors">
                  Privacy
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">PDF Tools</h3>
                <p className="text-sm">
                  Free online PDF tools. All processing happens in your browser for maximum privacy and security.
                </p>
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Tools</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/merge-pdf" className="hover:text-white transition-colors">Merge PDF</Link></li>
                  <li><Link href="/split-pdf" className="hover:text-white transition-colors">Split PDF</Link></li>
                  <li><Link href="/rotate-pdf" className="hover:text-white transition-colors">Rotate PDF</Link></li>
                  <li><Link href="/jpg-to-pdf" className="hover:text-white transition-colors">JPG to PDF</Link></li>
                  <li><Link href="/pdf-to-jpg" className="hover:text-white transition-colors">PDF to JPG</Link></li>
                  <li><Link href="/compress-pdf" className="hover:text-white transition-colors">Compress PDF</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
              <p>&copy; {new Date().getFullYear()} PDF Tools. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
