import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Home/Homepage";
import RoomPage from "./Pages/Room";
import Invites from "./Pages/Invite/Invites";
import Signin from "./Pages/Signin/Signin";
import TwilioRoom from "./Pages/Twilio";
import Signup from "./Pages/Signup/Signup";
import Signupcomfirmation from "./Pages/Signupconfirmation/Signupcomfirmation";
import Newpasswordreset from "./Pages/Home/Newpasswordreset/Newpasswordreset";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path='/send-invite' element={<Invites />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/twilio' element={<TwilioRoom />} />
      <Route path='/sign-up' element={<Signup />} />
      <Route path='/forgot-password' element={<Signupcomfirmation />} />
      <Route path='/new-password-reset' element={<Newpasswordreset />} />
      </Routes>
      );
    }
    
    export default App;
    