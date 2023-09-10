import React from 'react'
import { Video, LocalVideoTrack, connect, createLocalVideoTrack } from 'twilio-video';


const TwilioRoom = () => {
    const joinRoom = async (element) => {
        const twilioAccountSid = 'ACc0f50eb93ea2ca445af2aa8ff77183e5';
        const twilioApiKey = 'SK4705f18f065af2d558f875cfd180152e';
        const twilioApiSecret = 'DGuBeZgy9SROc9R1gP94MbLNa9dtxqVK';
      
        // Generate a Twilio Access Token (server-side)
        const twilioToken = '8d8c8bfb460e080ea0a1608332fe30fb';
      
        const room = await connect(twilioToken, { video: true, audio: true,
            //  name: roomId
             });
      
        const localVideoTrack = await createLocalVideoTrack();
        const videoElement = document.createElement('div');
        element.appendChild(videoElement);
        videoElement.appendChild(localVideoTrack.attach());
      
        room.on('participantConnected', (participant) => {
          participant.tracks.forEach((publication) => {
            if (publication.isSubscribed) {
              const trackElement = publication.track.attach();
              videoElement.appendChild(trackElement);
            }
          });
        });

      };
      console.log(joinRoom);
  return (
    <div ref={joinRoom} style={{ border: '1px solid white', margin: 'auto' }}>
    lbafkjef</div>

  )
}

export default TwilioRoom
