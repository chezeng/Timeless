import React, { useState } from 'react';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../timeless-logo-no-words.png';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginWithRedirect, isAuthenticated, isLoading, error } = useAuth0();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginWithRedirect({
            login_hint: email
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Oops... {error.message}</div>;
    }

    if (isAuthenticated) {
        return <div>You are logged in!</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-300">
            <div className="main ">
                <img src={logo} alt="Timeless Logo" className="w-20 -mb-2 mt-18" />
                <h1 className="display-1 font-bold ">Timeless</h1>
                <div className="form-bg default-shadow form-bg rounded-xl default-shadow w-96">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email-login">Email</label>
                            <input
                                type="email"
                                className="form-control bg-white "
                                id="email-login"
                                name="email"
                                placeholder="Enter email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-login">Password</label>
                            <input
                                type="password"
                                className="form-control bg-white"
                                id="password-login"
                                name="password"
                                placeholder="Enter password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <Link to="/signup" className="link-primary hover:text-purple-900 text-purple-500">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
};

const Login = () => {
    return (
        <Auth0Provider
            domain="dev-uepv8601rzfynqzi.us.auth0.com"
            clientId="O4c53QdJ9k3kjdTM6D8yYkTzKeOe6LNi"
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            <LoginForm />
        </Auth0Provider>
    );
};

export default Login;