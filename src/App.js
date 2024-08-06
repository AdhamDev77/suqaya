import React from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Sign from "./components/Sign";
import Login from "./components/Login";
import Kyas_asar from "./components/Kyas_asar";
import Kyas_asar_edit from "./components/Kyas_asar_edit";
import Kyas_asar_show from "./components/Kyas_asar_show";
import Kyas_asar_cons from "./components/Kyas_asar_cons";
import Kyas_asar_cons_show from "./components/Kyas_asar_cons_show";
import Cons from "./components/Cons";
import Cons_manage from "./components/admin_components/Cons_manage";
import Makal from "./components/Makal";
import Single_profile from "./components/Single_profile";
import Mos_profile from "./components/Mos_profile";
import Comm_profile from "./components/Comm_profile";
import Comm_view from "./components/Comm_view";
import Admin_login from "./components/Admin_login";
import Admin from "./components/Admin";
import MosReq from "./components/MosReq";
import Comm_wait from "./components/wait/Comm_wait";
import User_wait from "./components/wait/User_wait";
import Kyas_asar_settings from "./components/Kyas_asar_settings";
import Feedback from "./components/Feedback";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/login" element={<Login />} />
        <Route path="/asar" element={<Kyas_asar />} />
        <Route path="/asar/edit/:id" element={<Kyas_asar_edit />} />
        <Route path="/asar/:id" element={<Kyas_asar_show />} />
        <Route path="/asar/cons/:id" element={<Kyas_asar_cons />} />
        <Route path="/asar/cons/show/:id" element={<Kyas_asar_cons_show />} />
        <Route
          path="/comm/:comm_id/asar/settings/:asar_id"
          element={<Kyas_asar_settings />}
        />
        <Route path="/cons" element={<Cons />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/view/mos/:id" element={<Cons_manage />} />
        <Route path="/makalat" element={<Makal />} />
        <Route path="/profile/:id" element={<Single_profile />} />
        <Route path="/comm/profile/:id" element={<Comm_profile />} />
        <Route path="/comm/view/:id" element={<Comm_view />} />
        <Route path="/mos/profile" element={<Mos_profile />} />
        <Route path="/mos/req" element={<MosReq />} />
        <Route path="/admin/login" element={<Admin_login />} />
        <Route path="/admin/651282101" element={<Admin />} />
        <Route path="/comm/wait" element={<Comm_wait />} />
        <Route path="/user/wait" element={<User_wait />} />
      </Routes>
      <Footer />
      <ToastContainer />
      <Tooltip id="my-tooltip" />
    </BrowserRouter>
  );
}

export default App;
