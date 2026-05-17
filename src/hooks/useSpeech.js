import { useRef, useEffect, useCallback } from 'react'

export function useSpeech() {
  const voiceRef = useRef(null)

  useEffect(() => {
    const pick = () => {
      const all = speechSynthesis.getVoices()
      voiceRef.current = all.find(v => v.lang.startsWith('it')) || all[0] || null
    }
    pick()
    speechSynthesis.addEventListener('voiceschanged', pick)
    return () => speechSynthesis.removeEventListener('voiceschanged', pick)
  }, [])

  const speak = useCallback((text) => {
    try {
      speechSynthesis.cancel()
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'it-IT'
      u.rate = 0.9
      u.pitch = 1.05
      u.volume = 1
      if (voiceRef.current) u.voice = voiceRef.current
      speechSynthesis.speak(u)
    } catch (e) {}
  }, [])

  const cancel = useCallback(() => {
    try { speechSynthesis.cancel() } catch (e) {}
  }, [])

  return { speak, cancel }
}
