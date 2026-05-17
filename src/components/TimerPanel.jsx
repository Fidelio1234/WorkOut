import React from 'react'
import CircleTimer from './CircleTimer'
import { PHASES } from '../hooks/useWorkout'

const PHASE_NAMES = {
  [PHASES.PREPARE]:     'Inizia tra...',
  [PHASES.EXERCISE]:    null,
  [PHASES.REST]:        'Recupero',
  [PHASES.SERIES_REST]: 'Riposo tra serie',
  [PHASES.DONE]:        'Ottimo lavoro!',
}

export default function TimerPanel({
  phase, timeLeft, currentEx, currentSet, totalRem,
  currentExName, paused, snap, onPause, onStop
}) {
  const isExercise = String(phase) === String(PHASES.EXERCISE)
  const phaseName = isExercise
    ? `Serie ${currentSet} · Esercizio ${currentEx}`
    : PHASE_NAMES[phase] || ''

    const imageUrl = phase === PHASES.EXERCISE
    ? (snap?.exerciseImages?.[currentEx - 1] || '')
    : ''
    console.log('phase:', phase, 'PHASES.EXERCISE:', PHASES.EXERCISE, 'match:', String(phase) === String(PHASES.EXERCISE))
    console.log('imageUrl final:', imageUrl)
  return (
    <div className="panel-timer">
      {/* Background photo */}
      {imageUrl && (
  <img
  src={imageUrl}
  alt=""
  style={{
    display: 'block',
    width: '280px',
    height: '280px',
    objectFit: 'cover',
    borderRadius: '16px',
    opacity: 0.6,
    marginTop: '1rem',
    }}
  />
)}
      {snap?.workoutName && (
        <div className="timer-workout-name">{snap.workoutName}</div>
      )}

      <div className="phase-name">{phaseName}</div>

      {isExercise && currentExName && (
        <div className="current-ex-name">{currentExName}</div>
      )}

      <CircleTimer
        phase={phase} timeLeft={timeLeft}
        currentEx={currentEx} currentSet={currentSet} snap={snap}
      />

      <div className="info-row">
        <div className="info-chip">
          <strong>{currentEx}/{snap?.exercises || '—'}</strong>
          esercizio
        </div>
        <div className="info-chip">
          <strong>{currentSet}/{snap?.sets || '—'}</strong>
          serie
        </div>
        <div className="info-chip">
          <strong>{totalRem}</strong>
          rimanenti
        </div>
      </div>

      {phase !== PHASES.DONE && (
        <div className="ctrl-row">
          <button className="ctrl-btn" onClick={onPause}>
            {paused ? '▶ Riprendi' : '⏸ Pausa'}
          </button>
          <button className="ctrl-btn danger" onClick={onStop}>
            ■ Ferma
          </button>
        </div>
      )}
    </div>
  )
}
