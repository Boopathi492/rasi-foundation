import { useRouter } from 'next/router';
import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import FloatingButtons from './FloatingButtons';

const Layout = ({
  children,
  title = 'RASI FOUNDATION',
  description = 'Empowering minds! Igniting future! - Career Guidance & Education Consultancy in Tamil Nadu. Expert guidance for MBBS, Engineering, MBA, Law admissions.',
  keywords = '',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  noIndex = false,
  structuredData = null
}) => {
  const router = useRouter();
  const isHome = router.pathname === '/';

  return (
    <>
      <SEO
        title={title}
        description={description}
        keywords={keywords}
        ogImage={ogImage}
        ogType={ogType}
        noIndex={noIndex}
        structuredData={structuredData}
      />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content" className="flex-grow">{children}</main>
        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
};

export default Layout;
