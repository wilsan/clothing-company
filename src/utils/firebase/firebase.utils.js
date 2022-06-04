import { initializeApp } from "firebase/app";
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged
} from "firebase/auth";
import {
   getFirestore,
   doc,
   getDoc,
   setDoc
} from "firebase/firestore";

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

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
   prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
   if (!userAuth) return;

   const userDocRef = doc(db, 'users', userAuth.uid);
   const userSnapshot = await getDoc(userDocRef);

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
         });
      } catch (err) {
         console.log('error creating the user', err.message);
      }
   }

   return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);