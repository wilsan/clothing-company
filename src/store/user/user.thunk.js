import { createAsyncThunk } from "@reduxjs/toolkit";

import {
   getCurrentUser,
   createUserDocumentFromAuth,
   signInWithGooglePopup,
   signInUserWithEmailAndPassword,
   createAuthUserWithEmailAndPassword,
   signOutUser
} from "../../utils/firebase/firebase.utils";


export const getCurrentUserSnapshot = createAsyncThunk(
   'user/getCurrentUserSnapshot',
   async () => {
      const userAuth = await getCurrentUser();
      if (!userAuth) return null;
      const userSnapshot = await createUserDocumentFromAuth(userAuth);
      return { id: userSnapshot.id, ...userSnapshot.data() };
   }
);

export const signInWithGoogle = createAsyncThunk(
   'user/signInWithGoogle',
   async () => {
      const { user } = await signInWithGooglePopup();
      const userSnapshot = await createUserDocumentFromAuth(user);
      return { id: userSnapshot.id, ...userSnapshot.data() };
   }
);

export const signInWithEmail = createAsyncThunk(
   'user/signInWithEmail',
   async ({ email, password }, thunkAPI) => {
      try {
         const { user } = await signInUserWithEmailAndPassword(email, password);
         const userSnapshot = await createUserDocumentFromAuth(user);
         return { id: userSnapshot.id, ...userSnapshot.data() };
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      };
   }
);

export const signUp = createAsyncThunk(
   'user/signUp',
   async ({ email, password, displayName }, thunkAPI) => {
      try {
         const { user } = await createAuthUserWithEmailAndPassword(email, password, displayName);
         const userSnapshot = await createUserDocumentFromAuth(user, { displayName });
         return { id: userSnapshot.id, ...userSnapshot.data() };
      } catch (error) {
         return thunkAPI.rejectWithValue(error);
      };      
   }
);

export const signOut = createAsyncThunk(
   'user/signOut',
   async () => {
      await signOutUser();
   }
);
