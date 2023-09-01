import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './support-managemwnt.png'
import '../Home/Homepage.css'

const Homepage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

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
                            <div className="card-body" style={{ width: "40%", margin: "20px" }}>

                                <h2 className="card-title mb-4" style={{ color: "white" }}>Start an Instant Meeting</h2>
                                <p style={{ color: "white", marginTop: "8%" }}>
                                    Welcome to our instant meeting platform! Connect and collaborate effortlessly with our cutting-edge meeting solution.
                                    With just a click you can join a meeting room and collaborate with your team or friends in real-time.
                                </p>
                                

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleJoinRoom}
                                    style={{ width: "30%", backgroundColor: "white", marginTop: "10%", border: "none", borderRadius: "5px", color: "#1967D3", height: "50px", cursor: "pointer" }}
                                >
                                    Join Now
                                </button>
                            </div>
                            <div className="card-body" style={{ width: "40%", margin: "20px" }}>
                                <h2 className="card-title mb-4" style={{ color: "white" }}>Create a meeting for later</h2>
                                <p style={{ color: "white", marginTop: "8%" }}>
                                    Planning an upcoming meeting? You can schedule a meeting for later and invite participants at your convenience.
                                    Whether you're planning for a team discussion, project update, or casual catch-up, regardless of your team's varying schedules.
                                </p>
                            

                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleJoinLater}
                                    style={{ width: "30%", backgroundColor: "white", marginTop: "10%", marginBottom: "8%", border: "none", borderRadius: "5px", color: "#1967D3", height: "50px", cursor: "pointer" }}
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

    // <div className="container" style={{ border: "1px solid #000000", width: "70%", margin: "auto", marginTop: "10%", borderRadius: "15px" }}>
    //     <div className="row justify-content-center mt-5" >
    //         <div className="col-md-12" >
    //             <div className="card">
    //                 <div className="card-body" style={{ margin: "30px" }}>
    //                     <h2 className="card-title mb-4">Join Room</h2>
    //                     <form style={{ display: 'flex' }}>

    //                         <div className="mb-6">
    //                             <label htmlFor="email" className="form-label">Email</label>
    //                             <input
    //                                 type="email"
    //                                 id="email"
    //                                 className="form-control"
    //                                 value={email}
    //                                 onChange={e => setEmail(e.target.value)}
    //                                 placeholder="Enter your email"
    //                             />
    //                         </div>
    //                         <div className="mb-8">
    //                             <label htmlFor="password" className="form-label">Password</label>
    //                             <input
    //                                 type="password"
    //                                 id="password"
    //                                 className="form-control"
    //                                 value={password}
    //                                 onChange={e => setPassword(e.target.value)}
    //                                 placeholder="Enter your password"
    //                             />
    //                         </div>

    //                         <button
    //                             type="button"
    //                             className="btn btn-primary"
    //                             onClick={handleJoinRoom}
    //                         >
    //                             Join
    //                         </button>
    //                         {error && <p className="text-danger">{error}</p>}

    //                     </form>

    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
// <img src={Rectangle} className='Background_style' />