import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDlcCzk9JVa-C5u3t_Wo9YQygPcScNlpkY",
    authDomain: "mitx-mern-auth.firebaseapp.com",
    projectId: "mitx-mern-auth",
    storageBucket: "mitx-mern-auth.appspot.com",
    messagingSenderId: "914876378547",
    appId: "1:914876378547:web:fa532fc2b6f4ea0d946fc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log("Initialized Firebase app:", app)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
console.log("Initialized Firebase auth:", auth)

export default app;