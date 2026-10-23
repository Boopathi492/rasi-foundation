import Navbar from './Navbar';
import Footer from './Footer';
import SEO from './SEO';
import FloatingButtons from './FloatingButtons';
import NotificationBar from './NotificationBar';

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
        <NotificationBar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingButtons />
      </div>
    </>
  );
};

export default Layout;
