import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
const Login = () => {
    //set states for email, password, error message, and loading
    //e.g email is state for the email input and setEmail is a function to update the email
    const [email, setEmail] = useState(''); // Initialize with an empty string and setEmail to update it
    const [password, setPassword] = useState(''); // Initialize with an empty string and setPassword to update it
    const [errorMessage, setErrorMessage] = useState(''); // Initialize with an empty string and setErrorMessage to update it
    const [isLoading, setIsLoading] = useState(false); // Initialize with a boolean value and setIsLoading to update it
    const navigate = useNavigate();  // Hook to programmatically navigate
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

             if (!response.ok) {
                throw new Error('Invalid username or password');
            }else if(response.status === 401){
                throw new Error('Invalid credentials');
            }else if (response.status === 500){
                throw new Error('Server error');
            }else if (response.status === 200){
                console.log('Login successful');
                const data = await response.json();
                //store the token in localStorage
                localStorage.setItem('token', data.access_token);    
                //store user data in localStorage
                localStorage.setItem('user', JSON.stringify(data.user));
                console.log(data.user);
                navigate('/app'); 
            }
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100">
                <Col xs={12} md={6} lg={4} className="mx-auto">
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>Email</label>
                            <input
                                className="form-control mt-1"
                                type="email"
                                value={email}
                                onChange={(e) =>{
                                    setEmail(e.target.value); 
                                    setErrorMessage('');
                                    }               
                                }
                                required
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <input
                                className="form-control mt-1"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorMessage('');
                                    }
                                }
                                required
                            />
                        </div>
                        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
                        <div>
                            <button className='btn btn-primary mt-3 form-control' type="submit" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
