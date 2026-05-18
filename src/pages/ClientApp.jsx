import React, { useState, useRef, useEffect } from 'react'
import { getWorkouts } from '../firebase/db'
import { useWorkout, PHASES } from '../hooks/useWorkout'
import TimerPanel from '../components/TimerPanel'
import { saveClientSession, getClientSessions } from '../firebase/db'
import { useSpeech } from '../hooks/useSpeech'

export default function ClientApp({ client, onLogout }) {
  const [workouts, setWorkouts] = useState([])
  const [activeTab, setActiveTab] = useState('workouts')
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [sessions, setSessions] = useState([])
  const [loadingSessions, setLoadingSessions] = useState(false)
  const snapRef = useRef(null)
  const { speak } = useSpeech()

  const { phase, timeLeft, currentEx, currentSet, totalRem, currentExName, paused, start, togglePause, stop } = useWorkout()

  useEffect(() => {
    const load = async () => {
      try {
        const all = await getWorkouts()
        const assigned = all.filter(w => (client.workoutIds || []).includes(w.id))
        setWorkouts(assigned)
      } catch (e) {}
    }
    load()
  }, [client])

  useEffect(() => {
    if (activeTab === 'history') {
      setLoadingSessions(true)
      getClientSessions(client.id)
        .then(setSessions)
        .catch(() => setSessions([]))
        .finally(() => setLoadingSessions(false))
    }
  }, [activeTab, client.id])

  useEffect(() => {
    if (phase === PHASES.DONE) {
      const snap = snapRef.current
      if (snap) {
        const totalSec = snap.sets * snap.exercises * (snap.exDur + snap.restDur)
        const mm = Math.floor(totalSec / 60)
        const ss = totalSec % 60
        saveClientSession({
          clientId: client.id,
          workoutName: snap.workoutName || null,
          sets: snap.sets,
          exercises: snap.exercises,
          exDur: snap.exDur,
          restDur: snap.restDur,
          totalMin: `${mm}min${ss ? ' ' + ss + 's' : ''}`,
        }).catch(() => {})
      }
      const t = setTimeout(() => setActiveTab('history'), 2800)
      return () => clearTimeout(t)
    }
  }, [phase, client.id])

  const handleStart = (w) => {
    const config = {
      exDur: w.exDur,
      restDur: w.restDur,
      seriesRestDur: w.seriesRestDur ?? 60,
      sets: w.sets,
      exercises: w.exercises,
      exerciseNames: w.exerciseNames || [],
      exerciseImages: w.exerciseImages || [],
      workoutName: w.name,
    }
    snapRef.current = config
    start(config, 'ambient')
    setActiveTab('timer')
  }

  const handleStop = () => { stop(); setActiveTab('workouts') }

  const formatDate = (ts) => {
    if (!ts) return '—'
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
  }


  useEffect(() => {
    const load = async () => {
      try {
        const all = await getWorkouts()
        const assigned = all.filter(w => (client.workoutIds || []).includes(w.id))
        setWorkouts(assigned)
        setTimeout(() => speak(`Benvenuto ${client.fullName}`), 2000)
      } catch (e) {}
    }
    load()
  }, [client])

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-logo">W</span>
        <div>
          <div className="app-title">workout</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>{client.fullName}</div>
        </div>
        <button className="logout-btn" onClick={onLogout}>⎋ Esci</button>
      </header>

      <nav className="tabs">
        {['workouts', 'timer', 'history'].map(t => (
          <button
            key={t}
            className={`tab ${activeTab === t ? 'active' : ''}`}
            onClick={() => {
              if (t === 'timer' && phase === PHASES.IDLE) return
              setActiveTab(t)
            }}
          >
            {t === 'workouts' ? '🏋️ I miei workout' : t === 'timer' ? '▶ Timer' : '📋 Storico'}
          </button>
        ))}
      </nav>

      <main className="main-content">
        {activeTab === 'workouts' && (
          <div>
            {workouts.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">🏋️</div>
                Nessun allenamento assegnato ancora.
              </div>
            )}
            <div className="workout-list">
              {workouts.map(w => (
                <div key={w.id} className="workout-item">
                  {w.exerciseImages?.[0] && (
                    <img src={w.exerciseImages[0]} alt={w.name} className="workout-item-thumb" />
                  )}
                  <div className="workout-item-info">
                    <div className="workout-item-name">{w.name}</div>
                    <div className="workout-item-meta">{w.sets} serie · {w.exercises} esercizi · {w.exDur}s/{w.restDur}s</div>
                    <div className="workout-item-exs">{(w.exerciseNames || []).join(' · ')}</div>
                  </div>
                  <button
                    className="start-btn"
                    style={{ width: 'auto', padding: '8px 16px', fontSize: 13 }}
                    onClick={() => handleStart(w)}
                  >
                    ▶ Start
                  </button>
                </div>
              ))}
            </div>
          </div>
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
          <div className="history-list">
            {loadingSessions && <div className="empty-state">Caricamento...</div>}
            {!loadingSessions && sessions.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                Nessuna sessione ancora.
              </div>
            )}
            {sessions.map(s => (
              <div key={s.id} className="history-item">
                <div className="history-icon">⚡</div>
                <div className="history-info">
                  <div className="history-name">{s.workoutName || `${s.sets} serie × ${s.exercises} esercizi`}</div>
                  <div className="history-meta">{s.exDur}s · {s.restDur}s recupero · {s.totalMin}</div>
                </div>
                <div className="history-time">{formatDate(s.completedAt)}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}