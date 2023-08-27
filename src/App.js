import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Home/Homepage";
import RoomPage from "./Pages/Room";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/room/:roomId" element={<RoomPage />} />
    </Routes>
  );
}

export default App;
