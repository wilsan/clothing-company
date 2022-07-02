import { Outlet } from 'react-router-dom';
import { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

import './navigation.styles.jsx';
import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './navigation.styles.jsx';

import { signOut } from '../../store/user/user.thunk';

function Navigation() {
   const currentUser = useSelector(selectCurrentUser);
   const isCartOpen = useSelector(selectIsCartOpen);
   const dispatch = useDispatch();

   const handleSignOut = () => {
      dispatch(signOut());
   }

   return (
      <Fragment>
         <NavigationContainer>
            <LogoContainer to='/'>
               <CrownLogo className='logo' />
            </LogoContainer>

            <NavLinks>
               <NavLink to='/shop'>SHOP</NavLink>
               {currentUser ? (
                  <NavLink as='span' onClick={handleSignOut}>SIGN OUT</NavLink>
               ) : (
                  <NavLink to='/auth'>SIGN IN</NavLink>
               )}
               <CartIcon />
            </NavLinks>

            {isCartOpen && <CartDropdown />}
         </NavigationContainer>
         <Outlet />
      </Fragment>
   );
}

export default Navigation;
