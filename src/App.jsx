import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [form, setForm] = useState({ name: 'Vallamsetty Ashok', email: 'vallamsettyashok913@gmail.com', message: '' });
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Fallback: open user's email client when backend is not available
  function fallbackToMailClient(data) {
    const subject = encodeURIComponent(`Portfolio contact from ${data.name}`);
    const body = encodeURIComponent(`${data.message}

Contact Email: ${data.email}`);
    const mailto = `mailto:vallamsettyashok913@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setStatus('sent-via-mailclient');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    // Basic validation
    if (!form.email || !form.message) {
      setErrorMsg('Please provide your email and a message.');
      setStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('sent');
        setForm({ ...form, message: '' });
        return;
      }

      // If backend responded but not OK, try fallback (Formspree alternative or mail client)
      const text = await res.text().catch(() => '');
      console.warn('Contact API returned non-OK:', res.status, text);
      setErrorMsg('Server rejected the message — falling back to opening your email client.');
      fallbackToMailClient(form);
    } catch (err) {
      console.error('Contact API error:', err);
      // If network error (no backend), fallback to mail client and inform the user
      setErrorMsg('Could not reach contact API. Opening your email client as a fallback.');
      fallbackToMailClient(form);
    }
  }

  return (
    <div className="app-bg">
      <div className="container">
  <header className="header">
          <style>{`
            @keyframes marquee {
              0% { transform: translateX(100%); }
              100% { transform: translateX(-100%); }
            }
            .marquee {
              display: inline-block;
              white-space: nowrap;
              animation: marquee 15s linear infinite;
            }
          `}</style>

          <div className="hero">
            <img src="/profile.jpg" alt="Ashok Vallamsetty" className="profile-img" />
            <div>
              <h1 className="main-title">
                <span className="main-title-span">Vallamsetty Ashok</span>
              </h1>
              <p className="tagline">QA Engineer | Automation & Manual Testing | Banking(Fraud UAT Testing) </p>
            </div>
          </div>

          <nav className="nav">
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#contact" className="nav-link nav-link-contact">Contact</a>
          </nav>
        </header>

  <main className="main-grid">
          <section className="about-section">
            <h2 className="section-title">About</h2>
            <p className="about-text">I’m a QA Engineer with 3 years of experience in manual & automation testing, specializing in banking fraud detection (NICE Actimize) and web applications. I combine domain knowledge, automation skills (Selenium + Java), and GenAI tools to drive test efficiency and reliability.</p>

            <div className="section-block">
              <h3 className="block-title">Contact</h3>
              <p className="block-text">📍 Dharmavaram, Andhra Pradesh, India</p>
              <p className="block-text">📧 vallamsettyashok913@gmail.com</p>
              <p className="block-text">📞 +91 79893 63553</p>
            </div>

            <div className="section-block">
              <h3 className="block-title">Tech & Tools</h3>
              <ul className="block-list">
                <li>• Selenium WebDriver (Java), TestNG</li>
                <li>• Jira, Q-Test, Postman (API basics)</li>
                <li>• MySQL, Git, GitHub</li>
                <li>• GitHub Copilot, ChatGPT (GenAI)</li>
                <li>• Agile / Scrum</li>
              </ul>
            </div>

            <div className="section-block">
              <h3 className="block-title">Achievements</h3>
              <ul className="block-list">
                <li>• Boosted automation efficiency by 80% using Copilot-generated scripts</li>
                <li>• Best Team Player award for on-time delivery</li>
              </ul>
            </div>
          </section>

          <section className="projects-section">
            <div className="project-card">
              <h2 className="section-title">Experience</h2>
              <div>
                <h3 className="block-title">Software Engineer (QA) • HCL Technologies</h3>
                <p className="block-text">Aug 2022 – Present • Hyderabad, India</p>
                <ul className="block-list">
                  <li>Performed manual and automation testing for web & banking fraud systems (NICE Actimize).</li>
                  <li>Authored Selenium + Java + TestNG automation suites and maintained test traceability.</li>
                  <li>Conducted UAT, regression, and functional testing; managed defects in Jira.</li>
                  <li>Used GitHub Copilot to generate test scenarios—reduced regression time by 80%.</li>
                </ul>
              </div>
            </div>

            <div id="projects" className="project-card">
              <h2 className="section-title">Selected Projects</h2>

              <article className="project-article">
                <h3 className="block-title">USAA — Banking Fraud Detection (NICE Actimize)</h3>
                <p className="block-text">Role: QA Engineer • Domain: Banking • Focus: UAT & Fraud Prevention</p>
                <ul className="block-list">
                  <li>Validated fraud rule logic and alert triggers across payment channels.</li>
                  <li>Executed UAT and designed automation tests for Fraud Referral submission portal.</li>
                  <li>Performed SQL validations to ensure backend data accuracy for fraud events.</li>
                </ul>
              </article>

              <article className="project-article">
                <h3 className="block-title">Automation Framework — Selenium + Java + TestNG</h3>
                <p className="block-text">Designed reusable page objects and TestNG-driven suites for faster regression runs.</p>
                <ul className="block-list">
                  <li>Modular Page Object Model and data-driven test support.</li>
                  <li>CI-ready test runner (can be connected to GitHub Actions / Jenkins).</li>
                </ul>
              </article>
            </div>

            <div id="contact" className="project-card">
              <h2 className="section-title">Contact</h2>
              <p className="block-text">Interested recruiters can reach out via email or use the contact form below.</p>

              <form onSubmit={handleSubmit} className="contact-form">
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="form-input" />
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Your email" className="form-input" />
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Message" className="form-textarea" />

                <button type="submit" className="form-button">{status === 'sending' ? 'Sending...' : 'Send Message'}</button>

                {status === 'sent' && <p className="form-success">Message sent — I will respond shortly.</p>}
                {status === 'sent-via-mailclient' && <p className="form-success">Opened your email client. Please send the email to complete contact.</p>}
                {status === 'error' && <p className="form-error">There was an error. {errorMsg || 'Try again later or email: vallamsettyashok913@gmail.com'}</p>}
              </form>

              <div className="section-block">
                <p>Quick links:</p>
                <div className="quick-links">
                  <a href="https://github.com/GITHUB_USERNAME" target="_blank" rel="noreferrer" className="quick-link">GitHub</a>
                  <a href="https://www.linkedin.com/in/VallamsettyAshok" target="_blank" rel="noreferrer" className="quick-link">LinkedIn</a>
                  <a href="/resume.pdf" className="quick-link">Resume (PDF)</a>
                </div>
              </div>
            </div>
          </section>
        </main>

  <footer className="footer">© {new Date().getFullYear()} Vallamsetty Ashok — QA Engineer</footer>
      </div>
    </div>
  );
}

