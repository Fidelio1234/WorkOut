import React, { useState, useEffect } from 'react'
import { getPresets, savePreset, deletePreset } from '../firebase/db'

const LIMITS = {
  exDur:        [5,  300, 5],
  restDur:      [0,  120, 5],
  exercises:    [1,  20,  1],
  sets:         [1,  20,  1],
  seriesRestDur:[0,  300, 5],
}

function NumInput({ label, value, onChange, unit, step }) {
  return (
    <div className="config-card">
      <div className="config-label">{label}</div>
      <div className="num-input">
        <button className="num-btn" onClick={() => onChange(-step)}>−</button>
        <span className="num-val">{value}</span>
        <button className="num-btn" onClick={() => onChange(step)}>+</button>
      </div>
      <div className="num-unit">{unit}</div>
    </div>
  )
}

export default function ConfigPanel({ config, setConfig, onStart, workouts }) {
  const [presets, setPresets] = useState([])
  const [musicStyle, setMusicStyle] = useState('ambient')
  const [volume, setVolume] = useState(50)
  const [loadingPresets, setLoadingPresets] = useState(true)
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('')

  useEffect(() => {
    getPresets()
      .then(setPresets)
      .catch(() => setPresets([]))
      .finally(() => setLoadingPresets(false))
  }, [])

  // When user picks a workout from the dropdown, load its params into config
  const handleWorkoutSelect = (id) => {
    setSelectedWorkoutId(id)
    if (!id) return
    const w = workouts.find(w => w.id === id)
    if (!w) return
    setConfig({
      exDur: w.exDur,
      restDur: w.restDur,
      seriesRestDur: w.seriesRestDur ?? 60,
      sets: w.sets,
      exercises: w.exercises,
      exerciseNames: w.exerciseNames || [],
      exerciseImages: w.exerciseImages || [],   // ← questa riga
      workoutName: w.name,
    })
  }

  const change = (key, delta) => {
    const [mn, mx] = LIMITS[key]
    setSelectedWorkoutId('') // manual edit deselects workout
    setConfig(prev => ({
      ...prev,
      [key]: Math.max(mn, Math.min(mx, prev[key] + delta))
    }))
  }

  const handleSavePreset = async () => {
    const name = prompt('Nome del preset:')
    if (!name) return
    try {
      await savePreset({ name, ...config })
      const updated = await getPresets()
      setPresets(updated)
    } catch (e) {
      alert('Errore salvataggio preset. Configura Firebase prima.')
    }
  }

  const handleDeletePreset = async (id, e) => {
    e.stopPropagation()
    try {
      await deletePreset(id)
      setPresets(prev => prev.filter(p => p.id !== id))
    } catch (e) {}
  }

  const loadPreset = (p) => {
    setSelectedWorkoutId('')
    setConfig({
      exDur: p.exDur,
      restDur: p.restDur,
      exercises: p.exercises,
      sets: p.sets,
      seriesRestDur: p.seriesRestDur ?? 60,
    })
  }

  const totalSec = config.sets * config.exercises * (config.exDur + config.restDur)
    + (config.sets - 1) * (config.seriesRestDur || 0)
  const totalMin = Math.floor(totalSec / 60) + 'min' + (totalSec % 60 ? ` ${totalSec % 60}s` : '')

  return (
    <div className="panel-config">

      {/* Workout selector */}
      {workouts && workouts.length > 0 && (
        <div className="workout-selector">
          <label className="form-label" style={{ marginBottom: 6, display: 'block' }}>
            🏋️ Scegli allenamento
          </label>
          <select
            className="music-select"
            style={{ width: '100%', padding: '10px 12px', fontSize: 14, marginBottom: 12 }}
            value={selectedWorkoutId}
            onChange={e => handleWorkoutSelect(e.target.value)}
          >
            <option value="">— Manuale —</option>
            {workouts.map(w => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.sets} serie · {w.exercises} esercizi)
              </option>
            ))}
          </select>

          {selectedWorkoutId && config.exerciseNames?.length > 0 && (
            <div className="workout-ex-preview">
              {config.exerciseNames.map((n, i) => (
                <span key={i} className="ex-tag">{i + 1}. {n}</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Presets */}
      {!loadingPresets && presets.length > 0 && (
        <div className="preset-row">
          {presets.map(p => (
            <button key={p.id} className="preset-chip" onClick={() => loadPreset(p)}>
              {p.name}
              <span className="preset-delete" onClick={(e) => handleDeletePreset(p.id, e)}>×</span>
            </button>
          ))}
        </div>
      )}

      {/* Config grid */}
      <div className="config-grid">
        <NumInput label="⚡ Durata esercizio" value={config.exDur}
          onChange={d => change('exDur', d)} unit="secondi" step={5} />
        <NumInput label="〜 Recupero esercizi" value={config.restDur}
          onChange={d => change('restDur', d)} unit="secondi" step={5} />
        <NumInput label="# Esercizi" value={config.exercises}
          onChange={d => change('exercises', d)} unit="per serie" step={1} />
        <NumInput label="↺ Serie" value={config.sets}
          onChange={d => change('sets', d)} unit="totali" step={1} />
      </div>

      <div className="config-grid" style={{ gridTemplateColumns: '1fr', marginBottom: 10 }}>
        <NumInput label="⏱ Riposo tra serie" value={config.seriesRestDur}
          onChange={d => change('seriesRestDur', d)} unit="secondi" step={5} />
      </div>

      {/* Music + volume */}
      <div className="music-card">
        <label className="music-label">♫ Musica</label>
        <select className="music-select" value={musicStyle} onChange={e => setMusicStyle(e.target.value)}>
          <option value="none">Nessuna</option>
          <option value="ambient">Ambient</option>
          <option value="energetic">Energetica</option>
          <option value="focus">Focus</option>
        </select>
        <div className="vol-row">
          <span className="vol-icon">🔈</span>
          <input type="range" min="0" max="100" value={volume}
            onChange={e => setVolume(Number(e.target.value))} className="vol-slider" />
          <span className="vol-val">{volume}%</span>
        </div>
      </div>

      <div className="summary-row">
        <span className="summary-text">
          {config.sets} serie × {config.exercises} esercizi · ~{totalMin}
        </span>
      </div>

      <button className="save-preset-btn" onClick={handleSavePreset}>+ Salva come preset</button>
      <button className="start-btn" onClick={() => onStart(musicStyle, volume)}>▶ Inizia allenamento</button>
    </div>
  )
}
