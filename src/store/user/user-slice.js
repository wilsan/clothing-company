import { createSlice } from "@reduxjs/toolkit";

import {
   getCurrentUserSnapshot,
   signInWithEmail,
   signInWithGoogle,
   signUp,
   signOut
} from './user.thunk';

const initialState = {
   currentUser: null,
   status: 'idle'
};

export const userSlice = createSlice({
   name: 'user',
   initialState,

   // reducers: {
   //    setCurrentUser: (state, action) => {
   //       state.currentUser = action.payload;
   //    }
   // },

   extraReducers: (builder) => {
      builder
         // Snapshot of already signed in user
         .addCase(getCurrentUserSnapshot.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(getCurrentUserSnapshot.fulfilled, (state, action) => {
            state.status = 'idle';
            state.currentUser = action.payload;
         })
         .addCase(getCurrentUserSnapshot.rejected, (state) => {
            state.status = 'idle';
         })
         // Sign in with Google
         .addCase(signInWithGoogle.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.status = 'idle';
            state.currentUser = action.payload;
         })
         .addCase(signInWithGoogle.rejected, (state) => {
            state.status = 'idle';
         })
         // Sign in with email and password
         .addCase(signInWithEmail.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(signInWithEmail.fulfilled, (state, action) => {
            state.status = 'idle';
            state.currentUser = action.payload;
         })
         .addCase(signInWithEmail.rejected, (state, action) => {
            state.status = 'idle';
            const err = action.payload;
            switch (err.code) {
               case 'auth/user-not-found':
                  alert('User not found!');
                  break;
               case 'auth/wrong-password':
                  alert('Incorrect password!');
                  break;
               default:
                  console.log(err);
            };
         })
         // Sign up
         .addCase(signUp.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(signUp.fulfilled, (state, action) => {
            state.status = 'idle';
            state.currentUser = action.payload;
         })
         .addCase(signUp.rejected, (state, action) => {
            state.status = 'idle';
            const err = action.payload;
            switch (err.code) {
               case 'auth/email-already-in-use':
                  alert('Cannot create user. Email already in use!');
                  break;
               default:
                  console.log(err);
            };
         })
         // Sign out
         .addCase(signOut.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(signOut.fulfilled, (state) => {
            state.status = 'idle';
            state.currentUser = null;
         });
   }
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
