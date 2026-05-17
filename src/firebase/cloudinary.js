const CLOUD_NAME = 'dhnkqfacc'
const UPLOAD_PRESET = 'workout_exercises' // unsigned preset da creare su Cloudinary

export async function uploadImage(file) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', 'workout_exercises')

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) throw new Error('Upload fallito')
  const data = await res.json()
  return data.secure_url
}
