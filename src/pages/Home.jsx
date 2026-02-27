import Nav from "../components/Nav";
import Hero from "../components/Hero";
import WhyInvest from "../components/WhyInvest";
import ROI from "../components/ROI";
import HowItWorks from "../components/HowItWorks";
import Register from "../components/Register";
import Footer from "../components/Footer";

const Home = () => (
  <div style={{ background: "#f0f2f7" }}>
    <Nav />
    <Hero />
    <WhyInvest />
    <ROI />
    <HowItWorks />
    <Register />
    <Footer />
  </div>
);

export default Home;
