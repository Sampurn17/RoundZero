import React from 'react';

export const AuthInfoPanel = () => {
    return (
        <div className="auth-info-panel form-container">
            <h2 className="info-title">ROUNDZERO: PREPARATION BEFORE THE RECKONING.</h2>
            <p className="info-desc">
                RoundZero is your ultimate AI sandbox before the stakes get real. This isn't just another practice tool—it's the phase where you break, rebuild, and perfect your profile before you ever step into a real interview room. Think of it as your pre-round gauntlet: we aggressively audit your resume, simulate grueling technical and behavioral sessions, expose fatal skill gaps, and forge a bulletproof roadmap to bridge them.
            </p>

            <div className="features-list">
                <div className="feature-item">
                    <div className="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                    </div>
                    <div className="feature-text">
                        <h3>RESUME ANALYSIS & OPTIMIZATION</h3>
                        <p>AI-powered feedback on impact and clarity</p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                    </div>
                    <div className="feature-text">
                        <h3>INTERVIEW PREP: TECH & BEHAVIORAL</h3>
                        <p>Personalized question generation for any role</p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"></path><polyline points="18 17 13 12 9 16 4 11"></polyline></svg>
                    </div>
                    <div className="feature-text">
                        <h3>SKILL GAP & ROADMAP GENERATION</h3>
                        <p>Identify gaps and get a tailored learning path</p>
                    </div>
                </div>

                <div className="feature-item">
                    <div className="feature-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    </div>
                    <div className="feature-text">
                        <h3>TAILORED RESUME GENERATION</h3>
                        <p>Create resumes matched to your target skills</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
