import React, { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import '../Invite/Invites.css'
import Logo from './aamantologo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';



const Invites = () => {
  const [emails, setEmails] = useState(['']);
  const [chips, setChips] = useState([]);
  const [newEmail, setNewEmail] = useState('');
  const [errors, setErrors] = useState(null);

  const [emailErrors, setEmailErrors] = useState(['']);
  const [invitationSent, setInvitationSent] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingDate, setMeetingDate] = useState(null);
  const [startingTime, setStartingTime] = useState('00:00');
  const [endingTime, setEndingTime] = useState('00:00');
  // const [copied, setCopied] = useState(false);

  // const copyToClipboard = useCallback(() => {
  //   const linkInput = document.getElementById('roomLink');
  //   if (linkInput) {
  //     linkInput.select();
  //     document.execCommand('copy');
  //     setCopied(true);
  //   }
  // }, []);

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
  const handleAddEmail = () => {
    if (newEmail.trim() !== '' && validateEmail(newEmail.trim())) {
      setChips([...chips, newEmail.trim()]);
      setNewEmail('');
    } else {
      setErrors('Please write a correct email');
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

  const sendInvitations = async () => {
    const allValid = chips.every(email => validateEmail(email) && email.trim() !== '');

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

  const canSendInvitations = chips.length > 0 && chips.every(email => validateEmail(email) && email.trim() !== '');

  return (
    <div style={{ backgroundColor: "#FFFFFF", }}>
      <div style={{ width: "95%", margin: "auto", }}>
        <nav>
          <img src={Logo} style={{}} />
        </nav>
      </div>
      <div className='main_card'>
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: '90%', marginTop: "10px", margin: "auto" }}>
          <h2 style={{ display: "flex", justifyContent: "center" }}> Send Meeting Invitations</h2>
          <div style={{ display: "flex", justifyContent: "center", width: "100%", height: "5px", backgroundColor: "#EDF2F6", borderRadius: "5px", margin: "auto" }}>
          </div>
          <div style={{ marginTop: "20px", width: "98.5%" }}>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
              <label style={{ fontWeight: "700", fontSize: "15px" }}>Meeting Title</label>
              <input
                type="text"
                placeholder="Add Title"
                value={meetingTitle}
                onChange={e => setMeetingTitle(e.target.value)}
                style={{ width: "100%", height: "40px", padding: "5px", backgroundColor: "#EDF2F6", border: " 1px solid #EDF2F6", paddingLeft: "10px", borderRadius: "5px" }}
              />
              <label style={{ fontWeight: "700", fontSize: "15px", marginTop: "10px" }}>Meeting Description</label>
              <textarea
                placeholder="Add Description"
                value={meetingDescription}
                onChange={e => setMeetingDescription(e.target.value)}
                style={{ width: "100%", height: "100px", padding: "5px", fontFamily: "sans-serif", padding: "5px", backgroundColor: "#EDF2F6", border: " 1px solid #EDF2F6", paddingLeft: "10px", paddingTop: "10px", borderRadius: "5px" }}

              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100.5%" }}>
              <div styele={{ display: "flex", flexDirection: "column", width: "31%" }}>
                <h5 >Select Meeting Date</h5>
                <DatePicker
                  selected={meetingDate}
                  onChange={date => setMeetingDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className='custom-date-picker'
                  placeholderText='yyyy-mm-dd'
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", width: "31%" }}>
                <h5 style={{ fontWeight: "600" }}>Meeting Start Time</h5>

                <TimePicker
                  onChange={time => setStartingTime(time)}
                  value={startingTime}
                  className="custom-time-picker"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column", width: "31%" }}>
                <h5 style={{ fontWeight: "600" }}>Meeting End Time</h5>
                <TimePicker
                  onChange={time => setEndingTime(time)}
                  value={endingTime}
                  className="custom-time-picker"
                />
              </div>
            </div>
            <div>
              <span style={{ fontWeight: "600", }}>Invite via Emails</span>
            </div>
            <div style={{ marginTop: "2%", display: "flex", justifyContent: "space-between", width: "35.5%" }}>
              <input
                type="text"
                placeholder="Write email here"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyPress={handleEmailChange}
                style={{ height: "45px", width: "80%", fontSize: "15px", border: "none", backgroundColor: "#EDF2F6", paddingLeft: "5px" }}
              />
              <button style={{ height: "45px", backgroundColor: "#1967D3", fontSize: "30px", color: "#FFFFFF", border: "1px solid #FFFFFF", borderRadius: "6px", width: "50px" }} onClick={handleAddEmail}>+</button>

            </div>
            {errors && <p style={{ color: "red", fontSize: "15px" }}>{errors}</p>}
            {chips.map((email, index) => (
              <div key={index} className="email-chip" style={{ display: "flex", justifyContent: "space-between", width: "33%", marginTop: "3%" }}>
                <span>{email}</span>
                <span className="remove-chip" style={{ border: "1px solid grey", border: "none", fontSize: "20px", width: "60px", cursor: "pointer" }} onClick={() => removeChip(index)}>x</span>
              </div>
            ))}
            {invitationSent && (
              <div>
                <p style={{ fontSize: '14px', marginTop: '10px', borderRadius: "10px", color: "#1967D3", marginRight: "10px", border: "none", backgroundColor: "rgba(118, 1, 211, 0.04)", width: "26%", fontSize: "17px", padding: "20px" }}>
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
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", width: "100%", marginBottom: "20px" }}>

              <button
                style={{ height: "45px", backgroundColor: "#1967D3", width: "20%", borderRadius: "5px", color: "white", border: "none" }}
                onClick={sendInvitations}
                disabled={!canSendInvitations}
              >
                {invitationSent ? 'Meeting Scheduled' : 'Schedule Meeting'}
              </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Invites;
