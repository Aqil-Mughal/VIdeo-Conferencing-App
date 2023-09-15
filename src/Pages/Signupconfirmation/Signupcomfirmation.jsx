import React, { useState } from 'react'
import Logo from './aamantologo.png'
import { Link, useNavigate } from 'react-router-dom'
import { Box, Modal, Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius:"20px",
};

const Signupcomfirmation = () => {
    const [open, setOpen] = React.useState(false);
    const [email, setEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleVerify = (verificationCode) => {
        // Handle verification logic here
        console.log('Verification code:', verificationCode);
        navigate("/new-password-reset")
        handleClose();
    };
    // const [resetPassword] = useMutation(RESET_PASSWORD_MUTATION);

    //   const handleResetPassword = async () => {
    //     try {
    //       const response = await resetPassword({
    //         variables: {
    //           email,
    //         },
    //       });
    //       console.log(response);   
    //     } catch (error) {
    //       console.error(error);
    //   Handle error (e.g., display an error message)
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
                        <h2 style={{ fontWeight: "500" }}>Password Reset</h2>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ fontSize: "18px", fontWeight: "400", marginTop: "10px" }}>Email</label>
                        <input
                            placeholder='Email address'
                            type='email'
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                            style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px" }}
                        />
                    </div>

                    <div style={{ marginTop: "20px" }}>
                        <button onClick={handleOpen}
                            style={{ width: "100%", height: "50px", fontSize: "20px", backgroundColor: "#1967D3", color: "#FFFFFF", border: "none", borderRadius: "8px" }} >
                            Reset my password</button>
                            <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <Typography id="modal-modal-title" variant="h6" component="h2">
                                Password Reset Confirmation
                              </Typography>
                              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                Enter the verification code received in your email.
                              </Typography>
                              <input
                                type="text"
                                placeholder="Verification code"
                                // value={email} 
                                // onChange={(e) => setEmail(e.target.value)}
                                style={{ height: "40px", fontSize: "13px", marginTop: "10px", paddingLeft: "10px",width:"100%" }}
                              />
                              <button onClick={() => handleVerify(email)} variant="contained" >Verify</button>
                              </Box>
                          </Modal>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signupcomfirmation
