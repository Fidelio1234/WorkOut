import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAqqlsS9BSFkCfG6--gsMj9HuqYlUdkmZc",
  authDomain: "workout-ac939.firebaseapp.com",
  projectId: "workout-ac939",
  storageBucket: "workout-ac939.firebasestorage.app",
  messagingSenderId: "34732146648",
  appId: "1:34732146648:web:ecd2ab68b4b86665fcbcad"
}
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
