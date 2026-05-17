import { useState, useRef, useCallback } from 'react'
import { useAudio } from './useAudio'
import { useSpeech } from './useSpeech'
import { saveSession } from '../firebase/db'

export const PHASES = {
  IDLE: 'idle',
  PREPARE: 'prepare',
  EXERCISE: 'exercise',
  REST: 'rest',
  SERIES_REST: 'series_rest',
  DONE: 'done',
}

const CIRC = 2 * Math.PI * 96

export function circleOffset(ratio) {
  return CIRC * (1 - Math.max(0, Math.min(1, ratio)))
}

export function useWorkout() {
  const [phase, setPhase] = useState(PHASES.IDLE)
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentEx, setCurrentEx] = useState(1)
  const [currentSet, setCurrentSet] = useState(1)
  const [totalRem, setTotalRem] = useState(0)
  const [currentExName, setCurrentExName] = useState('')
  const [paused, setPaused] = useState(false)

  const snapRef = useRef(null)
  const stateRef = useRef(null)
  const tickerRef = useRef(null)
  const pausedRef = useRef(false)

  const { beep, startMusic, stopMusic, pauseMusic } = useAudio()
  const { speak, cancel } = useSpeech()

  const syncUI = useCallback((s) => {
    setPhase(s.phase)
    setTimeLeft(s.phaseTime)
    setCurrentEx(s.currentEx)
    setCurrentSet(s.currentSet)
    setTotalRem(s.totalRem)
    const snap = snapRef.current
    const exName = snap?.exerciseNames?.[s.currentEx - 1] || ''
    setCurrentExName(exName)
  }, [])

  const finish = useCallback(async (snap) => {
    clearInterval(tickerRef.current)
    stopMusic()
    cancel()
    speak('Allenamento completato! Ottimo lavoro!')
    beep(880, 0.15, 'sine', 0.4)
    setTimeout(() => beep(1100, 0.15, 'sine', 0.4), 220)
    setTimeout(() => beep(1320, 0.25, 'sine', 0.4), 440)

    setPhase(PHASES.DONE)
    stateRef.current = null

    const totalSec = snap.sets * snap.exercises * (snap.exDur + snap.restDur)
    const mm = Math.floor(totalSec / 60)
    const ss = totalSec % 60
    try {
      await saveSession({
        workoutName: snap.workoutName || null,
        sets: snap.sets,
        exercises: snap.exercises,
        exDur: snap.exDur,
        restDur: snap.restDur,
        seriesRestDur: snap.seriesRestDur,
        totalMin: `${mm}min${ss ? ' ' + ss + 's' : ''}`,
      })
    } catch (e) {
      console.warn('Firebase save failed:', e)
    }
  }, [beep, cancel, speak, stopMusic])

  const announceExercise = useCallback((snap, exIndex) => {
    const name = snap?.exerciseNames?.[exIndex]
    if (name) speak(name)
  }, [speak])

  const tick = useCallback(() => {
    if (pausedRef.current) return
    const s = stateRef.current
    if (!s) return
    const snap = snapRef.current

    if (s.phase === PHASES.PREPARE) {
      s.phaseTime--
      const t = s.phaseTime
      if (t > 0 && t <= 3) { beep(500 + t * 80, 0.1, 'sine', 0.35); speak(String(t)) }
      if (t === 0) {
        beep(1000, 0.2, 'sine', 0.4)
        const firstName = snap?.exerciseNames?.[0]
        speak(firstName ? `Via! ${firstName}. ${snap.exDur} secondi` : `Via! ${snap.exDur} secondi`)
        s.phase = PHASES.EXERCISE
        s.phaseTime = snap.exDur
      }
      syncUI({ ...s })
      return
    }

    if (s.phase === PHASES.EXERCISE) {
      s.phaseTime--
      const t = s.phaseTime
      if (t > 0 && t <= 3) { beep(440 + t * 40, 0.09, 'sine', 0.3); speak(String(t)) }
      if (t === 0) {
        const lastEx = s.currentEx >= snap.exercises
        const lastSet = s.currentSet >= snap.sets

        if (lastEx && lastSet) {
          beep(300, 0.2, 'triangle', 0.4); speak('Stop!')
          s.totalRem = Math.max(0, s.totalRem - 1)
          syncUI({ ...s })
          setTimeout(() => finish(snap), 800)
          return
        }

        if (lastEx) {
          beep(300, 0.2, 'triangle', 0.4); speak(`Stop! Riposo serie. ${snap.seriesRestDur} secondi`)
          s.totalRem = Math.max(0, s.totalRem - 1)
          s.currentSet++
          s.currentEx = 1
          if (snap.seriesRestDur > 0) {
            s.phase = PHASES.SERIES_REST
            s.phaseTime = snap.seriesRestDur
          } else {
            s.phase = PHASES.PREPARE
            s.phaseTime = 4
          }
        } else {
          beep(300, 0.2, 'triangle', 0.4); speak(`Stop! Recupero. ${snap.restDur} secondi`)
          s.totalRem = Math.max(0, s.totalRem - 1)
          s.currentEx++
          s.phase = snap.restDur > 0 ? PHASES.REST : PHASES.PREPARE
          s.phaseTime = snap.restDur > 0 ? snap.restDur : 4
        }
      }
      syncUI({ ...s })
      return
    }

    if (s.phase === PHASES.REST) {
      s.phaseTime--
      const t = s.phaseTime
      if (t > 0 && t <= 3) { beep(600 + t * 60, 0.09, 'sine', 0.3); speak(String(t)) }
      if (t === 0) {
        beep(1000, 0.18, 'sine', 0.4)
        const exName = snap?.exerciseNames?.[s.currentEx - 1]
        speak(exName ? `Via! ${exName}. ${snap.exDur} secondi` : `Via! ${snap.exDur} secondi`)
        s.phase = PHASES.EXERCISE
        s.phaseTime = snap.exDur
      }
      syncUI({ ...s })
      return
    }

    if (s.phase === PHASES.SERIES_REST) {
      s.phaseTime--
      const t = s.phaseTime
      if (t > 0 && t <= 3) { beep(600 + t * 60, 0.09, 'sine', 0.3); speak(String(t)) }
      if (t === 0) {
        beep(1000, 0.18, 'sine', 0.4)
        const exName = snap?.exerciseNames?.[0]
        speak(exName ? `Via! Serie ${s.currentSet}. ${exName}. ${snap.exDur} secondi` : `Via! Serie ${s.currentSet}. ${snap.exDur} secondi`)
        s.phase = PHASES.EXERCISE
        s.phaseTime = snap.exDur
      }
      syncUI({ ...s })
    }
  }, [beep, finish, speak, syncUI, announceExercise])

  const start = useCallback((config, musicStyle) => {
    clearInterval(tickerRef.current)
    const snap = { ...config }
    snapRef.current = snap
    const s = {
      phase: PHASES.PREPARE,
      phaseTime: 4,
      currentEx: 1,
      currentSet: 1,
      totalRem: snap.sets * snap.exercises,
    }
    stateRef.current = s
    pausedRef.current = false
    setPaused(false)
    syncUI({ ...s })
    startMusic(musicStyle)
    tick()
    tickerRef.current = setInterval(tick, 1000)
  }, [startMusic, syncUI, tick])

  const togglePause = useCallback(() => {
    const next = !pausedRef.current
    pausedRef.current = next
    setPaused(next)
    pauseMusic(next)
  }, [pauseMusic])

  const stop = useCallback(() => {
    clearInterval(tickerRef.current)
    stateRef.current = null
    stopMusic()
    cancel()
    setPhase(PHASES.IDLE)
    setPaused(false)
    pausedRef.current = false
  }, [cancel, stopMusic])

  return {
    phase, timeLeft, currentEx, currentSet, totalRem, currentExName, paused,
    snap: snapRef.current,
    start, togglePause, stop,
    CIRC,
  }
}
