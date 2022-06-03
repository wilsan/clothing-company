import { useState, useContext } from 'react';

import {
   signInUserWithEmailAndPassword,
   signInWithGooglePopup,
   createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';

import './sign-in-form.styles.scss';

const defaultFormFields = {
   email: '',
   password: '',
};

function SignInForm() {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { email, password } = formFields;

   const { setCurrentUser } = useContext(UserContext);

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   }

   const handleSubmit = async (event) => {
      event.preventDefault();
      try {
         const { user } = await signInUserWithEmailAndPassword(email, password);
         setCurrentUser(user);
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
      const { user } = await signInWithGooglePopup();
      setCurrentUser(user);
      await createUserDocumentFromAuth(user);
   }

   return (
      <div className="sign-in-container">
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
            <div className='buttons-container'>
               <Button type='submit'>Sign In</Button>
               <Button type='button' buttonType="google" onClick={signInWithGoogle}>Sign in with Google</Button>
            </div>
         </form>
      </div>
   );
}

export default SignInForm;