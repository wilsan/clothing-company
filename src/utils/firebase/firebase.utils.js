import { initializeApp } from "firebase/app";
import {
   getAuth,
   signInWithRedirect,
   signInWithPopup,
   GoogleAuthProvider
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
   prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
   const userDocRef = doc(db, 'users', userAuth.uid);
   const userSnapshot = await getDoc(userDocRef);

   if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
         });
      } catch (err) {
         console.log('error creating the user', err.message);
      }
   }

   return userDocRef;
}