import Layout from '@/components/Layout'
import ToolCard from '@/components/ToolCard'
import AdSense from '@/components/AdSense'
import AdBox from '../components/AdBox';

export default function Home() {
  const tools = [
    {
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one document',
      icon: '📄',
      href: '/merge-pdf'
    },
    {
      title: 'Split PDF',
      description: 'Split a PDF into separate pages',
      icon: '✂️',
      href: '/split-pdf'
    },
    {
      title: 'Rotate PDF',
      description: 'Rotate all pages in your PDF document',
      icon: '🔄',
      href: '/rotate-pdf'
    },
    {
      title: 'JPG to PDF',
      description: 'Convert JPG images to a PDF document',
      icon: '🖼️',
      href: '/jpg-to-pdf'
    },
    {
      title: 'PDF to JPG',
      description: 'Extract pages from PDF as JPG images',
      icon: '📸',
      href: '/pdf-to-jpg'
    },
    {
      title: 'Compress PDF',
      description: 'Reduce PDF file size',
      icon: '🗜️',
      href: '/compress-pdf'
    }
  ]

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Free Online PDF Tools
          </h1>
  <AdBox />

          <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
            Edit, convert, and manage your PDF files directly in your browser. 
            100% free, secure, and private - no file uploads required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tools" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
              Browse Tools
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
              <p className="text-gray-600">All processing happens in your browser. Your files never leave your device.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">No uploads or downloads to servers. Process files instantly.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-2">Completely Free</h3>
              <p className="text-gray-600">No limits, no sign-ups, no hidden fees. Use all tools for free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Tool
            </h2>
            <p className="text-xl text-gray-600">
              All tools work directly in your browser for maximum privacy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <ToolCard
                key={tool.href}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                href={tool.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Ad Unit */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-4 text-center">
            <AdSense adSlot="1234567890" />
          </div>
        </div>
      </section>
    </Layout>
  )
}

<AdBox />
