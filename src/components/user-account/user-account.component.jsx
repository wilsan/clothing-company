import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../../store/user/user.selector';

import { UserAccountContainer, UserIcon } from './user-account.styles';

function UserAccount() {
   const currentUser = useSelector(selectCurrentUser);

   return (
      <UserAccountContainer>
         <UserIcon />
         <span>{currentUser.displayName}</span>
      </UserAccountContainer>
   );
}

export default UserAccount;
