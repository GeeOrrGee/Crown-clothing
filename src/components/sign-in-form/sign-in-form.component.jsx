import { useState } from 'react';
import {
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import './signIn.styles.scss';
import Button from '../Button.component/Button.component';
import FormInput from '../form-input/form-input.component';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
}; // form default state

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    ////////
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }; //resets to default values
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value }); //using input NAMES as state properties
    }; // onChange stateForms, sets the default state values to current values

    //Fetchs  userDocRef on submit, checks if user exists or not, and subsequently registers in the database
    // Authentication with email/password
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInUserWithEmailAndPassword(email, password);
            resetFormFields();

            ////////////////
        } catch (err) {
            switch (err.code) {
                case 'auth/user-not-found':
                    alert('User does not exist');
                    break;
                case 'auth/wrong-password':
                    alert('Incorrect password');
                    break;
                default:
                    console.log(err);
            }
        }
    };
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
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
                        btnType='google'
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
