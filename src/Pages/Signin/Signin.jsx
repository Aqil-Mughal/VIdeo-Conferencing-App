import React from 'react'
import Google from './google.jpeg'
import Facebook from './facebook.webp'
import Logo from './aamantologo.png'
import { Link } from 'react-router-dom'

const Signin = () => {
    return (
        <div>
            <div style={{ width: "95%", margin: "auto", }}>
                <nav>
                    <img src={Logo} style={{}} />
                </nav>
            </div>
            <div style={{ display: "flex", justifyContent: 'center', flexDirection: "column", width: "40%", margin: "auto", marginTop: "5%", border: "1px solid grey", borderRadius: "10px" }}>
                <div style={{ margin: "20px", }}>
                    <div style={{ margin: "auto", display: "flex", justifyContent: "center" }}>
                        <h2 style={{ fontWeight: "800" }}>Sign in</h2>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontSize: "18px",fontWeight:"800" }}>Email</label>
                        <input
                            placeholder='Email address'
                            type='email'
                            style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px" }}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                        <label style={{ fontSize: "18px",fontWeight:"800" }}>Password</label>
                        <input
                            placeholder='Password'
                            type='password'
                            style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px" }}
                        />
                    </div>
                    <div style={{ marginTop: "20px" }}>
                        <button style={{ width: "100%", height: "50px", fontSize: "20px", backgroundColor: "#1967D3", color: "#FFFFFF", border: "none", borderRadius: "8px" }} >Sign in</button>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <Link style={{ textDecoration: "none", color: "#1967D3" }}>Forgot Password?</Link>

                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "30px", width: "100%" }}>
                        <div style={{ width: "41%", border: "1px solid grey", height: "0.5px", marginTop: "14px" }}>
                        </div>
                        <div style={{ width: "8%", display: "flex", justifyContent: "center" }}>
                            OR
                        </div>
                        <div style={{ width: "41%", border: "1px solid grey", height: "0.5px", marginTop: "14px" }}>
                        </div>
                    </div>

                    <div style={{ display: "flex", width: "100%", marginTop: "10%" }}>
                        <div style={{ border: "1px solid grey", width: "10%", borderRight: "grey" }}>
                            <img src={Google} style={{ width: "80%" }} />
                        </div>
                        <button

                            style={{
                                width: '100%',
                                height: '50px',
                                fontSize: '20px',
                                backgroundColor: '#FFFFFF', // Use Google's brand color
                                color: 'grey',
                                border: "1px solid grey",

                            }}
                        >
                            Sign in with Google
                        </button>
                    </div>
                    <div style={{ display: "flex", width: "100%", marginTop: "20px" }}>
                        <div style={{ border: "1px solid grey", width: "10%", borderRight: "grey", display: "flex", justifyContent: "center" }}>
                            <img src={Facebook} style={{ width: "93%", }} />
                        </div>
                        <button

                            style={{
                                width: '100%',
                                height: '50px',
                                fontSize: '20px',
                                backgroundColor: '#FFFFFF',
                                color: 'grey',
                                border: "1px solid grey",
                            }}
                        >
                            Sign in with Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
