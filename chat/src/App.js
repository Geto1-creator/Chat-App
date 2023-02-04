import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chats, Login, Navigation } from "./components";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { AuthProvider } from "./components/common/Provider/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/chats" element={<Chats />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
