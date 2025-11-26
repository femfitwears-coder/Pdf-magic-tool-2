import React, { useEffect } from 'react'

interface AdSenseProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = { display: 'block' }
}: AdSenseProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (err) {
      console.error('AdSense error:', err)
    }
  }, [])

  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  if (!adClient) {
    return (
      <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <p className="text-gray-500 text-sm">
          AdSense: Set NEXT_PUBLIC_ADSENSE_CLIENT_ID in .env.local
        </p>
      </div>
    )
  }

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    ></ins>
  )
}
