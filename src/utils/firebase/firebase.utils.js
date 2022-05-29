import { initializeApp } from "firebase/app";
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyD3bXXhlfni-tSTEvsyQhayZYIt_hUmqU0",
   authDomain: "clothing-company-db-d5bc2.firebaseapp.com",
   projectId: "clothing-company-db-d5bc2",
   storageBucket: "clothing-company-db-d5bc2.appspot.com",
   messagingSenderId: "286565051664",
   appId: "1:286565051664:web:f8d74dd4b008f41d340995"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
   prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);