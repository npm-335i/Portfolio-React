import PortfolioContent from "../data/PortfolioContent";
import "../styles/Footer.css";

export default function Footer() {
  const { footer } = PortfolioContent;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="brand-dot" />
            <span className="brand-text">{footer.brand}</span>
          </div>
          <p className="footer-text">{footer.text}</p>
        </div>

        <div className="footer-links">
          {footer.links.map((link, index) => (
            <a key={index} href={link.href}>{link.label}</a>
          ))}
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} {footer.brand.replace('.', '')}. {footer.copyright}</span>
          <span className="footer-heart">{footer.heart}</span>
        </div>
      </div>
    </footer>
  );
}