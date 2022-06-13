import { useState } from 'react';

import {
   signInUserWithEmailAndPassword,
   signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE } from '../button/button.component';

import './sign-in-form.styles.jsx';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

const defaultFormFields = {
   email: '',
   password: '',
};

function SignInForm() {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { email, password } = formFields;

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   }

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         await signInUserWithEmailAndPassword(email, password);
         resetFormFields();
      } catch (err) {
         switch (err.code) {
            case 'auth/user-not-found':
               alert('User not found!');
               break;
            case 'auth/wrong-password':
               alert('Incorrect password!');
               break;
            default:
               console.log(err);
         }
      }
   }

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
   };

   async function signInWithGoogle() {
      await signInWithGooglePopup();
   }

   return (
      <SignInContainer>
         <h2>Already have an account?</h2>
         <span>Sign in with your email and password</span>
         <form action="" onSubmit={handleSubmit}>
            <FormInput
               label="Email"
               type="email"
               required
               onChange={handleChange}
               name="email"
               value={email}
            />
            <FormInput
               label="Password"
               type="password"
               required
               onChange={handleChange}
               name="password"
               value={password}
            />
            <ButtonsContainer>
               <Button type='submit'>Sign In</Button>
               <Button type='button' buttonType={BUTTON_TYPE.google} onClick={signInWithGoogle}>Sign in with Google</Button>
            </ButtonsContainer>
         </form>
      </SignInContainer>
   );
}

export default SignInForm;