import React, { useState, useEffect } from 'react'
import { getWorkouts, saveWorkout, updateWorkout, deleteWorkout } from '../firebase/db'
import { uploadImage } from '../firebase/cloudinary'

const DEFAULT_FORM = {
  name: '',
  exDur: 30,
  restDur: 15,
  seriesRestDur: 60,
  sets: 3,
  exerciseList: [{ name: '', imageUrl: '' }],
}

const LIMITS = {
  exDur:        [5,  300, 5],
  restDur:      [0,  120, 5],
  seriesRestDur:[0,  300, 5],
  sets:         [1,  20,  1],
}

function NumRow({ label, value, onChange, unit, step }) {
  return (
    <div className="form-num-row">
      <span className="form-num-label">{label}</span>
      <div className="form-num-ctrl">
        <button className="num-btn" onClick={() => onChange(-step)}>−</button>
        <span className="num-val" style={{ fontSize: 18 }}>{value}</span>
        <button className="num-btn" onClick={() => onChange(step)}>+</button>
        <span className="num-unit">{unit}</span>
      </div>
    </div>
  )
}

function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const url = await uploadImage(file)
      onChange(url)
    } catch (err) {
      setError('Errore upload. Riprova.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="image-uploader">
      {value ? (
        <div className="image-preview-wrap">
          <img src={value} alt="esercizio" className="image-preview" />
          <button className="image-remove" onClick={() => onChange('')}>×</button>
        </div>
      ) : (
        <label className="image-upload-btn">
          {uploading ? '⏳ Caricamento...' : '📷 Aggiungi foto'}
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ display: 'none' }}
            disabled={uploading}
          />
        </label>
      )}
      {error && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{error}</div>}
    </div>
  )
}

function WorkoutForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial || DEFAULT_FORM)

  const changeNum = (key, delta) => {
    const [mn, mx] = LIMITS[key]
    setForm(f => ({ ...f, [key]: Math.max(mn, Math.min(mx, f[key] + delta)) }))
  }

  const changeEx = (i, field, val) => {
    setForm(f => {
      const list = [...f.exerciseList]
      list[i] = { ...list[i], [field]: val }
      return { ...f, exerciseList: list }
    })
  }

  const addEx = () => setForm(f => ({ ...f, exerciseList: [...f.exerciseList, { name: '', imageUrl: '' }] }))

  const removeEx = (i) => setForm(f => ({
    ...f,
    exerciseList: f.exerciseList.filter((_, idx) => idx !== i)
  }))

  const handleSave = () => {
    if (!form.name.trim()) { alert("Inserisci un nome per l'allenamento"); return }
    const cleaned = { ...form, exerciseList: form.exerciseList.filter(e => e.name.trim()) }
    if (cleaned.exerciseList.length === 0) { alert('Inserisci almeno un esercizio'); return }
    onSave(cleaned)
  }

  return (
    <div className="workout-form">
      <div className="form-field">
        <label className="form-label">Nome allenamento</label>
        <input
          className="form-input"
          placeholder="es. Gambe, HIIT, Upper body..."
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
        />
      </div>

      <div className="form-section-title">Parametri</div>
      <NumRow label="Durata esercizio" value={form.exDur} onChange={d => changeNum('exDur', d)} unit="sec" step={5} />
      <NumRow label="Recupero esercizi" value={form.restDur} onChange={d => changeNum('restDur', d)} unit="sec" step={5} />
      <NumRow label="Riposo tra serie" value={form.seriesRestDur} onChange={d => changeNum('seriesRestDur', d)} unit="sec" step={5} />
      <NumRow label="Serie" value={form.sets} onChange={d => changeNum('sets', d)} unit="totali" step={1} />

      <div className="form-section-title" style={{ marginTop: '1.25rem' }}>
        Esercizi <span style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 400, marginLeft: 8 }}>({form.exerciseList.length})</span>
      </div>

      {form.exerciseList.map((ex, i) => (
        <div key={i} className="ex-row-full">
          <div className="ex-row-top">
            <span className="ex-num">{i + 1}</span>
            <input
              className="form-input"
              style={{ flex: 1 }}
              placeholder={`Esercizio ${i + 1}`}
              value={ex.name}
              onChange={e => changeEx(i, 'name', e.target.value)}
            />
            {form.exerciseList.length > 1 && (
              <button className="ex-remove" onClick={() => removeEx(i)}>×</button>
            )}
          </div>
          <div style={{ marginLeft: 26 }}>
            <ImageUploader
              value={ex.imageUrl}
              onChange={val => changeEx(i, 'imageUrl', val)}
            />
          </div>
        </div>
      ))}

      <button className="add-ex-btn" onClick={addEx}>+ Aggiungi esercizio</button>

      <div className="form-actions">
        <button className="ctrl-btn" onClick={onCancel}>Annulla</button>
        <button className="start-btn" style={{ flex: 2 }} onClick={handleSave}>Salva allenamento</button>
      </div>
    </div>
  )
}



function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-message">{message}</div>
        <div className="modal-actions">
          <button className="ctrl-btn" onClick={onCancel}>Annulla</button>
          <button className="ctrl-btn danger" onClick={onConfirm}>Elimina</button>
        </div>
      </div>
    </div>
  )
}




export default function WorkoutsPage({ onWorkoutsChange }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list')
  const [editing, setEditing] = useState(null)

  const reload = async () => {
    setLoading(true)
    try {
      const data = await getWorkouts()
      setWorkouts(data)
      onWorkoutsChange?.(data)
    } catch (e) { setWorkouts([]) }
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  const toFirestore = (form) => ({
    name: form.name,
    exDur: form.exDur,
    restDur: form.restDur,
    seriesRestDur: form.seriesRestDur,
    sets: form.sets,
    exercises: form.exerciseList.length,
    exerciseNames: form.exerciseList.map(e => e.name),
    exerciseImages: form.exerciseList.map(e => e.imageUrl || ''),
  })

  const handleSaveNew = async (form) => {
    try {
      await saveWorkout(toFirestore(form))
      await reload(); setView('list')
    } catch (e) { alert('Errore salvataggio. Controlla Firebase.') }
  }

  const handleSaveEdit = async (form) => {
    try {
      await updateWorkout(editing.id, toFirestore(form))
      await reload(); setView('list'); setEditing(null)
    } catch (e) { alert('Errore modifica. Controlla Firebase.') }
  }

  const [confirmDelete, setConfirmDelete] = useState(null)

  const handleDelete = async () => {
    try {
      await deleteWorkout(confirmDelete.id)
      setConfirmDelete(null)
      await reload()
    } catch (e) {}
  }


  const toForm = (w) => ({
    name: w.name,
    exDur: w.exDur,
    restDur: w.restDur,
    seriesRestDur: w.seriesRestDur ?? 60,
    sets: w.sets,
    exerciseList: (w.exerciseNames || []).map((n, i) => ({
      name: n,
      imageUrl: (w.exerciseImages || [])[i] || ''
    }))
  })

  if (view === 'create') return (
    <div>
      <div className="page-header">
        <button className="back-btn" onClick={() => setView('list')}>← Lista</button>
        <span className="page-title">Nuovo allenamento</span>
      </div>
      <WorkoutForm onSave={handleSaveNew} onCancel={() => setView('list')} />
    </div>
  )

  if (view === 'edit') return (
    <div>
      <div className="page-header">
        <button className="back-btn" onClick={() => { setView('list'); setEditing(null) }}>← Lista</button>
        <span className="page-title">Modifica</span>
      </div>
      <WorkoutForm initial={toForm(editing)} onSave={handleSaveEdit} onCancel={() => { setView('list'); setEditing(null) }} />
    </div>
  )

  return (
    <div>
      <button className="start-btn" style={{ marginBottom: '1rem' }} onClick={() => setView('create')}>
        + Crea allenamento
      </button>
      {loading && <div className="empty-state">Caricamento...</div>}
      {!loading && workouts.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏋️</div>
          Nessun allenamento ancora.<br />Creane uno per iniziare!
        </div>
      )}
      <div className="workout-list">
        {workouts.map(w => (
          <div key={w.id} className="workout-item">
            {(w.exerciseImages?.[0]) && (
              <img src={w.exerciseImages[0]} alt={w.name} className="workout-item-thumb" />
            )}
            <div className="workout-item-info">
              <div className="workout-item-name">{w.name}</div>
              <div className="workout-item-meta">{w.sets} serie · {w.exercises} esercizi · {w.exDur}s/{w.restDur}s</div>
              <div className="workout-item-exs">{(w.exerciseNames || []).join(' · ')}</div>
            </div>
            <div className="workout-item-actions">
              <button className="icon-btn" onClick={() => { setEditing(w); setView('edit') }}>✏️</button>
             <button className="icon-btn danger" onClick={() => setConfirmDelete({ id: w.id, label: w.name })}>🗑</button>
            </div>
          </div>
        ))}
      </div>
      {confirmDelete && (
  <ConfirmModal
    message={`Eliminare "${confirmDelete.label}"?`}
    onConfirm={handleDelete}
    onCancel={() => setConfirmDelete(null)}
  />
)}
    </div>
  )
}
