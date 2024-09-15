import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './login.css';
import logo from '../../timeless-logo-no-words.png';
import axios from "axios";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Create a navigate instance

    const handleSubmit = async(e) => {
        e.preventDefault();

        // Create the payload
        const payload = {
            username: username,
            password: password
        };

        try {
            // Send the POST request to Flask API
            const response = await axios.post('http://10.37.117.49:5000/login', payload,{
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            await console.log(response);
            if (response.data.ok) {
                const data = await response.data.data;
                console.log('Login successful:', data);
                localStorage.setItem('avatar', data.picture);
                localStorage.setItem('userId', data.username);

                // Redirect to /home after signup success
                navigate('/');
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-300">
            <div className="main ">
                <img src={logo} alt="Timeless Logo" className="w-20 -mb-2 mt-18" />
                <h1 className="display-1 font-bold ">Timeless</h1>
                <div className="form-bg default-shadow form-bg rounded-xl default-shadow w-96">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username-login">Username</label>
                            <input
                                type="username"
                                className="form-control bg-white "
                                id="username-login"
                                name="username"
                                placeholder="Enter username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                    <Link to="/signup" className="link-primary hover:text-purple-900 text-purple-500">Don&apos;t have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
};

const Login = () => {
    return (
        <LoginForm />
    );
};

export default Login;