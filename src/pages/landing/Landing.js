import "./landing.css";
import { useState } from "react";
import Navbar from '../../components/navbar';
import Footer from "../../components/footer";
import { LANDING_PAGE_CARD_DATA } from "../../utils/dummyData";

export default function Landing() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="landing">
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            {menuOpen && (
                <div
                    className="menu-overlay"
                    onClick={() => setMenuOpen(false)}
                />
            )}
            {/* HERO */}
            <div className="content">
                <section className="hero">
                    <div className="hero-left">
                        <h1>Find/Publish Jobs</h1>
                        <p>Built for Talents and Companies.</p>
                        <div className="hero-buttons">
                            <a href="/register" className="btn-primary2">Get Started</a>
                        </div>
                    </div>
                    <div className="hero-right">
                        <div className="mock-dashboard">
                            <h4 style={{ fontStyle: "italic" }}>Preview</h4>
                            <div className="mock-card"></div>
                            <div className="mock-card"></div>
                            <div className="mock-card"></div>
                        </div>
                    </div>
                </section>
            {/* FEATURES */}
                <section className="features">
                    {LANDING_PAGE_CARD_DATA.map((item, index) => (
                        <div className="card" key={index}>
                            <h3 className="card_header">
                                {item.icon}
                                {item.header}
                            </h3>
                            <p>{item.details}</p>
                        </div>
                    ))}
                </section>
            </div>
            <Footer />
        </div>
    );
}