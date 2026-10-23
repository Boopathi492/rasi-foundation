import Head from 'next/head';
import { useRouter } from 'next/router';

const SEO = ({
  title = 'RASI FOUNDATION',
  description = 'Empowering minds! Igniting future! - Career Guidance & Education Consultancy in Tamil Nadu. Expert guidance for MBBS, Engineering, MBA, Law admissions.',
  keywords = '',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  noIndex = false,
  structuredData = null,
}) => {
  const router = useRouter();
  const siteUrl = 'https://rasifoundation.com'; // Update with your actual domain
  const canonicalUrl = `${siteUrl}${router.asPath.split('?')[0]}`;

  const fullTitle = title === 'Home'
    ? 'RASI FOUNDATION - Career Guidance & Education Consultancy'
    : `${title} | RASI FOUNDATION`;

  const defaultKeywords = 'career guidance, education consultancy, college admission, MBBS admission, engineering admission, MBA admission, law admission, NEET counseling, career counselor, Rasipuram, Tamil Nadu, Namakkal, India, medical college admission, engineering college admission';
  const allKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;

  // Organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'RASI FOUNDATION',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'Career Guidance & Education Consultancy helping students achieve their educational dreams',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rasipuram',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9789446100',
      contactType: 'customer service',
      availableLanguage: ['English', 'Tamil']
    },
    sameAs: [
      'https://www.facebook.com/rasifoundation',
      'https://www.instagram.com/rasifoundation',
      'https://www.youtube.com/@rasifoundation'
    ],
    foundingDate: '2008',
    founder: {
      '@type': 'Person',
      name: 'Prof. P. Gunasekaran'
    }
  };

  // Breadcrumb schema for inner pages
  const getBreadcrumbSchema = () => {
    const pathSegments = router.asPath.split('/').filter(Boolean);
    if (pathSegments.length === 0) return null;

    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl
      }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: index + 2,
        name: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        item: `${siteUrl}${currentPath}`
      });
    });

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    };
  };

  const breadcrumbSchema = getBreadcrumbSchema();

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Rasi Foundation" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />

      {/* Additional Meta */}
      <meta name="author" content="Rasi Foundation" />
      <meta name="publisher" content="Rasi Foundation" />
      <meta name="theme-color" content="#dc2626" />
      <meta name="msapplication-TileColor" content="#dc2626" />

      {/* Geo Tags for Local SEO */}
      <meta name="geo.region" content="IN-TN" />
      <meta name="geo.placename" content="Rasipuram, Tamil Nadu" />

      {/* Language */}
      <meta httpEquiv="content-language" content="en-IN" />
      <link rel="alternate" hrefLang="en-IN" href={canonicalUrl} />

      {/* Favicon */}
      <link rel="icon" href="/logo.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />

      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* Structured Data - Breadcrumb */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      {/* Custom Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
};

export default SEO;
