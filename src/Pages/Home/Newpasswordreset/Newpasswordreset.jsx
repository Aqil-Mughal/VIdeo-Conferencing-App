import React, { useState } from 'react'
import Logo from './aamantologo.png'
import { Link, useNavigate } from 'react-router-dom'
const Newpasswordreset = () => {
    const [newpassword, setNewPassword] = useState('');
    const [newconfirmPassword, setNewConfirmPassword] = useState('');
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
                <h2 style={{ fontWeight: "500" }}>Write your new password</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "10px" }}>
                <label style={{ fontSize: "18px", fontWeight: "400" }}>New Password</label>
                <input
                    placeholder='Password'
                    type='password'
                    value={newpassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px" }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label style={{ fontSize: "18px", fontWeight: "400", marginTop: "10px" }}>New Confirm Password</label>
                <input
                    placeholder='Confirm Password'
                    type='password'
                    value={newconfirmPassword}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                    style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px" }}
                />
            </div>
           
            <div style={{ marginTop: "20px" }}>
                <button  
                // onClick={handleSignup}
                 style={{ width: "100%", height: "50px", fontSize: "20px", backgroundColor: "#1967D3", color: "#FFFFFF", border: "none", borderRadius: "8px" }} >Update Password</button>
            </div>

        </div>
    </div>
</div>
  )
}

export default Newpasswordreset
// {error && <p style={{ color: 'red' }}>{error}</p>}