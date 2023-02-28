import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebaseDB';
import Authentication from '../authentication/Authentication';
import MainContainer from '../MainContainer';

const Login = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState(null);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    })


    const createUser = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === 'auth/weak-password') {
                setError('The password is too weak!');
            } else if (error.code === 'auth/invalid-email') {
                setError('The Email is invalid!');
            } else {
                setError('There was a problem creating your account!');
            }
        }
    }

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === 'auth/wrong-password' ||
                error.code === 'auth/invalid-email' ||
                error.code === 'auth/email-already-in-use') {
                setError('Your email or password was incorrect');
            } else {
                console.log('There was a problem with your request');
            }
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    }

    if (authenticated) {
        return <MainContainer logout={logout} />
    }
    return <Authentication signIn={signIn} createUser={createUser} error={error} />
}

export default Login
