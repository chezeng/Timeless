import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './login.css';
import logo from '../../timeless-logo-no-words.png'; // Update the path to your logo

const Signup = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const emailRef = useRef(null);
    const [message, setMessage] = useState(''); // To display success/error message
    const navigate = useNavigate(); // Create a navigate instance

    const getSignup = async (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const email = emailRef.current.value;

        // Create the payload
        const payload = {
            username: username,
            password: password,
            email: email
        };

        try {
            // Send the POST request to Flask API
            const response = await fetch('http://10.37.117.49:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Send the payload as JSON
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Signup successful:', data);
                setMessage('Signup successful!');

                // Redirect to /home after signup success
                navigate('/');
            } else {
                const errorData = await response.json();
                console.error('Signup failed:', errorData);
                setMessage(`Signup failed: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setMessage('An error occurred during signup.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <div className="main">
                <img src={logo} alt="Timeless Logo" className="logo" />
                <h1 className="display-1">Timeless</h1>
                <div className="form-bg rounded default-shadow">
                    <form onSubmit={getSignup}>
                        <div className="form-group">
                            <label htmlFor="username-signup">Username</label>
                            <input
                                ref={usernameRef}
                                type="text"
                                className="form-control"
                                id="username-signup"
                                placeholder="Enter username"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email-signup">Email</label>
                            <input
                                ref={emailRef}
                                type="email"
                                className="form-control"
                                id="email-signup"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password-signup">Password</label>
                            <input
                                ref={passwordRef}
                                type="password"
                                className="form-control"
                                id="password-signup"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary">Signup</button>
                        </div>
                    </form>
                    {message && <p className="text-center">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Signup;
