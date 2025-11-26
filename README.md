# PDF Tools - Free Online PDF Editor

A modern, client-side PDF tools website built with Next.js and TailwindCSS. All PDF processing happens directly in your browser for maximum privacy and security.

## 🚀 Features

### 6 Powerful PDF Tools

1. **Merge PDF** - Combine multiple PDF files into one document
2. **Split PDF** - Separate a PDF into individual pages
3. **Rotate PDF** - Rotate all pages by 90°, 180°, or 270°
4. **JPG to PDF** - Convert JPG/PNG images to PDF
5. **PDF to JPG** - Extract PDF pages as JPG images
6. **Compress PDF** - Reduce PDF file size

### Key Benefits

- ✅ **100% Client-Side** - Files never leave your device
- ✅ **Fast Processing** - No uploads, instant results
- ✅ **Completely Free** - No limits, no sign-ups
- ✅ **Privacy First** - No data collection of your files
- ✅ **SEO Optimized** - Meta tags, sitemap, robots.txt
- ✅ **AdSense Ready** - Easy integration for monetization

## 📦 Tech Stack

- **Next.js 14** (Pages Router)
- **React 18**
- **TypeScript**
- **TailwindCSS** - Modern, responsive UI
- **pdf-lib** - PDF manipulation
- **pdfjs-dist** - PDF rendering and extraction
- **Canvas** - Image processing

## 🛠️ Setup on Replit

### Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables** (Optional for development)
   - Copy `.env.example` to `.env.local`
   - Update with your values (optional for local testing)
   ```bash
   cp .env.example .env.local
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - The app will run on `http://localhost:5000`
   - In Replit, click the "Webview" button to see your site

### Important Configuration

The project is pre-configured to work on Replit:
- Development server runs on port 5000
- All processing is client-side (no backend needed)
- Uses Next.js Pages Router for compatibility

## 💰 Adding Google AdSense

### Step 1: Get Your AdSense Publisher ID

1. Sign up for Google AdSense at https://www.google.com/adsense
2. Get your publisher client ID (format: `ca-pub-XXXXXXXXXXXXXXXX`)

### Step 2: Configure Environment Variables

Add your AdSense client ID to your environment:

**For Local Development:**
```bash
# In .env.local file
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
```

**For Production (Vercel/Replit):**
- Add environment variable in your deployment platform settings
- Key: `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- Value: Your AdSense client ID (e.g., `ca-pub-1234567890123456`)

### Step 3: Update _document.tsx (Optional)

For additional AdSense features, you can uncomment the script in `pages/_document.tsx`:

```tsx
<script
  async
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
  crossOrigin="anonymous"
></script>
```

### Step 4: Customize Ad Slots

The project includes a reusable `AdSense` component with ad units on:
- Homepage (below tools grid)
- Tool pages (below content)

To customize ad slots, update the `adSlot` prop:

```tsx
import AdSense from '@/components/AdSense'

<AdSense adSlot="YOUR_AD_SLOT_ID" />
```

The component automatically reads `NEXT_PUBLIC_ADSENSE_CLIENT_ID` from environment variables.

## 🌐 Deploy to Vercel

### Prerequisites

- GitHub account
- Vercel account (free at https://vercel.com)

### Deployment Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Add Environment Variables:
     - `NEXT_PUBLIC_SITE_URL`: Your deployment URL (e.g., `https://pdf-tools.vercel.app`)
     - `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: Your AdSense client ID (optional)
   - Click "Deploy"

3. **Post-Deployment**
   - No additional configuration needed!
   - Sitemap and canonical URLs automatically use `NEXT_PUBLIC_SITE_URL`
   - Update `public/robots.txt` sitemap URL if needed (or make it dynamic)

### Environment Variables

**Optional for Development:**
- `NEXT_PUBLIC_SITE_URL` - Your site's URL (for canonical tags and sitemap)
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID` - Your Google AdSense client ID

**Required for Production:**
- `NEXT_PUBLIC_SITE_URL` - Set this to your production domain for proper SEO

## 📁 Project Structure

```
├── components/          # React components
│   ├── Layout.tsx      # Main layout with header/footer
│   ├── ToolCard.tsx    # Tool card for homepage grid
│   ├── ToolHeader.tsx  # Header for tool pages
│   └── ToolControls.tsx # File upload controls
├── lib/
│   └── pdfUtils.ts     # PDF processing utilities
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   ├── _document.tsx  # HTML document (AdSense here)
│   ├── index.tsx      # Homepage
│   ├── merge-pdf.tsx  # Merge tool
│   ├── split-pdf.tsx  # Split tool
│   ├── rotate-pdf.tsx # Rotate tool
│   ├── jpg-to-pdf.tsx # JPG to PDF tool
│   ├── pdf-to-jpg.tsx # PDF to JPG tool
│   ├── compress-pdf.tsx # Compress tool
│   ├── privacy.tsx    # Privacy policy
│   └── sitemap.xml.tsx # Dynamic sitemap
├── public/
│   └── robots.txt     # Search engine instructions
├── styles/
│   └── globals.css    # Global styles
├── next.config.js     # Next.js configuration
├── tailwind.config.js # TailwindCSS configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js` to customize the color scheme:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors here
      },
    },
  },
}
```

### Add More Tools

1. Create a new page in `pages/` (e.g., `pages/new-tool.tsx`)
2. Add the utility function in `lib/pdfUtils.ts`
3. Add the tool card to homepage `pages/index.tsx`
4. Update sitemap in `pages/sitemap.xml.tsx`

## 📝 SEO Configuration

Each page includes:
- Title tag
- Meta description
- Open Graph tags (Facebook)
- Twitter Card tags
- Canonical URL

Update the base URL in:
- `pages/sitemap.xml.tsx`
- `public/robots.txt`

## 🔒 Privacy & Security

- All file processing happens in the browser
- No files are uploaded to servers
- No file content is stored or transmitted
- Privacy policy included at `/privacy`

## 📄 License

This project is provided as-is for educational and commercial use.

## 🤝 Support

For issues or questions:
- Check the documentation above
- Review the code comments
- Test tools in browser console for debugging

## 🎯 Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

Note: Older browsers may not support all features.

---

Built with ❤️ using Next.js and TailwindCSS
