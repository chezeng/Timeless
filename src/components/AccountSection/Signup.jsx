import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './login.css';
import logo from '../../timeless-logo-no-words.png'; 

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
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-300">
            <div className="main">
                <img src={logo} alt="Timeless Logo" className="w-20 -mb-2 mt-18"/>
                <h1 className="display-1 font-bold">Timeless</h1>
                <div className="form-bg rounded-xl default-shadow w-96">
                    <form onSubmit={getSignup}>
                        <div className="form-group">
                            <label htmlFor="username-signup">Username</label>
                            <input
                                ref={usernameRef}
                                type="text"
                                className="form-control bg-white"
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
                                className="form-control bg-white"
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
                                className="form-control bg-white"
                                id="password-signup"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary mt-5 bg-purple-700 hover:bg-purple-900 font-bold hover:scale-105 ease-in-out duration-300 transition">Register</button>
                        </div>
                    </form>
                    {message && <p className="text-center">{message}</p>}
                </div>
            </div>
        </div>
    );
};

export default Signup;
