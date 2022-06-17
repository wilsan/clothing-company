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
   setDoc,
   collection,
   writeBatch,
   query,
   getDocs
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

// Create a collection of all the products in the database
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
   const collectionRef = collection(db, collectionKey);
   const batch = writeBatch(db);

   objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object);
   });

   await batch.commit();
   console.log('done');
};

// Get all the products from the database
export const getCategoriesAndDocuments = async () => {
   const collectionRef = collection(db, 'categories');
   const querySnapshot = await getDocs(collectionRef);
   const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
   }, {});

   return categoryMap;
};

// Create a new user document, if it does not exist, from the authenticated user's details
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
};

// Create a new user using email and password from the sign-up form
export const createAuthUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign-in a user using email and password
export const signInUserWithEmailAndPassword = async (email, password) => {
   if (!email || !password) return;

   return await signInWithEmailAndPassword(auth, email, password);
};

// Sign-out a user
export const signOutUser = async () => await signOut(auth);

// Add an observer for changes to the user's sign-in state
export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);
