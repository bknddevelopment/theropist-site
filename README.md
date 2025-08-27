# Sonoma Wellness Retreat & Therapy - SEO & Performance Optimized Site

A production-ready, SEO-optimized wellness therapy website built with Next.js 14, featuring comprehensive performance optimizations, local SEO for Sonoma County, and WCAG AA accessibility compliance.

## 🚀 Performance Features

### SEO Optimizations
- ✅ **Meta Tags & OpenGraph**: Comprehensive meta tags for all pages
- ✅ **Structured Data**: Schema.org markup for LocalBusiness, MedicalBusiness, and Organization
- ✅ **Local SEO**: Optimized for Sonoma County with geo-targeting
- ✅ **XML Sitemap**: Auto-generated with next-sitemap
- ✅ **Robots.txt**: Properly configured for search engines
- ✅ **Canonical URLs**: Prevent duplicate content issues

### Performance Optimizations
- ✅ **Image Optimization**: Next/Image with AVIF/WebP formats
- ✅ **Lazy Loading**: Components and images load on-demand
- ✅ **Code Splitting**: Automatic route-based code splitting
- ✅ **Font Optimization**: Variable fonts with font-display: swap
- ✅ **CSS Optimization**: PostCSS with cssnano for minification
- ✅ **Bundle Optimization**: Webpack configuration for optimal chunking

### Analytics & Tracking
- ✅ **Google Analytics 4**: Full implementation with event tracking
- ✅ **Conversion Tracking**: Custom events for bookings and form submissions
- ✅ **Web Vitals**: Core Web Vitals monitoring
- ✅ **Performance Monitoring**: Custom performance metrics tracking
- ✅ **Scroll & Engagement**: Depth and time-on-page tracking

### Accessibility (WCAG AA)
- ✅ **Semantic HTML**: Proper heading hierarchy and ARIA labels
- ✅ **Keyboard Navigation**: Full keyboard support with focus management
- ✅ **Screen Reader Support**: Optimized for assistive technologies
- ✅ **Color Contrast**: All text meets WCAG AA standards (4.5:1 minimum)
- ✅ **Skip Links**: Quick navigation for keyboard users
- ✅ **Focus Indicators**: Clear, visible focus states

## 📊 Lighthouse Scores Target

```
Performance: 95+
Accessibility: 100
Best Practices: 100
SEO: 100
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS with custom design system
- **Fonts**: Inter (body), Playfair Display (headings), DM Sans (UI)
- **Analytics**: Google Analytics 4, Google Tag Manager
- **SEO**: next-seo, next-sitemap
- **Performance**: Sharp for images, Web Vitals monitoring
- **Accessibility**: focus-visible, ARIA compliance

## 📦 Installation

```bash
# Clone the repository
git clone [repository-url]

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```env
NEXT_PUBLIC_SITE_URL=https://sonomawellnessretreat.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

### Google Analytics Setup

1. Create a GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (G-XXXXXXXXXX)
3. Add it to `.env.local`
4. Set up conversion events for:
   - Form submissions
   - Phone calls
   - Booking requests
   - Download actions

### Google Search Console

1. Verify ownership with the verification meta tag
2. Submit sitemap: `https://yourdomain.com/sitemap.xml`
3. Monitor Core Web Vitals in the Experience report

## 📈 Performance Optimization Tips

### Images
- Use WebP/AVIF formats with fallbacks
- Implement responsive images with srcset
- Add blur placeholders for above-the-fold images
- Lazy load below-the-fold images

### Fonts
- Use variable fonts to reduce file size
- Preload critical fonts
- Implement font-display: swap
- Subset fonts to required characters

### JavaScript
- Minimize third-party scripts
- Load non-critical JS asynchronously
- Use dynamic imports for heavy components
- Implement tree-shaking

### CSS
- Purge unused CSS with Tailwind
- Minimize with cssnano
- Inline critical CSS
- Defer non-critical styles

## 🎯 Lighthouse Optimization Checklist

### Performance
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Total Blocking Time < 200ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] Speed Index < 3.4s

### SEO
- [ ] All pages have meta descriptions
- [ ] Proper heading hierarchy (h1 → h6)
- [ ] All images have alt text
- [ ] Canonical URLs configured
- [ ] Structured data validates

### Accessibility
- [ ] Color contrast ratios meet standards
- [ ] All interactive elements are keyboard accessible
- [ ] ARIA labels for all buttons and links
- [ ] Form labels properly associated
- [ ] Focus order is logical

### Best Practices
- [ ] HTTPS enabled
- [ ] No console errors
- [ ] Images properly sized
- [ ] Secure headers configured
- [ ] No deprecated APIs

## 📱 PWA Features

The site includes PWA capabilities:
- Manifest.json for installability
- Service worker ready (can be added)
- Offline fallback pages
- App-like experience

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Build for Production
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Generate Sitemap
```bash
# Sitemap is auto-generated after build
npm run build
# Check public/sitemap.xml
```

## 📊 Monitoring

### Performance Monitoring
- Vercel Analytics (built-in)
- Google Analytics 4 Real-time
- Core Web Vitals in Search Console
- Custom performance metrics in GA4

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Hotjar for heatmaps

## 🔍 Local SEO Checklist

- [x] Google Business Profile setup
- [x] Local schema markup
- [x] NAP (Name, Address, Phone) consistency
- [x] Local keywords in content
- [x] Service area pages
- [x] Customer reviews integration
- [x] Local backlinks strategy

## 📝 Content Guidelines

### SEO-Friendly Content
- Target long-tail keywords
- Include location-based keywords
- Write comprehensive, valuable content
- Use heading hierarchy properly
- Include internal linking
- Optimize meta descriptions

### Image Optimization
- Descriptive file names
- Comprehensive alt text
- Appropriate dimensions
- WebP format with fallbacks
- Lazy loading implementation

## 🛡️ Security Headers

Configured in `next.config.js`:
- X-DNS-Prefetch-Control
- X-XSS-Protection
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Web.dev Performance Guide](https://web.dev/performance)
- [Google Search Central](https://developers.google.com/search)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Schema.org Reference](https://schema.org/)

## 🤝 Support

For issues or questions:
- Email: support@sonomawellnessretreat.com
- Documentation: [/docs](./docs)

## 📄 License

Copyright 2024 Sonoma Wellness Retreat & Therapy. All rights reserved.