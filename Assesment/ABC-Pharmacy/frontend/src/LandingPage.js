import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'; 
import pharmacyImage from './images/pharmacy-image.jpg';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

const LandingPage = () => {
  return (
    <div>
      <Header />

      <div className="landing-page-container">
        <header className="landing-page-header">
          <h1 className="landing-page-title">Welcome to ABC Pharmacy Admin Panel</h1>
          <p className="landing-page-tagline">Your centralized hub for managing pharmacy operations.</p>
        </header>

        <main className="landing-page-content">
          <section className="landing-page-hero">
            <img src={pharmacyImage} alt="ABC Pharmacy storefront" className="landing-page-hero-image" />
            <p className="landing-page-hero-text">Streamline your administrative tasks with our powerful tools and features designed to enhance pharmacy management.</p>
          </section>

          <section className="landing-page-actions">
            <Link to="/app" className="landing-page-button">
              Manage Items
            </Link>
            <Link to="/invoice" className="landing-page-button">
              Manage Invoices
            </Link>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
