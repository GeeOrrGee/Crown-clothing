import './authentication.styles.scss';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
// Sign In with Google pop up , fetchs the userDocRef from the database
const Authentication = () => {
    /////
    //Sign In/Up page Route component
    return (
        <div className='authentication-container'>
            {/* <button onClick={logGoogleUser}>Sign in with Google Popup</button> */}
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default Authentication;
