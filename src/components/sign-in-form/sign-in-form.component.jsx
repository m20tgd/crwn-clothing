import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import { 
    signInWithGooglePopUp,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

import {SignUpContainer, ButtonsContainer} from './sign-in-form.styles.jsx';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const navigate = useNavigate();

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopUp();
        navigateToHome();
    }

    const navigateToHome = () => {
        navigate('/shop');
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try{
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }
        catch(error){
            if (error.code === 'auth/invalid-login-credentials'){
                alert('Email or password is incorrect');
            }
            else console.log(error.message)
        }

    }

    const handleChange = event => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    return (
        <SignUpContainer>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

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

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Sign In With Google</Button>
                </ButtonsContainer>

            </form>    
        </SignUpContainer>
    )

}

export default SignInForm;