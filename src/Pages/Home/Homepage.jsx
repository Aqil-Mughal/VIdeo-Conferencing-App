import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Rectangle from './Rectangle 4.png'

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
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="card-title mb-4">Join Room</h2>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleJoinRoom}
                                >
                                    Join
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