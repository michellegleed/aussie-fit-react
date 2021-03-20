import React from 'react';
import LoginForm from '../../components/loginForm/loginForm';

function AdminLoginPage() {

    return (
        <div id="login-container">
            <h1>Log In</h1>
            <LoginForm groupID={null} />
        </div>
    )
}

export default AdminLoginPage;