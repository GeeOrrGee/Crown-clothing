import { useState, FormEvent, ChangeEvent } from 'react';

import './signIn.styles.scss';
import Button from '../Button.component/Button.component';
import FormInput from '../form-input/form-input.component';
import { buttonTypes } from '../Button.component/Button.component';
import { useDispatch } from 'react-redux';
import {
    emailSignInStart,
    googleSignInStart,
} from '../../store/user/user-action';
import { AuthError, AuthErrorCodes } from 'firebase/auth';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
}; // form default state

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    ////////
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }; //resets to default values
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value }); //using input NAMES as state properties
    }; // onChange stateForms, sets the default state values to current values

    //Fetchs  userDocRef on submit, checks if user exists or not, and subsequently registers in the database
    // Authentication with email/password
    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            dispatch(emailSignInStart(email, password));
            resetFormFields();

            ////////////////
        } catch (err) {
            switch ((err as AuthError).code) {
                case AuthErrorCodes.NULL_USER:
                    alert('User does not exist');
                    break;
                case AuthErrorCodes.INVALID_PASSWORD:
                    alert('Incorrect password');
                    break;
                default:
                    console.log(err);
            }
        }
    };
    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    };
    //Sign In form Component
    return (
        <div className='signUp-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Email'
                    type='email'
                    onChange={handleChange}
                    name='email'
                    value={email}
                    required
                />

                <FormInput
                    label='Password'
                    type='password'
                    onChange={handleChange}
                    name='password'
                    value={password}
                    required
                />

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button
                        type='button'
                        btnType={buttonTypes.google}
                        onClick={signInWithGoogle}
                    >
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;
