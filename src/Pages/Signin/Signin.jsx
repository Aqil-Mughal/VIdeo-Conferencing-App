import React, { useState } from 'react'
import Google from './google.jpeg'
import Facebook from './facebook.webp'
import Logo from './aamantologo.png'
import { Link, useNavigate } from 'react-router-dom'
import '../Signin/Signin.css'
import { ApolloClient, InMemoryCache } from '@apollo/client';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const navigate = useNavigate();

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    // const { loading, error, data } = useQuery(GET_USER_DATA, {
    //     variables: { userId },
    //   });

    //   if (loading) return <p>Loading...</p>;
    //   if (error) return <p>Error: {error.message}</p>;

    //   const user = data.user;

    // const handleSignIn = async () => {
    //     try {
    //       const { data } = await signIn({ variables: { email, password } });
    //       const { token, user } = data.signIn;

    //       
    //       localStorage.setItem('authToken', token);


    //       navigate('/dashboard');
    //     } catch (error) {
        
    //       console.error('Authentication error:', error.message);
    //     }
    //   };

    return (
        <div>
            <div style={{ width: "95%", margin: "auto", }}>
                <nav>
                    <img src={Logo} />
                </nav>
            </div>
            <div style={{ display: "flex", justifyContent: 'center', flexDirection: "column", width: "40%", margin: "auto", marginTop: "6%", border: "1px solid grey", borderRadius: "10px" }}>
                <div style={{ margin: "20px", }}>
                    <div style={{ margin: "auto", display: "flex", justifyContent: "center" }}>
                        <h2 style={{ fontWeight: "800" }}>Sign in</h2>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontSize: "18px", fontWeight: "500" }}>Email</label>
                        <input
                            placeholder='Email address'
                            type='email'
                            style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px" }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <label style={{ fontSize: "18px", fontWeight: "500" }}>Password</label>
                        <input
                            placeholder='Password'
                            type='password'
                            style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px" }}
                        />
                    </div>
                    <div style={{ marginTop: "20px" }} >
                        <button style={{ width: "100%", height: "50px", fontSize: "20px", backgroundColor: "#1967D3", color: "#FFFFFF", border: "none", borderRadius: "8px" }} >
                        Sign in</button>

                    </div>




                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "30px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                                style={{ width: "20px", height: "15px" }}
                            />
                            <label htmlFor="rememberMe" style={{ fontSize: "16px" }}>Remember Me</label>
                        </div>
                        <div>
                            <Link to="/forgot-password" style={{ textDecoration: "none", color: "#1967D3" }}>Forgot Password?</Link>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "5%", display: 'flex', justifyContent: "center", marginBottom: "20px" }}>
                    <span style={{ textDecoration: "none", }}>Dont have a account? <Link to={'/sign-up'} style={{ textDecoration: "none", color: "#1967D3" }} >Signup</Link> </span>

                </div>
            </div>
        </div>
    )
}

export default Signin

                    // {loading ? 'Signing In...' : 'Sign In'}
                    // {error && <p style={{ color: 'red' }}>{error.message}</p>}