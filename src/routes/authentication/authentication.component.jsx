import { useSelector } from 'react-redux';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import Spinner from '../../components/spinner/spinner.component';

import { selectUserAuthStatus } from '../../store/user/user.selector';

import './authentication.styles.jsx';
import { AuthenticationContainer } from './authentication.styles.jsx';

function Authentication() {
   const userAuthStatus = useSelector(selectUserAuthStatus);

   return (
      <AuthenticationContainer>
         {userAuthStatus === 'loading' && <Spinner />}
         <SignInForm />
         <SignUpForm />
      </AuthenticationContainer>
   );
}

export default Authentication;
