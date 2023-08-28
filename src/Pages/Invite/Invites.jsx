import React, { useState } from 'react';

const Invites = () => {
  const [emails, setEmails] = useState(['']);
  const [emailErrors, setEmailErrors] = useState(['']);
  const [invitationSent, setInvitationSent] = useState(false);
  const [roomId, setRoomId] = useState('');



  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const generateRandomRoomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_+?/@';
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
    updatedErrors[index] = validateEmail(value) || value.trim() === '' ? '' : 'Invalid email';
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

      setInvitationSent(true);
    } else {
      const updatedErrors = emails.map(email =>
        validateEmail(email) || email.trim() === '' ? '' : 'Invalid email'
      );
      setEmailErrors(updatedErrors);
    }
  };

  const canSendInvitations = emails.every(email => validateEmail(email) && email.trim() !== '');

  return (
    <div>
      <div style={{ width: '80%', margin: 'auto', display: 'flex', justifyContent: 'center', border: '1px solid red' }}>
        <div style={{ border: '1px solid blue', width: '80%' }}>
          <h2>Send Meeting Invitations</h2>
          {emails.map((email, index) => (
            <div key={index} style={{ display: "flex" }}>
              <input
                type="email"
                placeholder={`Email ${index + 1}`}
                value={email}
                onChange={e => handleEmailChange(index, e.target.value)}
                className={emailErrors[index] ? 'invalid' : ''}
                style={{ margin: '10px', display: 'flex' }}
              />
              {emailErrors[index] && <p className="error" style={{ fontSize: '12px', color: 'red' }}>{emailErrors[index]}</p>}
              {emails.length > 1 && (
                <button onClick={() => removeEmailField(index)} style={{ margin: '10px' }}>-</button>
              )}
            </div>
          ))}
          <button onClick={addEmailField} style={{ margin: '10px' }}>+</button>
          <button onClick={sendInvitations} disabled={!canSendInvitations || invitationSent}>
            {invitationSent ? 'Invitations Sent' : 'Send Invitations'}
          </button>
          {invitationSent && (
            <p style={{ fontSize: '14px', marginTop: '10px' }}>
              Room Link:
              <a href={`http://localhost:3000/room/${roomId}`} target="_blank" rel="noopener noreferrer">{`http://localhost:3000/room/${roomId}`}</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invites;
