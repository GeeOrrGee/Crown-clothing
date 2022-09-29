import { ChangeEvent, FormEvent, useState } from 'react';
import './signUp.styles.scss';
import Button from '../Button.component/Button.component';
import FormInput from '../form-input/form-input.component';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../store/user/user-action';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}; // form default state

const SignUpForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

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
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password !== confirmPassword) return;
        try {
            dispatch(signUpStart(email, password, displayName));
            resetFormFields();
        } catch (err) {
            if ((err as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
                alert('Cannot create user, email is already in use');
            } else {
                console.log(err);
            }
        }
    };

    //Sign Up form Component
    return (
        <div className='signUp-container'>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label='Username'
                    type='text'
                    onChange={handleChange}
                    name='displayName'
                    value={displayName}
                    required
                />

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

                <FormInput
                    label='Confirm Password'
                    type='password'
                    onChange={handleChange}
                    name='confirmPassword'
                    value={confirmPassword}
                    required
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
