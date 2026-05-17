// Genera username da nome e cognome: "Ivan De Mitri" → "ivan.demitri"
export function generateUsername(fullName) {
    return fullName
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '.')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
  }
  
  // Genera password alfanumerica casuale di 10 caratteri
  export function generatePassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    return Array.from({ length: 10 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
  }
  
  // Hash semplice per la password (non usare per dati sensibili critici)
  export async function hashPassword(password) {
    const encoder = new TextEncoder()
    const data = encoder.encode(password + 'workout_salt_2026')
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }
  
  export async function verifyPassword(password, hash) {
    const computed = await hashPassword(password)
    return computed === hash
  }