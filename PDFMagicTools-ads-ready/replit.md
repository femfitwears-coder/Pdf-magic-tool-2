# PDF Tools - Free Online PDF Editor

## Overview

PDF Tools is a client-side web application that provides 6 essential PDF manipulation tools: merge, split, rotate, compress, JPG-to-PDF, and PDF-to-JPG conversion. Built with Next.js 14 (Pages Router), the application emphasizes privacy and security by processing all files directly in the user's browser without server uploads. The project is designed for easy deployment on platforms like Replit and includes SEO optimization and AdSense integration for monetization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Choice: Next.js 14 with Pages Router**
- **Rationale**: Pages Router provides a straightforward file-based routing system that maps directly to URL structure, making it easy to create individual tool pages
- **Component Structure**: 
  - Reusable UI components (`ToolCard`, `ToolHeader`, `ToolControls`, `Layout`) follow a composition pattern
  - Each PDF tool has its own dedicated page component for clear separation of concerns
  - Layout component wraps all pages to provide consistent header/navigation and SEO metadata

**Styling: TailwindCSS**
- **Rationale**: Utility-first approach enables rapid UI development with consistent design tokens
- **Customization**: Extended color palette with primary blue theme (`primary-50` through `primary-900`)
- **Component Classes**: Custom classes defined in `globals.css` for buttons (`.btn-primary`, `.btn-secondary`) and cards (`.card`)

**State Management**
- **Approach**: Local component state using React hooks (`useState`)
- **Rationale**: Application doesn't require global state since each tool operates independently and file processing is ephemeral
- **Pattern**: Each tool page manages its own processing state, selected files, and results

### Client-Side PDF Processing

**Core Libraries**
1. **pdf-lib**: Primary library for PDF manipulation (merge, split, rotate, compress)
   - Chosen for comprehensive PDF creation and modification capabilities
   - Supports both reading and writing PDF documents
   
2. **pdfjs-dist**: Mozilla's PDF.js for rendering and extraction
   - Used specifically for PDF-to-JPG conversion (rendering pages to canvas)
   - Lazy-loaded to avoid SSR issues (`typeof window !== 'undefined'` check)
   - Worker configured via CDN: `cdnjs.cloudflare.com/ajax/libs/pdf.js/[version]/pdf.worker.min.js`

3. **canvas**: Node canvas library for image processing
   - Required for image-to-PDF conversion
   - Webpack configuration aliases canvas to `false` to prevent server-side issues

**Processing Architecture**
- **Privacy-First Design**: All operations happen in-browser via JavaScript, files never transmitted to servers
- **Utility Functions** (`lib/pdfUtils.ts`): Centralized functions for each PDF operation
  - `mergePdfs()`: Combines multiple PDFs by copying pages into new document
  - `splitPdf()`: Extracts each page into separate PDF files
  - `rotatePdf()`: Applies rotation transformation to all pages
  - `compressPdf()`: Reduces file size (implementation details in util file)
  - `imagesToPdf()`: Converts image files to PDF pages
  - `pdfToImages()`: Renders PDF pages to JPG via canvas
  - `downloadFile()`: Triggers browser download for processed files

### SEO and Metadata Strategy

**Per-Page Optimization**
- Each tool page defines custom title and description via Layout component props
- Consistent title format: `[Tool Name] | PDF Tools - Free Online PDF Editor`
- Canonical URLs generated from `NEXT_PUBLIC_SITE_URL` environment variable

**Meta Tags Implementation** (in `Layout.tsx`)
- Standard meta tags: title, description, keywords
- Open Graph protocol for social sharing
- Twitter Card metadata
- Favicon reference

**XML Sitemap**
- Dynamic generation via `pages/sitemap.xml.tsx` using Next.js server-side rendering
- Includes all tool pages plus homepage and privacy policy
- Priority weighting: homepage (1.0), tools (0.8)
- Weekly change frequency for search engine crawlers

**Robots.txt**
- Located in `public/robots.txt`
- Allows all crawlers with sitemap reference

### Monetization Integration

**Google AdSense Component** (`components/AdSense.tsx`)
- Reusable component for placing ads throughout the site
- Configuration via environment variable: `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- Graceful fallback: Shows placeholder with setup instructions if AdSense ID not configured
- Script tag placeholder in `_document.tsx` for global AdSense initialization

### Build Configuration

**Next.js Config** (`next.config.js`)
- **React Strict Mode**: Enabled for development best practices
- **Webpack Customization**: 
  - Aliases `canvas` and `encoding` to false to prevent SSR bundle issues
  - Necessary because canvas is a Node.js native module incompatible with browser bundle
- **CORS Headers**: Configured for all routes to allow cross-origin requests
  - Supports future API endpoints or external integrations

**TypeScript Configuration**
- Strict mode enabled for type safety
- Path alias `@/*` maps to project root for clean imports
- Module resolution: "bundler" for optimal Next.js compatibility

**Development Server**
- Custom port 5000 (configured in `package.json` scripts)
- Allows running alongside other development servers without port conflicts

## External Dependencies

### Third-Party Libraries

**PDF Processing**
- `pdf-lib` (v1.17.1): Core PDF manipulation library, MIT licensed
- `pdfjs-dist` (v3.11.174): Mozilla's PDF rendering engine
  - External CDN worker: `cdnjs.cloudflare.com` for web worker scripts
- `canvas` (v2.11.2): Node canvas implementation for image operations

**Framework & UI**
- `next` (v14.2.0): React framework with SSR and routing
- `react` (v18.3.0) & `react-dom` (v18.3.0): UI library
- `tailwindcss` (v3.4.0): Utility-first CSS framework
- `autoprefixer` & `postcss`: CSS processing pipeline

**TypeScript Tooling**
- `typescript` (v5): Type checking and compilation
- Type definitions: `@types/node`, `@types/react`, `@types/react-dom`

### External Services

**Content Delivery**
- **Google Fonts CDN**: Inter font family for typography
  - Preconnect configured in `_document.tsx` for performance
  - Loading strategy: `display=swap` for better perceived performance

**PDF.js Worker**
- **CloudFlare CDN**: Delivers pdf.worker.min.js
- Version-matched with pdfjs-dist package
- Required for multi-threaded PDF processing in browser

**Google AdSense** (Optional)
- Advertisement platform for monetization
- Requires publisher account and client ID configuration
- Currently placeholder implementation awaiting credentials

### Environment Variables

**Required for Production**
- `NEXT_PUBLIC_SITE_URL`: Base URL for canonical links and sitemap generation
  - Example: `https://yourdomain.com`
  - Used for SEO metadata and sitemap URLs

**Optional/Monetization**
- `NEXT_PUBLIC_ADSENSE_CLIENT_ID`: Google AdSense publisher ID
  - Format: `ca-pub-XXXXXXXXXXXXXXXX`
  - Enables ad display when configured

**Configuration Pattern**
- Public variables prefixed with `NEXT_PUBLIC_` for client-side access
- `.env.example` template provided (referenced in README but not in repo contents)
- `.env.local` for local development (gitignored)