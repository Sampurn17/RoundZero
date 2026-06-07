import React from 'react';
import { Link } from 'react-router';
import './About.scss';

const About = () => {
    return (
        <div className="about-page">
            <nav className="auth-simple-nav">
                <Link to="/" className="auth-logo-nav">ROUNDZERO</Link>
                <div className="auth-nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </div>
            </nav>

            <main className="about-content">
                <section className="about-hero">
                    <h1>ABOUT ROUNDZERO</h1>
                    <p className="subtitle">
                        Your ultimate AI sandbox before the stakes get real.
                    </p>
                </section>

                <section className="about-explanation">
                    <div className="text-block">
                        <h2>The Pre-Round Gauntlet</h2>
                        <p>
                            We built RoundZero because typical practice tools just aren't enough. Stepping into a real interview room requires more than memorized answers—it requires a forged, battle-tested profile. 
                        </p>
                        <p>
                            Think of RoundZero as the phase where you break, rebuild, and perfect your profile. We aggressively audit your resume against the industry standards, simulate grueling technical and behavioral sessions, expose fatal skill gaps, and forge a bulletproof roadmap to bridge them.
                        </p>
                        <p>
                            Our state-of-the-art AI doesn't just grade you—it guides you. From dynamic interview prep to customized resume generation, we equip you with everything you need to crush your actual interview.
                        </p>
                    </div>
                </section>

                <section className="about-faq">
                    <h2>FREQUENTLY ASKED QUESTIONS</h2>
                    <div className="faq-list">
                        <details className="faq-item">
                            <summary>How does the resume analysis work?</summary>
                            <div className="faq-answer">
                                <p>Simply upload your current resume in PDF format and provide the target job description. Our AI model deeply analyzes the alignment, identifying crucial missing keywords, formatting issues, and suggesting high-impact action verbs to optimize your profile for ATS (Applicant Tracking Systems).</p>
                            </div>
                        </details>
                        
                        <details className="faq-item">
                            <summary>Are the interview questions personalized?</summary>
                            <div className="faq-answer">
                                <p>Absolutely. The generated technical and behavioral questions are dynamically tailored specifically to the intersection of your uploaded resume, your self-description, and the target role requirements. It guarantees you are practicing the exact questions a real recruiter would ask.</p>
                            </div>
                        </details>
                        
                        <details className="faq-item">
                            <summary>What is the "Skill Gaps & Roadmap" feature?</summary>
                            <div className="faq-answer">
                                <p>If our AI detects that your profile lacks certain skills mandated by the job description, it flags them as 'Skill Gaps'. It then automatically generates a structured, day-by-day learning roadmap to help you rapidly acquire those skills before your real interview.</p>
                            </div>
                        </details>

                        <details className="faq-item">
                            <summary>Is RoundZero completely free to use?</summary>
                            <div className="faq-answer">
                                <p>Yes! During our current preview phase, all of RoundZero's core features including the resume audit, interview simulation, and PDF generation are completely free of charge.</p>
                            </div>
                        </details>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default About;
