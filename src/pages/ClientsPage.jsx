import React, { useState, useEffect } from 'react'
import { getClients, createClient, updateClient, deleteClient } from '../firebase/db'
import { getWorkouts } from '../firebase/db'
import { generateUsername, generatePassword, hashPassword } from '../utils/auth'

export default function ClientsPage() {
  const [clients, setClients] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState('list') // list | create | edit | credentials
  const [editing, setEditing] = useState(null)
  const [newCredentials, setNewCredentials] = useState(null)
  const [form, setForm] = useState({ fullName: '', workoutIds: [] })

  const reload = async () => {
    setLoading(true)
    try {
      const [c, w] = await Promise.all([getClients(), getWorkouts()])
      setClients(c)
      setWorkouts(w)
    } catch (e) {}
    setLoading(false)
  }

  useEffect(() => { reload() }, [])

  const handleCreate = async () => {
    if (!form.fullName.trim()) { alert('Inserisci nome e cognome'); return }
    const username = generateUsername(form.fullName)
    const password = generatePassword()
    const passwordHash = await hashPassword(password)
    try {
        await createClient({
            fullName: form.fullName.trim(),
            username,
            passwordHash,
            password, // ← aggiungi questa
            workoutIds: form.workoutIds,
          })
      setNewCredentials({ fullName: form.fullName.trim(), username, password })
      setForm({ fullName: '', workoutIds: [] })
      setView('credentials')
      await reload()
    } catch (e) { alert('Errore creazione cliente') }
  }

  const handleUpdateWorkouts = async () => {
    try {
      await updateClient(editing.id, { workoutIds: editing.workoutIds || [] })
      setView('list')
      setEditing(null)
      await reload()
    } catch (e) { alert('Errore aggiornamento') }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Eliminare questo cliente?')) return
    try { await deleteClient(id); await reload() } catch (e) {}
  }

  const toggleWorkout = (id, current, setter) => {
    setter(prev => ({
      ...prev,
      workoutIds: prev.workoutIds.includes(id)
        ? prev.workoutIds.filter(w => w !== id)
        : [...prev.workoutIds, id]
    }))
  }

  // ── SCHERMATA CREDENZIALI ──
  if (view === 'credentials' && newCredentials) return (
    <div>
      <div className="credentials-box">
        <div className="credentials-title">✅ Cliente creato!</div>
        <div className="credentials-subtitle">Comunica queste credenziali al cliente:</div>
        <div className="credentials-row">
          <span className="credentials-label">Nome</span>
          <span className="credentials-value">{newCredentials.fullName}</span>
        </div>
        <div className="credentials-row">
          <span className="credentials-label">Username</span>
          <span className="credentials-value credentials-mono">{newCredentials.username}</span>
        </div>
        <div className="credentials-row">
          <span className="credentials-label">Password</span>
          <span className="credentials-value credentials-mono">{newCredentials.password}</span>
        </div>
        <div className="credentials-warning">
          ⚠️ Salva la password ora — non sarà più visibile
        </div>
        <button className="start-btn" onClick={() => { setNewCredentials(null); setView('list') }}>
          Ho salvato le credenziali
        </button>
      </div>
    </div>
  )

  // ── FORM CREA ──
  if (view === 'create') return (
    <div>
      <div className="page-header">
        <button className="back-btn" onClick={() => setView('list')}>← Lista</button>
        <span className="page-title">Nuovo cliente</span>
      </div>
      <div className="form-field">
        <label className="form-label">Nome e cognome</label>
        <input
          className="form-input"
          placeholder="es. Ivan De Mitri"
          value={form.fullName}
          onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
        />
        {form.fullName && (
          <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 4 }}>
            Username: <span style={{ color: 'var(--green)', fontFamily: 'monospace' }}>
              {generateUsername(form.fullName)}
            </span>
          </div>
        )}
      </div>

      <div className="form-section-title">Allenamenti assegnati</div>
      {workouts.length === 0 && (
        <div style={{ fontSize: 13, color: 'var(--text3)' }}>Nessun allenamento disponibile</div>
      )}
      {workouts.map(w => (
        <label key={w.id} className="workout-check-row">
          <input
            type="checkbox"
            checked={form.workoutIds.includes(w.id)}
            onChange={() => toggleWorkout(w.id, form, setForm)}
          />
          <span>{w.name}</span>
          <span style={{ fontSize: 12, color: 'var(--text3)' }}>
            {w.sets} serie · {w.exercises} esercizi
          </span>
        </label>
      ))}

      <div className="form-actions" style={{ marginTop: '1.5rem' }}>
        <button className="ctrl-btn" onClick={() => setView('list')}>Annulla</button>
        <button className="start-btn" style={{ flex: 2 }} onClick={handleCreate}>
          Crea cliente
        </button>
      </div>
    </div>
  )

  // ── FORM MODIFICA ALLENAMENTI ──
  if (view === 'edit' && editing) return (
    <div>
      <div className="page-header">
        <button className="back-btn" onClick={() => { setView('list'); setEditing(null) }}>← Lista</button>
        <span className="page-title">{editing.fullName}</span>
      </div>
      <div className="form-section-title">Allenamenti assegnati</div>
      {workouts.map(w => (
        <label key={w.id} className="workout-check-row">
          <input
            type="checkbox"
            checked={(editing.workoutIds || []).includes(w.id)}
            onChange={() => setEditing(prev => ({
              ...prev,
              workoutIds: prev.workoutIds?.includes(w.id)
                ? prev.workoutIds.filter(id => id !== w.id)
                : [...(prev.workoutIds || []), w.id]
            }))}
          />
          <span>{w.name}</span>
          <span style={{ fontSize: 12, color: 'var(--text3)' }}>
            {w.sets} serie · {w.exercises} esercizi
          </span>
        </label>
      ))}
      <div className="form-actions" style={{ marginTop: '1.5rem' }}>
        <button className="ctrl-btn" onClick={() => { setView('list'); setEditing(null) }}>Annulla</button>
        <button className="start-btn" style={{ flex: 2 }} onClick={handleUpdateWorkouts}>
          Salva
        </button>
      </div>
    </div>
  )


  const handleResetPassword = async (id, fullName) => {
    if (!window.confirm(`Generare una nuova password per ${fullName}?`)) return
    const password = generatePassword()
    const passwordHash = await hashPassword(password)
    try {
      await updateClient(id, { passwordHash, password })
      alert(`Nuova password per ${fullName}:\n\n${password}\n\nComunicala al cliente.`)
    } catch (e) {
      alert('Errore aggiornamento password')
    }
  }
  // ── LISTA ──
  return (
    <div>
      <button className="start-btn" style={{ marginBottom: '1rem' }} onClick={() => setView('create')}>
        + Nuovo cliente
      </button>
      {loading && <div className="empty-state">Caricamento...</div>}
      {!loading && clients.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          Nessun cliente ancora.
        </div>
      )}
      <div className="workout-list">
        {clients.map(c => (
          <div key={c.id} className="workout-item">
            <div className="workout-item-info">
              <div className="workout-item-name">{c.fullName}</div>
              <div className="workout-item-meta credentials-mono">{c.username}</div>
              <div className="workout-item-exs">
                {(c.workoutIds || []).length} allenamenti assegnati
              </div>
              <div className="workout-item-meta credentials-mono" style={{ color: 'var(--text)', fontSize: 14 }}>
  🔑 {c.password || '—'}
</div>
            </div>
            <div className="workout-item-actions">
              <button className="icon-btn" onClick={() => { setEditing({ ...c }); setView('edit') }}>✏️</button>
              <button className="icon-btn" onClick={() => handleResetPassword(c.id, c.fullName)} title="Reset password">🔑</button>
              <button className="icon-btn danger" onClick={() => handleDelete(c.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}