import { useState } from 'react';
import { useDispatch } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.jsx';
import { SignUpContainer } from './sign-up-form.styles.jsx';

import { signUp } from '../../store/user/user.thunk';

const defaultFormFields = {
   displayName: '',
   email: '',
   password: '',
   confirmPassword: '',
};

function SignUpForm() {
   const [formFields, setFormFields] = useState(defaultFormFields);
   const { displayName, email, password, confirmPassword } = formFields;
   const dispatch = useDispatch();

   const resetFormFields = () => {
      setFormFields(defaultFormFields);
   }

   const handleSubmit = (event) => {
      event.preventDefault();
      if (password !== confirmPassword) {
         alert('Passwords do not match!');
         return;
      }
      dispatch(signUp({ email, password, displayName }));
      resetFormFields();
   }

   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormFields({ ...formFields, [name]: value });
   };

   return (
      <SignUpContainer>
         <h2>Do not have an account?</h2>
         <span>Sign up with your email and password</span>
         <form action="" onSubmit={handleSubmit}>
            <FormInput
               label="Display Name"
               type="text"
               required
               onChange={handleChange}
               name="displayName"
               value={displayName}
            />
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
            <FormInput
               label="Confirm Password"
               type="password"
               required
               onChange={handleChange}
               name="confirmPassword"
               value={confirmPassword}
            />
            <Button type='submit'>Sign Up</Button>
         </form>
      </SignUpContainer>
   );
}

export default SignUpForm;