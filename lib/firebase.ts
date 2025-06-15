// src/lib/firebase.ts
import { app } from './firebase-core'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getFunctions } from 'firebase/functions'

export const auth = getAuth(app)
export const db = getFirestore(app)
export const functions = getFunctions(app)
