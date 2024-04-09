import "./App.css";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";

import { Chat } from "./screens/Chat";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import PrivateRoute from "./components/PrivateRoutes";
import { Dalle } from "./screens/Dalle";
import { ImgCovert } from "./screens/ImgCovert";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>

        <Route path="" element={<PrivateRoute />}>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/dalle" element={<Dalle />}></Route>
          <Route path="/imgConvert" element={<ImgCovert />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
