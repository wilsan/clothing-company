import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE } from '../button/button.component';

import './sign-in-form.styles.jsx';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles.jsx';

import { signInWithGoogle, signInWithEmail } from '../../store/user/user.thunk';

const defaultFormFields = {
   email: '',
   password: '',
};

function SignInForm() {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { email, password } = formFields;
   const dispatch = useDispatch();

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(signInWithEmail({ email, password }));
      resetFormFields();
   }

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
   };

   const handleSignInWithGoogle = () => {
      dispatch(signInWithGoogle());
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
               <Button type='button' buttonType={BUTTON_TYPE.google} onClick={handleSignInWithGoogle}>Sign in with Google</Button>
            </ButtonsContainer>
         </form>
      </SignInContainer>
   );
}

export default SignInForm;