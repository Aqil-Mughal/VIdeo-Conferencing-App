import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Home/Homepage";
import RoomPage from "./Pages/Room";
import Invites from "./Pages/Invite/Invites";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
      <Route path='/send-invite' element={<Invites />} />
    </Routes>
  );
}

export default App;
