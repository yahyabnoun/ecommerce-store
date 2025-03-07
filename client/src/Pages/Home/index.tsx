import BrandCarousel from "./BrandCarousel";
import Footer from "./Footer";
import HeroSection from "./Hero";
import LatestArrivals from "./LatestArrivals";
import TestimonialsSection from "./TestimonialsSection";
import WhyShopSection from "./WhyShopSection";
const HomePage = () => {
    return (
        <>
            <HeroSection />
            <LatestArrivals />
            <BrandCarousel />
            <TestimonialsSection />
            <WhyShopSection />
            <Footer />
        </>
    );
};

export default HomePage;
