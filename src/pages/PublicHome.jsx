import HeroSection from "../components/home/HeroSection";
import HighlightBlocks from "../components/home/HighlightBlock";
import ActivitiesSection from "../components/home/ActivitiesSection";
import CoreValuesSection from "../components/home/CoreValuesSection";
import Footer from "../components/home/Footer";

export default function PublicHome() {
  return (
    <>
      <HeroSection />
      <HighlightBlocks />
      <ActivitiesSection />
      <CoreValuesSection />
      <Footer />
    </>
  );
}
