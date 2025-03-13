import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dash from "./components/Dash";
import Footer from "./components/Footer";
import Image from "./components/Image";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import { useAuthContext } from "./hooks/useAuthContext"

function App() {
  // Hooking into app auth state context
  const { user } = useAuthContext();
  console.log(user);
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="main">
          <Routes>
            <Route path="/" element={!user ? <Landing /> : <Navigate to={`/u/${user.username}/booru`} />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/u/:user/booru" element={<Dash />} />
            <Route path="/u/:user/booru/:coll" element={<Dash />} />
            <Route path="/u/:user/booru/img/:id" element={<Image />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
