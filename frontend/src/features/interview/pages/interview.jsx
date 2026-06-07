import React, { useState, useEffect, useRef } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { RecentReportsSidebar } from '../components/RecentReportsSidebar'
import { Loader } from '../../../components/Loader/Loader'

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual'
}

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <span className='roadmap-day__badge'>Day {day.day}</span>
        <div className='roadmap-day__content'>
            <div className='roadmap-day__header'>
                <h3 className='roadmap-day__focus'>{day.focus}</h3>
            </div>
            <ul className='roadmap-day__tasks'>
                {day.tasks.map((task, i) => (
                    <li key={i}><span className='roadmap-day__bullet' />{task}</li>
                ))}
            </ul>
        </div>
    </div>
)

const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const [isDownloading, setIsDownloading] = useState(false)
    // scrollReset: incrementing this forces the content panel to re-attach
    // its ref callback, which immediately sets scrollTop=0 on the real DOM node
    const [scrollReset, setScrollReset] = useState(0)

    const { report, getReportById, getResumePdf, getReports } = useInterview()
    const navigate = useNavigate()
    const { interviewId } = useParams()

    // Instead of a plain ref, use a ref CALLBACK.
    // This fires synchronously when the DOM node is attached or replaced —
    // guaranteed before any browser scroll restoration can run.
    const contentRef = useRef(null)
    const setContentRef = (node) => {
        if (node) {
            node.scrollTop = 0   // immediately zero scroll on mount
        }
        contentRef.current = node
    }

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
            getReports()
        }
    }, [interviewId])

    // When report loads, bump scrollReset to remount the content panel
    // via key change — the ref callback will fire and set scrollTop=0
    // on the fresh DOM node before any paint
    useEffect(() => {
        if (report) {
            setScrollReset(n => n + 1)
        }
    }, [report?._id])  // only when a DIFFERENT report loads, not on every render

    const handleNavChange = (id) => {
        setActiveNav(id)
        setScrollReset(n => n + 1)  // force remount + ref callback fires
    }

    const handleDownloadResume = async () => {
        setIsDownloading(true)
        await getResumePdf(interviewId)
        setIsDownloading(false)
    }

    if (!report) {
        return <Loader message="Loading your interview plan..." />
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    const circumference = 2 * Math.PI * 46
    const dashArray = `${(report.matchScore / 100) * circumference} ${circumference}`

    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                <RecentReportsSidebar currentId={interviewId} />

                <div className='bento-middle'>
                    <div className='bento-middle-top'>

                        <nav className='interview-nav bento-card'>
                            <div className='nav-content'>
                                <span className='interview-nav__label'>Sections</span>

                                {NAV_ITEMS.map(item => (
                                    <button
                                        key={item.id}
                                        className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                        onClick={() => handleNavChange(item.id)}
                                    >
                                        <span className='interview-nav__icon'>{item.icon}</span>
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </nav>

                        {/*
                            key={scrollReset} remounts this element whenever
                            nav changes or a new report loads.
                            setContentRef fires immediately on mount and
                            sets scrollTop=0 on the raw DOM node — before
                            any browser scroll restoration can override it.
                        */}
                        <main
                            className='interview-content bento-card'
                            ref={setContentRef}
                            key={`${activeNav}-${scrollReset}`}
                        >
                            {activeNav === 'technical' && (
                                <section>
                                    <div className='content-header'>
                                        <h2>Technical Questions</h2>
                                        <span className='content-header__count'>{report.technicalQuestions.length} questions</span>
                                    </div>
                                    <div className='q-list'>
                                        {report.technicalQuestions.map((q, i) => (
                                            <QuestionCard key={i} item={q} index={i} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeNav === 'behavioral' && (
                                <section>
                                    <div className='content-header'>
                                        <h2>Behavioral Questions</h2>
                                        <span className='content-header__count'>{report.behavioralQuestions.length} questions</span>
                                    </div>
                                    <div className='q-list'>
                                        {report.behavioralQuestions.map((q, i) => (
                                            <QuestionCard key={i} item={q} index={i} />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {activeNav === 'roadmap' && (
                                <section>
                                    <div className='content-header'>
                                        <h2>Preparation Road Map</h2>
                                        <span className='content-header__count'>{report.preparationPlan.length}-day plan</span>
                                    </div>
                                    <div className='roadmap-list'>
                                        {report.preparationPlan.map(day => (
                                            <RoadMapDay key={day.day} day={day} />
                                        ))}
                                    </div>
                                </section>
                            )}
                        </main>
                    </div>

                    <div className='bento-footer'>
                        <span className='footer-text'>General info &bull; Help center</span>
                        <button className='download-btn' disabled={isDownloading} onClick={handleDownloadResume}>
                            {isDownloading ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
                                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                    Downloading...
                                </>
                            ) : 'Download Resume'}
                        </button>
                    </div>
                </div>

                <aside className='interview-sidebar bento-card'>
                    <div className='match-score'>
                        <p className='match-score__label'>Match Score</p>
                        <div className={`match-score__ring ${scoreColor}`}>
                            <svg viewBox="0 0 100 100">
                                <circle className='match-score__bg' cx="50" cy="50" r="46" />
                                <circle className='match-score__fill' cx="50" cy="50" r="46" style={{ strokeDasharray: dashArray }} />
                            </svg>
                            <div className='match-score__text'>
                                <span className='match-score__value'>{report.matchScore}</span>
                                <span className='match-score__pct'>%</span>
                            </div>
                        </div>
                        <p className='match-score__sub'>
                            {report.matchScore >= 80 ? 'Strong match for this role' :
                                report.matchScore >= 60 ? 'Moderate match for this role' :
                                    'Low match — review skill gaps'}
                        </p>
                    </div>

                    <hr className='sidebar-divider' />

                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-tag skill-tag--${gap.severity?.toLowerCase() || 'medium'}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>

            </div>
        </div>
    )
}

export default Interview