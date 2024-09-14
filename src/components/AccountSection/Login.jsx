import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import logo from '../../timeless-logo-no-words.png'; // Update the path to your logo

const Login = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const getLogin = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        
        // Perform login logic here with the username and password
        console.log('Logging in with:', username, password);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <div className="main">
                <img src={logo} alt="Timeless Logo" className="logo" />
                <h1 className="display-1">Timeless</h1>
                <div className="form-bg rounded default-shadow">
                    <form onSubmit={getLogin}>
                        <div className="form-group">
                            <label htmlFor="username-login">Email</label>
                            <input
                                ref={usernameRef}
                                type="text"
                                className="form-control"
                                id="email-login"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-login">Password</label>
                            <input
                                ref={passwordRef}
                                type="password"
                                className="form-control"
                                id="password-login"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <Link to="/signup" className="link-primary">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
