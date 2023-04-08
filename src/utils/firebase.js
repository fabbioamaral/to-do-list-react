import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// FILL OUT THE CONFIG BELOW WITH YOUR REAL DATA

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
