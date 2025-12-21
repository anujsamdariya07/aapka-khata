import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingPage from "@/components/LandingPage";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
