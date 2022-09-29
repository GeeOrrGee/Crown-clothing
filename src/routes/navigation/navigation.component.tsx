import { Fragment } from 'react';

import { Outlet } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import {
    NavigationContainer,
    NavLink,
    NavLinksContainer,
    LogoContainer,
} from './navigation.styles.jsx';
import Cart from '../../components/Cart/Cart.component';
import CartDropdown from '../../components/Cart-Dropdown/Cart-Dropdown.component';

import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selecter';
import { selectIsCartsOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user-action';
const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectUser);

    const isCartOpen = useSelector(selectIsCartsOpen);
    const signOutHandler = () => dispatch(signOutStart());
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className='logo' />
                </LogoContainer>
                <NavLinksContainer>
                    <NavLink to='/shop'>SHOP</NavLink>
                    <NavLink to='/auth' onClick={signOutHandler}>
                        {currentUser ? (
                            <span className='nav-link'>SIGN OUT</span>
                        ) : (
                            <span className='nav-link'>SIGN IN</span>
                        )}
                    </NavLink>
                    <Cart />
                    {isCartOpen && <CartDropdown />}
                </NavLinksContainer>
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
