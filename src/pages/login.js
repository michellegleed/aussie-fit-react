import React from 'react';
import { useParams } from 'react-router-dom';
import LoginForm from '../components/loginForm/loginForm';

function LoginPage() {

    const { id } = useParams();

    return (
        <div id="login-container">
            <h1>Log In</h1>
            <LoginForm groupID={id} />
        </div>
    )
}

export default LoginPage;