import { useRef, useCallback } from 'react'

export function useAudio() {
  const ctxRef = useRef(null)
  const masterRef = useRef(null)
  const oscRefs = useRef([])
  const volRef = useRef(0.5)

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

  const setVolume = useCallback((v) => {
    volRef.current = v
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setTargetAtTime(v * 0.22, ctxRef.current.currentTime, 0.05)
    }
  }, [])

  const stopMusic = useCallback(() => {
    oscRefs.current.forEach(o => { try { o.stop() } catch (e) {} })
    oscRefs.current = []
    if (masterRef.current) {
      try { masterRef.current.disconnect() } catch (e) {}
      masterRef.current = null
    }
  }, [])

  const startMusic = useCallback((style) => {
    stopMusic()
    if (style === 'none') return
    try {
      const ctx = getCtx()
      const master = ctx.createGain()
      master.gain.value = 0
      master.connect(ctx.destination)
      masterRef.current = master

      const profiles = {
        ambient:    { freqs: [55, 82, 110, 138, 165], type: 'sine',     lfoRate: 0.07 },
        energetic:  { freqs: [110, 165, 220, 330, 440], type: 'sawtooth', lfoRate: 0.22 },
        focus:      { freqs: [60, 90, 120, 180, 270],  type: 'triangle', lfoRate: 0.11 },
      }
      const p = profiles[style] || profiles.ambient
      const nodes = []

      p.freqs.forEach((f, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        const lfo = ctx.createOscillator()
        const lfoGain = ctx.createGain()

        lfo.frequency.value = p.lfoRate + i * 0.013
        lfoGain.gain.value = 4
        lfo.connect(lfoGain)
        lfoGain.connect(osc.frequency)

        osc.type = p.type
        osc.frequency.value = f
        gain.gain.value = 0.18 / (i + 1)

        osc.connect(gain)
        gain.connect(master)

        lfo.start(); osc.start()
        nodes.push(osc, lfo)
      })

      oscRefs.current = nodes
      master.gain.setValueAtTime(0, ctx.currentTime)
      master.gain.linearRampToValueAtTime(volRef.current * 0.22, ctx.currentTime + 1.8)
    } catch (e) {
      console.warn('Audio error:', e)
    }
  }, [getCtx, stopMusic])

  const pauseMusic = useCallback((paused) => {
    if (masterRef.current && ctxRef.current) {
      const target = paused ? 0 : volRef.current * 0.22
      masterRef.current.gain.setTargetAtTime(target, ctxRef.current.currentTime, 0.25)
    }
  }, [])

  return { beep, startMusic, stopMusic, setVolume, pauseMusic }
}
