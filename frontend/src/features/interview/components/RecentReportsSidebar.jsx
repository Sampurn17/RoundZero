import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useInterview } from '../hooks/useInterview.js'
import { useAuth } from '../../auth/hooks/useAuth.js'
import './RecentReportsSidebar.scss'

export const RecentReportsSidebar = ({ currentId }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === '/'
    const { reports, deleteReport } = useInterview()
    const { handleLogout } = useAuth()

    return (
        <aside className='recent-reports-sidebar'>
            <h2>My Recent Interview Plans</h2>
            
            {(!reports || reports.length === 0) ? (
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#7d8590', fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
                    <p>No recent plans found. Generate your first strategy!</p>
                </div>
            ) : (
                <ul className='reports-list'>
                    {reports.map(report => (
                        <li 
                            key={report._id} 
                        className={`report-item ${currentId === report._id ? 'report-item--active' : ''}`} 
                        onClick={() => navigate(`/interview/${report._id}`)}
                    >
                        <h3>{report.title || 'Untitled Position'}</h3>
                        <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                        <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                        <button 
                            onClick={(e) => { e.stopPropagation(); deleteReport(report._id); }}
                            className='report-delete-btn'
                            title="Delete plan"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </li>
                ))}
            </ul>
            )}
        </aside>
    )
}
