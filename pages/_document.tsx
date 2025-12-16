// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * Tell TypeScript about window.dataLayer so we don't get "cannot find name"
 */
declare global {
  interface Window {
    dataLayer: any[];
  }
}

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Google AdSense verification script */}
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6803904743046507`}
            crossOrigin="anonymous"
          />

          {/* Google Analytics (GA4) - gtag.js */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-XK1QFH1Q24`}
          />
          <script
            // dangerouslySetInnerHTML must receive a string so JSX/TSX doesn't try to parse it
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XK1QFH1Q24');
              `,
            }}
          />

          {/* Optional fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
