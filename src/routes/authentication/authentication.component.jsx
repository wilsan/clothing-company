import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import './authentication.styles.jsx';
import { AuthenticationContainer } from './authentication.styles.jsx';

function Authentication() {
   return (
      <AuthenticationContainer>
         <SignInForm />
         <SignUpForm />
      </AuthenticationContainer>
   );
}

export default Authentication;
