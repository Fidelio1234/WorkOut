import { useRef, useCallback } from 'react'

export function useAudio() {
  const ctxRef = useRef(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  const beep = useCallback((freq = 880, dur = 0.12, type = 'sine', vol = 0.3) => {
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.type = type
      osc.frequency.value = freq
      gain.gain.setValueAtTime(vol, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur)
      osc.start()
      osc.stop(ctx.currentTime + dur + 0.01)
    } catch (e) {}
  }, [getCtx])

  const startMusic = useCallback(() => {}, [])
  const stopMusic = useCallback(() => {}, [])
  const pauseMusic = useCallback(() => {}, [])
  const setVolume = useCallback(() => {}, [])

  return { beep, startMusic, stopMusic, pauseMusic, setVolume }
}