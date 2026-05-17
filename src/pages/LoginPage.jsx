import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'
import { getClientByUsername } from '../firebase/db'
import { verifyPassword } from '../utils/auth'

export default function LoginPage({ onClientLogin }) {
  const [mode, setMode] = useState('pt') // pt | client
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [clientPassword, setClientPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePTLogin = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      setError('Email o password errati.')
    } finally { setLoading(false) }
  }

  const handleClientLogin = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      const client = await getClientByUsername(username.trim().toLowerCase())
      if (!client) { setError('Username non trovato.'); setLoading(false); return }
      const valid = await verifyPassword(clientPassword, client.passwordHash)
      if (!valid) { setError('Password errata.'); setLoading(false); return }
      onClientLogin(client)
    } catch (err) {
      setError('Errore di connessione.')
    } finally { setLoading(false) }
  }

  return (
    <div className="login-wrap">
      <div className="login-box">
        <div className="login-logo">W</div>
        <div className="login-title">workout</div>

        <div className="login-mode-switch">
          <button
            className={`login-mode-btn ${mode === 'pt' ? 'active' : ''}`}
            onClick={() => { setMode('pt'); setError('') }}
          >PT</button>
          <button
            className={`login-mode-btn ${mode === 'client' ? 'active' : ''}`}
            onClick={() => { setMode('client'); setError('') }}
          >Cliente</button>
        </div>

        {mode === 'pt' ? (
          <form className="login-form" onSubmit={handlePTLogin}>
            <div className="form-field">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="la tua email"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="form-field">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <div className="login-error">{error}</div>}
            <button className="start-btn" type="submit" disabled={loading}>
              {loading ? 'Accesso...' : 'Accedi come PT'}
            </button>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleClientLogin}>
            <div className="form-field">
              <label className="form-label">Username</label>
              <input className="form-input" type="text" placeholder="es. ivan.demitri"
                value={username} onChange={e => setUsername(e.target.value)} required />
            </div>
            <div className="form-field">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="••••••••"
                value={clientPassword} onChange={e => setClientPassword(e.target.value)} required />
            </div>
            {error && <div className="login-error">{error}</div>}
            <button className="start-btn" type="submit" disabled={loading}>
              {loading ? 'Accesso...' : 'Accedi'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}