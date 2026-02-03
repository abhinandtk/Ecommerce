import Image from "next/image";
import Header from "./components/Header";
import OfferSection from "./components/OfferSection";
import Banner from "./components/Banner";
import TrendingNow from "./components/TrendingNow";

export default function Home() {
  return (
   <main className="min-h-screen bg-white">
    {/* <OfferSection/> */}
    <Header/>
    <div className="pt-25">
      <Banner/>
      <TrendingNow/>
    </div>
   </main>
  );
}
