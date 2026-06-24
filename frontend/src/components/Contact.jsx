import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import PortfolioContent from "../data/PortfolioContent";
import "../styles/Contact.css";

export default function Contact() {
  const { contact } = PortfolioContent;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    }
    checkCooldown();
  }, [PUBLIC_KEY]);

  const checkCooldown = () => {
    const lastSent = localStorage.getItem("lastEmailSent");
    if (lastSent) {
      const lastSentTime = parseInt(lastSent, 10);
      const currentTime = Date.now();
      const timeDiff = currentTime - lastSentTime;
      const cooldownPeriod = 24 * 60 * 60 * 1000;

      if (timeDiff < cooldownPeriod) {
        const remaining = cooldownPeriod - timeDiff;
        setCooldownRemaining(remaining);
        startCountdown(remaining);
        setStatus({
          type: "info",
          message: `Please wait ${formatTime(remaining)} before sending another message.`,
        });
        return true;
      } else {
        localStorage.removeItem("lastEmailSent");
        setCooldownRemaining(0);
        return false;
      }
    }
    return false;
  };

  const startCountdown = (remaining) => {
    const interval = setInterval(() => {
      setCooldownRemaining((prev) => {
        const newTime = prev - 1000;
        if (newTime <= 0) {
          clearInterval(interval);
          localStorage.removeItem("lastEmailSent");
          setStatus({ type: "", message: "" });
          return 0;
        }
        setStatus({
          type: "info",
          message: `Please wait ${formatTime(newTime)} before sending another message.`,
        });
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    if (checkCooldown()) {
      setIsSubmitting(false);
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error("Missing env vars:", {
        SERVICE_ID: !!SERVICE_ID,
        TEMPLATE_ID: !!TEMPLATE_ID,
        PUBLIC_KEY: !!PUBLIC_KEY,
      });
      setStatus({
        type: "error",
        message:
          "   Email service is not configured. Please contact the administrator.",
      });
      setIsSubmitting(false);
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setStatus({
        type: "error",
        message: "   Please fill in all fields.",
      });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: "error",
        message: "   Please enter a valid email address.",
      });
      setIsSubmitting(false);
      return;
    }

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: `Portfolio Contact from ${formData.name}`,
      time: new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      year: new Date().getFullYear(),
      reply_to: formData.email,
    };


    try {
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
      );

      if (response.status === 200) {
        localStorage.setItem("lastEmailSent", Date.now().toString());
        setCooldownRemaining(24 * 60 * 60 * 1000);

        setStatus({
          type: "success",
          message: " Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });

        startCountdown(24 * 60 * 60 * 1000);
      } else {
        throw new Error(`Unexpected status: ${response.status}`);
      }
    } catch (error) {
      console.error("EmailJS Error Details:", {
        message: error.message,
        text: error.text,
        status: error.status,
      });

      let errorMessage = "   Failed to send message. Please try again later.";

      if (error.text) {
        try {
          const parsed = JSON.parse(error.text);
          if (parsed.message) {
            errorMessage = `   ${parsed.message}`;
          } else if (parsed.error) {
            errorMessage = `   ${parsed.error}`;
          }
        } catch (e) {
          if (typeof error.text === "string" && error.text.includes("412")) {
            errorMessage =
              "   Gmail authentication error. Please reconnect your Gmail service in EmailJS dashboard.";
          } else {
            errorMessage = `   ${error.text}`;
          }
        }
      } else if (error.message) {
        if (error.message.includes("401") || error.message.includes("403")) {
          errorMessage =
            "   Invalid EmailJS credentials. Please check your API keys.";
        } else if (error.message.includes("404")) {
          errorMessage =
            "   Service or Template not found. Please check your IDs.";
        } else if (error.message.includes("412")) {
          errorMessage =
            "   Gmail authentication error. Please reconnect your Gmail service in EmailJS dashboard.";
        } else {
          errorMessage = `   ${error.message}`;
        }
      }

      setStatus({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status.message) setStatus({ type: "", message: "" });
  };

  const EmailIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  );

  const LocationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );

  const AvailabilityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  );

  const SendIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  );

  const SpinnerIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="spinner">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  );

  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="contact-header"
        >
          <span className="section-tag">{contact.tag}</span>
          <h2 className="section-title">
            {contact.title}{" "}
            <span className="highlight">{contact.titleHighlight}</span>
          </h2>
          <p className="section-subtitle">{contact.description}</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="contact-info"
          >
            <div className="info-item">
              <span className="info-icon"><EmailIcon /></span>
              <div>
                <h4>Email</h4>
                <p>uzaaiaamirr@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon"><LocationIcon /></span>
              <div>
                <h4>Location</h4>
                <p>Remote / Worldwide</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon"><AvailabilityIcon /></span>
              <div>
                <h4>Availability</h4>
                <p>Open to work</p>
              </div>
            </div>

            <div className="social-links">
              <h4>Connect with me</h4>
              <div className="social-grid">
                {contact.social.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.1, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="social-icon"
                      width="24"
                      height="24"
                    />
                    <span className="social-name">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={contact.form.namePlaceholder}
                required
                disabled={isSubmitting || cooldownRemaining > 0}
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={contact.form.emailPlaceholder}
                required
                disabled={isSubmitting || cooldownRemaining > 0}
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={contact.form.messagePlaceholder}
                rows="5"
                required
                disabled={isSubmitting || cooldownRemaining > 0}
              />
            </div>

            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting || cooldownRemaining > 0}
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon />
                  Sending...
                </>
              ) : cooldownRemaining > 0 ? (
                ` Wait ${formatTime(cooldownRemaining)}`
              ) : (
                <>
                  <SendIcon />
                  {contact.form.submitText}
                </>
              )}
              <span className="btn-glow-effect" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}