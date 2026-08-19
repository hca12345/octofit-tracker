import { NavLink, Route, Routes } from 'react-router-dom'
import logoUrl from '../../../docs/octofitapp-small.png'
import { hasCodespaceApi } from './api.js'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './theme.css'

const navigation = [['/', 'Overview'], ['/activities', 'Activities'], ['/leaderboard', 'Leaderboard'], ['/teams', 'Teams'], ['/users', 'Users'], ['/workouts', 'Workouts']]

function Overview() {
  return <section className="overview view-shell"><p className="eyebrow">OctoFit Tracker</p><h1>Make your next move count.</h1><p className="lede">A calm command center for activity, community, and consistency.</p><div className="overview-links">{navigation.slice(1).map(([path, label]) => <NavLink className="overview-link" to={path} key={path}><span>{label}</span><span aria-hidden="true">↗</span></NavLink>)}</div></section>
}

export default function App() {
  return <div className="app-frame"><header className="app-header"><NavLink className="brand" to="/"><img src={logoUrl} alt="" /><span>OctoFit<span> / tracker</span></span></NavLink><nav className="main-nav" aria-label="Primary navigation">{navigation.map(([path, label]) => <NavLink className={({ isActive }) => isActive ? 'active' : ''} to={path} key={path}>{label}</NavLink>)}</nav></header>{!hasCodespaceApi && <div className="env-notice">VITE_CODESPACE_NAME is not set. Using the local API at http://localhost:8000.</div>}<main><Routes><Route path="/" element={<Overview />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main></div>
}