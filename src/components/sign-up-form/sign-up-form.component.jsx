import { useState } from 'react';

import FormInput from '../form-input/form-input.component';

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        //Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }  
        try{
            //Authenticate user
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            console.log(user);
            //Create user in firebase
            const userDocRef = await createUserDocumentFromAuth(user, { displayName });
            console.log(userDocRef);
            resetFormFields();
        }
        catch(error){
            if (error.code === "auth/email-already-in-use"){
                alert('Cannot create user, email already in use');
            }
            else{
                console.log(error);
            }
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
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Display Name'
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

                <button type='submit'>Sign Up</button>
            </form>    
        </div>
    )

}

export default SignUpForm;