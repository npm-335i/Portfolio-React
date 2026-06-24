import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/navbar.css";

export default function Navbar() {
  const { navbar } = PortfolioContent;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? "scrolled" : ""}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="nav-container">
        <div className="nav-brand" onClick={() => scrollToSection("#home")}>
          <div className="brand-glow" />
          <span className="brand-dot" />
          <span className="brand-text">{navbar.brand}</span>
        </div>

        <ul className={`nav-links ${open ? "open" : ""}`}>
          {navbar.links.map((link, i) => (
            <motion.li 
              key={link.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <a href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}>
                {link.label}
                <span className="link-underline" />
              </a>
            </motion.li>
          ))}
          <li className="mobile-cta">
            <button className="btn-glow" onClick={() => scrollToSection("#contact")}>
              <span className="btn-text">{navbar.cta}</span>
              <span className="btn-shimmer" />
            </button>
          </li>
        </ul>

        <button className="nav-cta" onClick={() => scrollToSection("#contact")}>
          <span className="btn-text">{navbar.cta}</span>
          <span className="btn-shimmer" />
        </button>

        <button 
          className={`burger ${open ? "open" : ""}`} 
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>
    </motion.nav>
  );
}