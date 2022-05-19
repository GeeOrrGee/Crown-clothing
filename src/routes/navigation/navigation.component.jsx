import { Fragment } from 'react';
import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/User.Context';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import './navigation.styles.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const signOutHandler = async () => {
        await signOutUser();
    };
    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    <Link
                        className='nav-link'
                        to='/auth'
                        onClick={signOutHandler}
                    >
                        {currentUser ? (
                            <span className='nav-link'>SIGN OUT</span>
                        ) : (
                            <span className='nav-link'>SIGN IN</span>
                        )}
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;
