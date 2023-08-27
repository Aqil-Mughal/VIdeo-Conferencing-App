import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import React from 'react'
import { useParams } from 'react-router-dom'
import Logo from "../Room/support-managemwnt.png"

const RoomPage = () => {
    const { roomId } = useParams()
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
                <nav>
                    <img src={Logo} style={{}} />
                </nav>
            </div>
            <div ref={joinRoom} style={{ border: "1px solid white", margin: "auto", }}>
                <button onClick={() => joinRoom()}>Enter the chat</button>

            </div>

        </div>
    )
}

export default RoomPage
