// pages/_app.tsx
import type { AppProps } from "next/app";
import Script from "next/script";
import "@/styles/globals.css"; // if you have a global css file

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Load AdSense after the page is interactive — safe and SSR-friendly */}
      <Script
        id="adsense-js"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6803904743046507"
        crossOrigin="anonymous"
      />
      <Component {...pageProps} />
    </>
  );
}
