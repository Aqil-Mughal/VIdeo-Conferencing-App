import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Logo from "./aamantologo.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Box, Modal, Typography } from '@mui/material'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};
const RoomPage = () => {
    const [open, setOpen] = React.useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [chips, setChips] = useState([]);
    const [errors, setErrors] = useState(null);
    const [invitationSent, setInvitationSent] = useState(false);
    const [meetingLink, setMeetingLink] = useState('');
    // const [roomId, setRoomId] = useState('');

    const { roomId } = useParams()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const handleAddEmail = () => {
        if (newEmail.trim() !== '' && validateEmail(newEmail.trim())) {
            setChips([...chips, newEmail.trim()]);
            setNewEmail('');
        } else {
            setErrors('Please write a correct email');
        }
    };
    const copyMeetingLink = () => {
        const meetingLink = `http://localhost:3000/room/${roomId}`;

        navigator.clipboard.writeText(meetingLink)
            .then(() => {
                alert("Link copied to clipboard!");
            })
            .catch(error => {
                console.error("Error copying link: ", error);
                alert("Error copying link. Please copy it manually.");
            });
    };
    const removeChip = (index) => {
        const updatedChips = [...chips];
        updatedChips.splice(index, 1);
        setChips(updatedChips);
    };
    const sendInvitationsss = () => {
        const allValid = chips.every(email => validateEmail(email) && email.trim() !== '');
        if (allValid) {
            const meetingLink = `http://localhost:3000/room/${roomId}`;
            setMeetingLink(meetingLink);
            setInvitationSent(true);
        } else {
            setErrors('Please enter valid email addresses');
        }
    }
    
    const generateRandomRoomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const length = 6;
        let roomCode = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            roomCode += characters[randomIndex];
        }
        return roomCode;
    };
    const handleEmailChange = (event) => {
        const value = event.target.value;
        if (event.key === 'Enter' && value.trim() !== '') {
            setChips([...chips, value.trim()]);
            setNewEmail('');
            setErrors('');
        } else {
            setNewEmail(value);

            if (!validateEmail(value)) {
                setErrors('Please write a correct email');
            } else {
                setErrors('');
            }
        }
    };
    const canSendInvitations = chips.length > 0 && chips.every(email => validateEmail(email) && email.trim() !== '');

    const joinRoom = async (element) => {
        const appId = 1612580332;
        const serverSecret = "6e7980c0544bedc6a8c235cc97e3609f";
        // const recordingToken = await generateRecordingToken(); // Replace with actual code

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId,
            Date.now().toString(), "  ")

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [{
                name: 'Copy Link',
                url: `http://localhost:3000/room/${roomId}`
            }],
            scenario: {
                mode: ZegoUIKitPrebuilt.GroupCall,
            },
            showScreenSharingButton: true,
            // recording: {
            //     enable: true,
            //     recordingToken: recordingToken, 
            //     recordingType: ZegoUIKitPrebuilt.RecordType.Single,
            // },


        })
        // async function generateRecordingToken() {
        //     const recordingAppId = 1612580332; 
        //     const recordingSecret = "6e7980c0544bedc6a8c235cc97e3609f"; 

        //     const response = await fetch(
        //         `https://rtcapi.zego.im/api/v1/mixstream/create_token?appid=${recordingAppId}&secret=${recordingSecret}`,
        //         { method: 'POST' }
        //     );

        //     if (response.ok) {
        //         const data = await response.json();
        //         return data.data.token;
        //     } else {
        //         throw new Error('Failed to generate recording token');
        //     }
        // }
    }
    return (
        <div>
            <div style={{ width: "95%", margin: "auto", }}>
                <nav style={{display:"flex",justifyContent:"space-between"}}>
                    <img src={Logo} style={{}} />
                    <button style={{backgroundColor:"#1967D3",height:"45px",fontSize:"17px",color:"white",width:"12%",borderRadius:"8px",border:"none",marginTop:"1%"}} onClick={handleOpen}>Invite via Email</button>
                    <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography variant="h6" component="h2" style={{ display: "flex", justifyContent: "center",fontWeight:"800" }}>
                                            Instant Meeting Invitations
                                        </Typography>
                                        <div style={{width:"100%",backgroundColor:"#E0E4EC",height:"1px",marginTop:"30px"}}>
                                        </div>
                                        <div style={{ marginTop: "5%" }}>
                                            <h2 style={{ fontSize: "18px" }} >Invite via email</h2>
                                        </div>

                                        <div style={{ marginTop: "2%", display: "flex", justifyContent: "space-between", width: "100%" }}>
                                            <input
                                                type="text"
                                                placeholder="Write email here"
                                                value={newEmail}
                                                onChange={(e) => setNewEmail(e.target.value)}
                                                onKeyPress={handleEmailChange}
                                                style={{ height: "50px", width: "80%", fontSize: "18px" }}
                                            />
                                            <button style={{ height: "55px", backgroundColor: "#1967D3", fontSize: "30px", color: "#FFFFFF", border: "1px solid #FFFFFF", borderRadius: "6px", width: "50px" }} onClick={handleAddEmail}>+</button>

                                        </div>
                                        {errors && <p style={{ color: "red", fontSize: "15px" }}>{errors}</p>}
                                        {chips.map((email, index) => (
                                            <div key={index} className="email-chip" style={{ display: "flex", justifyContent: "space-between", width: "88%", marginTop: "3%" }}>
                                                <span style={{color:"#1967D3"}}>{email}</span>
                                                <span className="remove-chip" style={{ border: "1px solid grey", border: "none", fontSize: "20px", width: "60px", cursor: "pointer" }} onClick={() => removeChip(index)}>x</span>
                                            </div>
                                        ))}
                                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
                                            <button
                                                style={{ height: "45px",borderRadius:"6px", backgroundColor: "#1967D3", width: "35%",color:"white",border:"none" }}
                                                onClick={sendInvitationsss}
                                                disabled={!canSendInvitations}
                                            >
                                                {invitationSent ? 'Invitations Sent' : 'Send Invitations'}
                                            </button>
                                        </div>
                                        
                                    </Box>
                                </Modal>
                </nav>
            </div>
            <div ref={joinRoom} style={{ border: "1px solid white", margin: "auto", }}>

            </div>

        </div>
    )
}

export default RoomPage
