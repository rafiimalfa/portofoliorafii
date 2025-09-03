import React from "react";
import Navbar from "./components/Navbar"; // ✅ default import
import Hero from "./components/Hero";     // ✅ default import
import AboutMe from "./components/AboutMe"; // ✅ panggil AboutMe
import MyProjects from "./components/MyProjects";
import CursorFX from "./components/CursorFX";
import Expertise from "./components/Expertise";
import Footer from "./components/Footer";


export default function Page(): React.JSX.Element {
  return (
    <main className="relative">
      <Navbar />
      <CursorFX />   {/* <- cukup ini saja */}
      <Hero />
      <AboutMe />           {/* Section ABOUT ME */}
      <MyProjects />
      <Expertise />
      <Footer />
    </main>
  );
}