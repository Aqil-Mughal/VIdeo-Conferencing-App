import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import '../Invite/Invites.css'
import Logo from './support-managemwnt.png'


const Invites = () => {
  const [emails, setEmails] = useState(['']);
  const [emailErrors, setEmailErrors] = useState(['']);
  const [invitationSent, setInvitationSent] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingDate, setMeetingDate] = useState(null);
  const [startingTime, setStartingTime] = useState('00:00');
  const [endingTime, setEndingTime] = useState('00:00');

  // const styles = {
  //   display: 'block',
  //   width: '100%',
  //   padding: '10px',
  //   fontSize: '16px',
  //   borderRadius: '4px',
  //   border: '1px solid #ccc',
  //   boxShadow: 'none',
  //   boxSizing: 'border-box',
  //   transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  // };

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const generateRandomRoomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+?/@{}[]|';
    const length = 6;
    let roomCode = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      roomCode += characters[randomIndex];
    }
    return roomCode;
  };
  const handleEmailChange = (index, value) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);

    const updatedErrors = [...emailErrors];
    updatedErrors[index] = validateEmail(value) || value.trim() === '' ? '' : '';
    setEmailErrors(updatedErrors);
  };

  const addEmailField = () => {
    setEmails([...emails, '']);
    setEmailErrors([...emailErrors, '']);
  };

  const removeEmailField = index => {
    const updatedEmails = emails.filter((_, i) => i !== index);
    const updatedErrors = emailErrors.filter((_, i) => i !== index);
    setEmails(updatedEmails);
    setEmailErrors(updatedErrors);
  };

  const sendInvitations = async () => {
    const allValid = emails.every(email => validateEmail(email) && email.trim() !== '');

    if (allValid) {
      const newRoomId = generateRandomRoomCode();
      setRoomId(newRoomId);
      const meetingData = {
        title: meetingTitle,
        description: meetingDescription,
        date: meetingDate,
        startTime: startingTime,
        endTime: endingTime,
        emails: emails,
      };
      console.log(meetingData)
      setInvitationSent(true);
      try {
        const response = await fetch('URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(meetingData),
        });

        if (response.ok) {
          setInvitationSent(true);
        } else {
          console.error('Error sending invitations');
        }
      } catch (error) {
        console.error('Error sending invitations', error);
      }
    } else {
      const updatedErrors = emails.map(email =>
        validateEmail(email) || email.trim() === '' ? '' : 'Invalid email'
      );
      setEmailErrors(updatedErrors);
    }
    // } else {
    //   const updatedErrors = emails.map(email =>
    //     validateEmail(email) || email.trim() === '' ? '' : 'Invalid email'
    //   );
    //   setEmailErrors(updatedErrors);
    // }
  };

  const canSendInvitations = emails.every(email => validateEmail(email) && email.trim() !== '');

  return (
    <div>
      <div style={{ width: "95%", margin: "auto", }}>
        <nav>
          <img src={Logo} style={{}} />
        </nav>
      </div>
      <div className='main_card'>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: '90%', margin: "10px", }}>
          <h2 style={{ display: "flex", justifyContent: "center" }}> Send Meeting Invitations</h2>
          <div style={{}}>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
              <label style={{ fontWeight: "700", fontSize: "15px" }}>Meeting Title</label>
              <input
                type="text"
                placeholder="Add Title"
                value={meetingTitle}
                onChange={e => setMeetingTitle(e.target.value)}
                style={{ width: "40%", height: "30px", padding: "5px" }}
              />
              <label style={{ fontWeight: "700", fontSize: "15px", marginTop: "10px" }}>Meeting Description</label>
              <textarea
                placeholder="Add Description"
                value={meetingDescription}
                onChange={e => setMeetingDescription(e.target.value)}
                style={{ width: "80%", height: "100px", padding: "5px",marginTop:"1.5%",fontFamily:"sans-serif" }}

              />
            </div>
            <div>
              <h4 >Select Meeting Date</h4>
              <DatePicker
                selected={meetingDate}
                onChange={date => setMeetingDate(date)}
                dateFormat="yyyy-MM-dd"
                className='custom-date-picker'
                placeholderText='yyyy-mm-dd'

              />
              <h4 style={{ fontWeight: "600" }}>Select Meeting Time</h4>
              <span style={{ fontWeight: "600", marginRight: "20px", fontSize: "18px" }}>From</span>
              <TimePicker
                onChange={time => setStartingTime(time)}
                value={startingTime}
                className="custom-time-picker"
                style={{ marginLeft: "10%" }}
              />
              <span style={{ fontWeight: "600", marginRight: "20px", marginLeft: "80px", fontSize: "18px" }}>To</span>
              <TimePicker
                onChange={time => setEndingTime(time)}
                value={endingTime}
                className="custom-time-picker"
              />
            </div>
            <div>
              <span style={{ fontWeight: "600", }}>Write your Emails</span>
            </div>
            {emails.map((email, index) => (
              <div key={index} style={{ display: "flex", marginTop: "20px" }}>
                <input
                  type="email"
                  label="Write you Email"
                  placeholder={`Email ${index + 1}`}
                  value={email}
                  onChange={e => handleEmailChange(index, e.target.value)}
                  className={emailErrors[index] ? 'invalid' : ''}
                  style={{ display: 'flex', width: "30%", height: '30px', marginTop: "auto",fontSize:"15px" }}
                />
                {emailErrors[index] && <p className="error" style={{ fontSize: '12px', color: 'red' }}>{emailErrors[index]}</p>}
                {emails.length > 1 && (
                  <button onClick={() => removeEmailField(index)} style={{ height: "35px",marginLeft:"15px",width:"3%",fontSize:"20px",backgroundColor:"white",border:"1px solid black",backgroundColor:"white", }}>-</button>
                )}
              </div>

            ))}
            <button onClick={addEmailField} style={{ marginTop: '20px',marginBottom:"30px",height:"35px",width:"3%",backgroundColor:"white",border:"1px solid black" }}>+</button>
            <button style={{marginLeft:"12.5%",height:"40px",backgroundColor:"white",width:"15%",}} onClick={sendInvitations} disabled={!canSendInvitations || invitationSent}>
              {invitationSent ? 'Invitations Sent' : 'Send Invitations'}
            </button>
            {invitationSent && (
              <p style={{ fontSize: '14px', marginTop: '10px',border:"1px solid black",width:"35%",height:"35px",fontSize:"17px",padding:"20px" }}>
                Room Link:
                <a href={`http://localhost:3000/room/${roomId}`} target="_blank" rel="noopener noreferrer">{`http://localhost:3000/room/${roomId}`}</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invites;
