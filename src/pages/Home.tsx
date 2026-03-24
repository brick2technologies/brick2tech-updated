import { Helmet, HelmetProvider } from 'react-helmet-async';
import About from "../components/home/AboutSection";
import Hero from "../components/home/HeroSection";
import ServicesSection from "../components/home/service/ServicesSection";
import WorkSection from "../components/home/WorkSection";
import ContactSection from "../components/home/ContactSection";

interface HomeProps {
  onContactClick: () => void;
}

// 1. Moved outside the component to prevent recreation on re-renders
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Brick2Tech",
  "description": "Brick2Tech is Hyderabad's premier digital marketing and web development agency. Specializing in high-converting websites and data-driven marketing for Real Estate, Healthcare, and E-commerce brands.",
  "url": "https://brick2tech.com",
  "logo": "https://brick2tech.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "MIG-6, Sunrise Residency 202, Manikonda",
    "addressLocality": "Hyderabad",
    "addressRegion": "Telangana",
    "postalCode": "500089",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.4173",
    "longitude": "78.3847"
  },
  "serviceType": [
    "Digital Marketing",
    "Web Development",
    "Real Estate Marketing",
    "Healthcare Digital Marketing",
    "SEO",
    "Branding",
    "E-commerce Development"
  ]
};

export default function Home({ onContactClick }: HomeProps) {
  return (
    <HelmetProvider>
      <Helmet>
        {/* --- PRIMARY META TAGS --- */}
        <title>Brick2Tech | Digital Marketing & Web Development Agency Hyderabad</title>
        <meta name="description" content="Dominate the digital landscape with Brick2Tech. We offer expert web development, SEO, and social media marketing for Real Estate and Healthcare in Hyderabad." />
        <meta name="keywords" content="Digital Marketing Hyderabad, Web Development Manikonda, SEO Agency Hyderabad, Real Estate Marketing, Healthcare Marketing, Brick2Tech" />
        
        {/* Author & Publisher */}
        <meta name="author" content="Brick2Tech" />
        <meta name="publisher" content="Brick2Tech Digital Agency" />
        
        {/* Robots Tag */}
        <meta name="robots" content="index, follow" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="https://brick2tech.com" />

        {/* --- OPEN GRAPH / FACEBOOK --- */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brick2tech.com" />
        <meta property="og:title" content="Brick2Tech | Constructing Digital Excellence for Your Brand" />
        <meta property="og:description" content="From high-performance web apps to revenue-driving ad campaigns, we engineer the digital foundation your business needs to scale." />
        <meta property="og:image" content="https://brick2tech.com/og-image.jpg" />

        {/* --- TWITTER --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Brick2Tech | High-Performance Digital Solutions" />
        <meta name="twitter:description" content="We transform your social presence into a revenue machine. Specialist agency for Real Estate and Healthcare digital growth." />

        {/* --- JSON-LD STRUCTURED DATA (Fixed with dangerouslySetInnerHTML) --- */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Helmet>

      {/* Accessibility: Skip Link */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:p-4 focus:text-[#142c4c] font-bold">
        Skip to main content
      </a>

      <main id="main-content">
        <Hero onContactClick={onContactClick} />
        <ServicesSection />
        <WorkSection onContactClick={onContactClick} />
        <About />
        <ContactSection />
      </main>
    </HelmetProvider>
  );
}