import React, { useState } from 'react'
import Logo from './aamantologo.png'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

  
    
    // const [signup] = useMutation(SIGNUP_MUTATION);

    // const handleSignup = async () => {
    //     try {
    //       const { data } = await signup({
    //         variables: { email, password },
    //       });
    
    //       if (data.signup) {
    //         navigate('/');
    //       } else {
    //         setError('Registration failed. Please try again.');
    //       }
    //     } catch (error) {
    //       setError('An error occurred during registration. Please try again.');
    //     }
    //   };
    

    return (
        <div>
            <div style={{ width: "95%", margin: "auto", }}>
                <nav>
                    <img src={Logo} style={{}} />
                </nav>
            </div>
            <div style={{ display: "flex", justifyContent: 'center', flexDirection: "column", width: "40%", margin: "auto", marginTop: "8%", border: "1px solid grey", borderRadius: "10px" }}>
                <div style={{ margin: "20px", }}>
                    <div style={{ margin: "auto", display: "flex", justifyContent: "center" }}>
                        <h2 style={{ fontWeight: "500" }}>Sign up</h2>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontSize: "18px", fontWeight: "400", marginTop: "10px" }}>Email</label>
                        <input
                            placeholder='Email address'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px" }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <label style={{ fontSize: "18px", fontWeight: "400" }}>Password</label>
                        <input
                            placeholder='Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px" }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontSize: "18px", fontWeight: "400", marginTop: "10px" }}>Confirm Password</label>
                        <input
                            placeholder='Confirm Password'
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px" }}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div style={{ marginTop: "20px" }}>
                        <button  
                        // onClick={handleSignup}
                         style={{ width: "100%", height: "50px", fontSize: "20px", backgroundColor: "#1967D3", color: "#FFFFFF", border: "none", borderRadius: "8px" }} >Sign up</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup
