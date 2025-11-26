import Layout from '@/components/Layout'

export default function Privacy() {
  return (
    <Layout 
      title="Privacy Policy" 
      description="Privacy policy for PDF Tools - Learn how we protect your data and files."
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">Last updated: November 26, 2025</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Privacy is Our Priority</h2>
            <p className="text-gray-700 mb-4">
              At PDF Tools, we take your privacy seriously. This privacy policy explains how we handle your data 
              when you use our online PDF tools.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Processing</h2>
            <p className="text-gray-700 mb-4">
              All PDF processing happens directly in your web browser using client-side JavaScript. Your files are:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Never uploaded</strong> to our servers or any third-party servers</li>
              <li><strong>Never stored</strong> anywhere except temporarily in your browser's memory</li>
              <li><strong>Never transmitted</strong> over the internet during processing</li>
              <li><strong>Completely under your control</strong> - they never leave your device</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We may collect the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Analytics Data:</strong> We may use analytics services (like Google Analytics) to understand 
              how visitors use our website. This includes information like page views, browser type, and general location.</li>
              <li><strong>Cookies:</strong> We may use cookies for analytics and advertising purposes.</li>
            </ul>
            <p className="text-gray-700 mb-4">
              <strong>Important:</strong> We do NOT collect, store, or have access to any of your PDF files or the 
              content within them.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              We may use third-party services for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li><strong>Google AdSense:</strong> To display advertisements on our website</li>
              <li><strong>Analytics Services:</strong> To understand website usage and improve our services</li>
            </ul>
            <p className="text-gray-700 mb-4">
              These services may use cookies and collect data according to their own privacy policies. However, 
              they do not have access to your PDF files or their content.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Analytics and understanding user behavior</li>
              <li>Advertising and showing relevant ads</li>
            </ul>
            <p className="text-gray-700 mb-4">
              You can control cookie settings in your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Information</h2>
            <p className="text-gray-700 mb-4">
              The limited information we collect is used to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
              <li>Improve our website and services</li>
              <li>Understand how users interact with our tools</li>
              <li>Display relevant advertisements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              Since all file processing happens in your browser and files never leave your device, 
              your PDF files are as secure as your own computer. We have no access to your files and 
              cannot be responsible for their security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our services are not directed to children under 13. We do not knowingly collect information 
              from children under 13.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy from time to time. Changes will be posted on this page 
              with an updated revision date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this privacy policy, please contact us through our website.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  )
}
