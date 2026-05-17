import React, { useState, useEffect } from 'react'
import { getHistory, deleteSession } from '../firebase/db'

export default function HistoryPanel({ refreshKey }) {
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getHistory()
      .then(setSessions)
      .catch(() => setSessions([]))
      .finally(() => setLoading(false))
  }, [refreshKey])

  const handleDelete = async (id) => {
    try {
      await deleteSession(id)
      setSessions(prev => prev.filter(s => s.id !== id))
    } catch (e) {}
  }

  const formatDate = (ts) => {
    if (!ts) return '—'
    const d = ts.toDate ? ts.toDate() : new Date(ts)
    return d.toLocaleDateString('it-IT', {
      day: '2-digit', month: 'short',
      hour: '2-digit', minute: '2-digit'
    })
  }

  if (loading) return <div className="empty-state">Caricamento...</div>

  if (!sessions.length) return (
    <div className="empty-state">
      <div className="empty-icon">📋</div>
      Nessuna sessione ancora.<br />Completa il tuo primo allenamento!
    </div>
  )

  return (
    <div className="history-list">
      {sessions.map(s => (
        <div key={s.id} className="history-item">
          <div className="history-icon">⚡</div>
          <div className="history-info">
            <div className="history-name">
              {s.sets} serie × {s.exercises} esercizi
            </div>
            <div className="history-meta">
              {s.exDur}s esercizio · {s.restDur}s recupero · {s.totalMin}
            </div>
          </div>
          <div className="history-right">
            <div className="history-time">{formatDate(s.completedAt)}</div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(s.id)}
              title="Elimina"
            >×</button>
          </div>
        </div>
      ))}
    </div>
  )
}
