import {
  collection, addDoc, getDocs, deleteDoc,
  doc, query, orderBy, serverTimestamp, updateDoc, where
} from 'firebase/firestore'
import { db } from './config'

// ── PRESETS ──────────────────────────────────────────────
export async function getPresets() {
  const q = query(collection(db, 'presets'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export async function savePreset(preset) {
  return addDoc(collection(db, 'presets'), { ...preset, createdAt: serverTimestamp() })
}
export async function deletePreset(id) {
  return deleteDoc(doc(db, 'presets', id))
}

// ── WORKOUTS ─────────────────────────────────────────────
export async function getWorkouts() {
  const q = query(collection(db, 'workouts'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export async function saveWorkout(workout) {
  return addDoc(collection(db, 'workouts'), { ...workout, createdAt: serverTimestamp() })
}
export async function updateWorkout(id, workout) {
  return updateDoc(doc(db, 'workouts', id), workout)
}
export async function deleteWorkout(id) {
  return deleteDoc(doc(db, 'workouts', id))
}

// ── HISTORY ──────────────────────────────────────────────
export async function getHistory() {
  const q = query(collection(db, 'history'), orderBy('completedAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
export async function saveSession(session) {
  return addDoc(collection(db, 'history'), { ...session, completedAt: serverTimestamp() })
}
export async function deleteSession(id) {
  return deleteDoc(doc(db, 'history', id))
}


// ── CLIENTS ──────────────────────────────────────────────
export async function getClients() {
  const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createClient(client) {
  return addDoc(collection(db, 'clients'), { ...client, createdAt: serverTimestamp() })
}

export async function updateClient(id, data) {
  return updateDoc(doc(db, 'clients', id), data)
}

export async function deleteClient(id) {
  return deleteDoc(doc(db, 'clients', id))
}

export async function getClientByUsername(username) {
  const q = query(collection(db, 'clients'), where('username', '==', username))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return { id: snap.docs[0].id, ...snap.docs[0].data() }
}

export async function getClientSessions(clientId) {
  const q = query(
    collection(db, 'clientSessions'),
    where('clientId', '==', clientId),
    orderBy('completedAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function saveClientSession(session) {
  return addDoc(collection(db, 'clientSessions'), { ...session, completedAt: serverTimestamp() })
}