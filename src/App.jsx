import React, { useState, useRef, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './firebase/config'
import LoginPage from './pages/LoginPage'
import ConfigPanel from './components/ConfigPanel'
import TimerPanel from './components/TimerPanel'
import HistoryPanel from './components/HistoryPanel'
import WorkoutsPage from './pages/WorkoutsPage'
import { useWorkout, PHASES } from './hooks/useWorkout'
import './styles/app.css'

const TABS = ['workouts', 'config', 'timer', 'history']
const TAB_LABELS = {
  workouts: '🏋️ Allenamenti',
  config:   '⚙ Configura',
  timer:    '▶ Timer',
  history:  '📋 Storico',
}

export default function App() {
  const [user, setUser] = useState(undefined) // undefined = loading, null = not logged in
  const [activeTab, setActiveTab] = useState('workouts')
  const [config, setConfig] = useState({
    exDur: 30, restDur: 15, exercises: 4,
    sets: 3, seriesRestDur: 60,
    exerciseNames: [], workoutName: null,
  })
  const [historyKey, setHistoryKey] = useState(0)
  const [workouts, setWorkouts] = useState([])
  const snapRef = useRef(null)

  const {
    phase, timeLeft, currentEx, currentSet, totalRem, currentExName, paused,
    start, togglePause, stop,
  } = useWorkout()

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u))
    return unsub
  }, [])

  const handleStart = (musicStyle) => {
    snapRef.current = { ...config }
    start(config, musicStyle)
    setActiveTab('timer')
  }

  const handleStop = () => { stop(); setActiveTab('config') }

  const handleLogout = async () => {
    stop()
    await signOut(auth)
  }

  useEffect(() => {
    if (phase === PHASES.DONE) {
      setHistoryKey(k => k + 1)
      const t = setTimeout(() => setActiveTab('history'), 2800)
      return () => clearTimeout(t)
    }
  }, [phase])

  // Loading Firebase auth state
  if (user === undefined) {
    return (
      <div className="login-wrap">
        <div className="login-box">
          <div className="login-logo">W</div>
          <div className="login-title">workout</div>
          <div style={{ color: 'var(--text3)', fontSize: 13, marginTop: 8 }}>Caricamento...</div>
        </div>
      </div>
    )
  }

  // Not logged in
  if (!user) return <LoginPage />

  // Logged in
  return (
    <div className="app">
      <header className="app-header">
        <span className="app-logo">W</span>
        <span className="app-title">workout</span>
        <button className="logout-btn" onClick={handleLogout} title="Esci">⎋ Esci</button>
      </header>

      <nav className="tabs">
        {TABS.map(t => (
          <button
            key={t}
            className={`tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => {
              if (t === 'timer' && phase === PHASES.IDLE) return
              setActiveTab(t)
            }}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === 'workouts' && (
          <WorkoutsPage onWorkoutsChange={setWorkouts} />
        )}
        {activeTab === 'config' && (
          <ConfigPanel
            config={config} setConfig={setConfig}
            onStart={handleStart} workouts={workouts}
          />
        )}
        {activeTab === 'timer' && (
          <TimerPanel
            phase={phase} timeLeft={timeLeft} currentEx={currentEx}
            currentSet={currentSet} totalRem={totalRem}
            currentExName={currentExName} paused={paused}
            snap={snapRef.current} onPause={togglePause} onStop={handleStop}
          />
        )}
        {activeTab === 'history' && (
          <HistoryPanel refreshKey={historyKey} />
        )}
      </main>
    </div>
  )
}
