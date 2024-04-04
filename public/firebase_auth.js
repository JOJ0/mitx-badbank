// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

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
// export const createFirebaseUser = createUserWithEmailAndPassword;
export default app;