import React from 'react'
import { PHASES, circleOffset } from '../hooks/useWorkout'

const PHASE_COLORS = {
  [PHASES.PREPARE]:     '#1D9E75',
  [PHASES.EXERCISE]:    '#1D9E75',
  [PHASES.REST]:        '#185FA5',
  [PHASES.SERIES_REST]: '#854F0B',
  [PHASES.DONE]:        '#1D9E75',
}

const PHASE_LABELS = {
  [PHASES.PREPARE]:     'PREPARATI',
  [PHASES.EXERCISE]:    'ESERCIZIO',
  [PHASES.REST]:        'RECUPERO',
  [PHASES.SERIES_REST]: 'RIPOSO TRA SERIE',
  [PHASES.DONE]:        'COMPLETATO',
}

const CIRC = 2 * Math.PI * 96

export default function CircleTimer({ phase, timeLeft, currentEx, currentSet, snap }) {
  const duration = phase === PHASES.PREPARE ? 4
    : phase === PHASES.EXERCISE    ? (snap?.exDur || 1)
    : phase === PHASES.REST        ? (snap?.restDur || 1)
    : phase === PHASES.SERIES_REST ? (snap?.seriesRestDur || 1)
    : 1

  const ratio = timeLeft / duration
  const offset = phase === PHASES.DONE ? 0 : circleOffset(ratio)
  const color = PHASE_COLORS[phase] || '#1D9E75'

  return (
    <div className="circle-wrap">
      <svg width="220" height="220" viewBox="0 0 220 220" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="110" cy="110" r="96" fill="none" stroke="var(--border)" strokeWidth="8" />
        <circle
          cx="110" cy="110" r="96"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s' }}
        />
      </svg>
      <div className="timer-center">
        {phase === PHASES.DONE ? (
          <div className="timer-big" style={{ fontSize: 48 }}>✓</div>
        ) : (
          <>
            <div className="timer-big">{timeLeft}</div>
            <div className="timer-phase-label" style={{ color }}>
              {PHASE_LABELS[phase] || ''}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
