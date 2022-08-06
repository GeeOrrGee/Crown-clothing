import { Fragment } from 'react';
import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User.Context';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import {
    NavigationContainer,
    NavLink,
    NavLinksContainer,
    LogoContainer,
} from './navigation.styles.jsx';
import Cart from '../../components/Cart/Cart.component';
import CartDropdown from '../../components/Cart-Dropdown/Cart-Dropdown.component';
import { CartContext } from '../../contexts/Cart.context';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/user/user.selecter';
const Navigation = () => {
    const currentUser = useSelector(selectUser);
    const { isCartOpen } = useContext(CartContext);
    const signOutHandler = async () => {
        await signOutUser();
    };
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
