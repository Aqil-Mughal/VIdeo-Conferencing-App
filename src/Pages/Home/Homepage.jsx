import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './aamantologo.png'
import '../Home/Homepage.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
};
const Homepage = () => {
    const [newEmail, setNewEmail] = useState('');
    const [chips, setChips] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState(null);
    const [emails, setEmails] = useState(['']);
    const [emailErrors, setEmailErrors] = useState(['']);
    const [invitationSent, setInvitationSent] = useState(false);
    const [meetingLink, setMeetingLink] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleEmailChange = (event) => {
        const value = event.target.value;
        if (event.key === 'Enter' && value.trim() !== '') {
            setChips([...chips, value.trim()]);
            setNewEmail('');
            setError('');
        } else {
            setNewEmail(value);

            if (!validateEmail(value)) {
                setErrors('Please write a correct email');
            } else {
                setErrors('');
            }
        }
    };

    const removeChip = (index) => {
        const updatedChips = [...chips];
        updatedChips.splice(index, 1);
        setChips(updatedChips);
    };

    const addEmailField = () => {
        setEmails([...emails, '']);
        setEmailErrors([...emailErrors, '']);
    };


    const handleAddEmail = () => {
        if (newEmail.trim() !== '' && validateEmail(newEmail.trim())) {
            setChips([...chips, newEmail.trim()]);
            setNewEmail('');
        } else {
            setErrors('Please write a correct email');
        }
    };

    const removeEmailField = index => {
        const updatedEmails = emails.filter((_, i) => i !== index);
        const updatedErrors = emailErrors.filter((_, i) => i !== index);
        setEmails(updatedEmails);
        setEmailErrors(updatedErrors);
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
    const sendInvitationss = () => {
        const allValid = chips.every(email => validateEmail(email) && email.trim() !== '');
        if (allValid) {
            const roomCode = generateRandomRoomCode();
            const meetingLink = `http://localhost:3000/room/${roomCode}`;
            setMeetingLink(meetingLink);
            setRoomId(roomCode);
            setInvitationSent(true);
        } else {
            setError('Please enter valid email addresses');
        }
    }

    const canSendInvitations = chips.length > 0 && chips.every(email => validateEmail(email) && email.trim() !== '');


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
    const handleJoinRoom = useCallback(() => {
        const roomCode = generateRandomRoomCode();
        navigate(`/room/${roomCode}`);
    }, [navigate]);


    const handleJoinLater = useCallback(() => {
        navigate(`/send-invite`);
    }, [navigate]);

    const handleJoinViaLink = useCallback(() => {
        const regex = /\/room\/(\w+)/;
        const match = meetingLink.match(regex);
        if (match && match[1] && match[1].length === 6) {
            const roomId = match[1];
            navigate(`/room/${roomId}`);
        } else {
            setError('Please enter a valid meeting link with a 6-character room ID');
        }
    }, [navigate, meetingLink]);

    // const handleJoinRoom = useCallback(() => {
    //     if (email && password) {
    //         if (email === 'user@email.com' && password === '123') {
    //             const roomCode = generateRandomRoomCode();
    //             navigate(`/room/${roomCode}`);
    //         } else {
    //             setError('Invalid email or password');
    //         }
    //     } else {
    //         setError('Please enter both email and password');
    //     }
    // }, [navigate, email, password]);


    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div style={{ width: "90%", margin: "auto" }}>
                        <nav>
                            <img src={Logo} style={{}} />
                        </nav>
                    </div>
                    <div className="col-md-12">
                        <h1 className="main-title" style={{ color: "black", textAlign: "center", marginBottom: "20px" }}>Welcome to Our Meeting Platform</h1>
                        <div className="Main_card">
                            <div className="card-body" style={{ width: "80%", margin: "20px", }}>
                                <h2 className="card-title mb-4" style={{ color: "white" }}>Join a Meeting via Link</h2>
                                <p style={{ color: "white" }}>
                                    Enter the meeting link below to quickly join a scheduled meeting. <br /> <br /> Whether you received a link from a colleague or it's an event you've planned, this feature allows you to effortlessly connect to meetings without hassle.
                                </p>
                                <input
                                    type="text"
                                    placeholder="Paste meeting link here"
                                    value={meetingLink}
                                    onChange={(e) => setMeetingLink(e.target.value)}
                                    style={{ width: "24%", padding: "10px", borderRadius: "5px", height: "35px" }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleJoinViaLink}
                                    style={{ width: "10%", backgroundColor: "white", border: "none", borderRadius: "5px", color: "#1967D3", height: "55px", marginLeft: "10px", cursor: "pointer" }}
                                >
                                    Join via Link
                                </button>
                                {error && <p style={{ color: "red", fontSize: "15px" }}>{error}</p>}
                            </div>
                            <div className="card-body" style={{ width: "80%", margin: "20px" }}>

                                <h2 className="card-title mb-4" style={{ color: "white" }}>Start an Instant Meeting</h2>
                                <p style={{ color: "white", marginTop: "3%" }}>
                                    Welcome to our instant meeting platform!<br />
                                    <br /> Connect and collaborate effortlessly with our cutting-edge meeting solution.
                                    With just a click you can join a meeting room and collaborate with your team or friends in real-time.
                                    Our platform provides a seamless experience
                                </p>


                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleOpen}
                                    style={{ width: "20%", backgroundColor: "white", marginTop: "2%", border: "none", borderRadius: "5px", color: "#1967D3", height: "50px", cursor: "pointer" }}
                                >
                                    Join Instant
                                </button>
                                
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <Typography variant="h4" component="h3" style={{ display: "flex", justifyContent: "center",fontSize:"25px",fontWeight:"600" }}>
                                            Instants Meeting Invitations
                                        </Typography>
                                        <div style={{width:"100%",backgroundColor:"#E0E4EC",height:"1.5px",marginTop:"30px"}}>
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
                                            <div key={index} className="email-chip" style={{ display: "flex", justifyContent: "space-between", width: "88.5%", marginTop: "3%" }}>
                                                <span>{email}</span>
                                                <span className="remove-chip" style={{ border: "1px solid grey", border: "none", fontSize: "20px", width: "60px", cursor: "pointer" }} onClick={() => removeChip(index)}>x</span>
                                            </div>
                                        ))}
                                        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", width: "100%" }}>
                                            <button
                                                style={{ height: "45px", backgroundColor: "white", width: "35%",border:"1px solid #1967D3", }}
                                                onClick={sendInvitationss}
                                                disabled={!canSendInvitations}
                                            >
                                                {invitationSent ? 'Invitations Sent' : 'Send Invitations'}
                                            </button>
                                        </div>
                                        {invitationSent && (
                                            <div>
                                                <p style={{ fontSize: '14px', marginTop: '10px', borderRadius: "10px", color: "#1967D3", marginRight: "10px", border: "none", backgroundColor: "rgba(118, 1, 211, 0.04)", width: "95%", fontSize: "17px", padding: "20px" }}>
                                                    <div style={{ width: "100%" }}>
                                                        <span>Copy Link : </span>
                                                        <br />
                                                    </div>
                                                    
                                                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                                        <FontAwesomeIcon
                                                            icon={faCopy}
                                                            onClick={copyMeetingLink}
                                                            style={{ cursor: 'pointer', color: "#1967D3" }}
                                                        />
                                                    </div>
                                                    Room Link: {""}
                                                    <a style={{ color: "#1967D3" }} href={`http://localhost:3000/room/${roomId}`} target="_blank" rel="noopener noreferrer">   {`http://localhost:3000/room/${roomId}`}</a>
                                                </p>
                                                <Link to={`/room/${roomId}`} style={{ textDecoration: 'none', display: "flex", justifyContent: "flex-end", width: "100%" }}>
                                                    <button style={{ display: "flex", justifyContent: "center",alignItems:"center", marginTop: '10px', backgroundColor: "#1967D3", color: "white", border: "none", borderRadius: "5px", height: "50px",width:"20%", padding: "10px", cursor: 'pointer' }}>
                                                        Join Now
                                                    </button>
                                                </Link>
                                            </div>
                                        )}

                                    </Box>
                                </Modal>
                            </div>
                            <div className="card-body" style={{ width: "80%", margin: "20px" }}>
                                <h2 className="card-title mb-4" style={{ color: "white" }}>Create a meeting for later</h2>
                                <p style={{ color: "white", marginTop: "3%" }}>
                                    Planning an upcoming meeting?<br /> <br />You can schedule a meeting for later and invite participants at your convenience.
                                    Whether you're planning for a team discussion, project update, or casual catch-up, regardless of your team's varying schedules.
                                </p>


                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleJoinLater}
                                    style={{ width: "20%", backgroundColor: "white", marginTop: "2%", marginBottom: "8%", border: "none", borderRadius: "5px", color: "#1967D3", height: "50px", cursor: "pointer" }}
                                >
                                    Create for later
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Homepage;