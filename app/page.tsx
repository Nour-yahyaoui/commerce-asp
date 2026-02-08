import Header from './components/Header';
import ProfileSection from './components/sections/ProfileSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/20 to-purple-50/10">
      <Header />
      
      <main>
        <HeroSection />
        <ProfileSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
}