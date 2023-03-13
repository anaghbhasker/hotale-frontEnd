import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import LoadingPage from "./pages/User/LoadingPage";
import Admin from "./routes/Admin";
import Owner from "./routes/Owner";
import { AppContext } from "./context/AppContext";
import { AdminContext } from "./context/AdminContext";
import { io } from "socket.io-client";
// import Hotale404Page from "./pages/Hotale404Page";
// import User from "./routes/User";

function App() {
  const User = lazy(() => import("./routes/User"));
  const [chat, setChat] = React.useState(null);
  const [chatAdmin,setChatAdmin]=React.useState(null);
  const [socket,SetSocket]=React.useState(io('wss://api.bigmarts.shop/'))
  return (
    <div>
      <Router>
        {/* User Routes */}
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route exact path="/*" element={<User />} />
          </Routes>
        </Suspense>

        {/* Owner Routes */}
        <AppContext.Provider value={{ chat, setChat,socket }}>
          <Routes>
            <Route exact path="/owner/*" element={<Owner />} />
          </Routes>
        </AppContext.Provider>

        {/* Admin Routes */}
        <AdminContext.Provider value={{ chatAdmin,setChatAdmin,socket }}>
          <Routes>
            <Route exact path="/admin/*" element={<Admin />} />
          </Routes>
        </AdminContext.Provider>

        {/* 404 Page */}
        {/* <Routes>
          <Route path="*" element={<Hotale404Page/>} />
        </Routes> */}
      </Router>
    </div>
  );
}

export default App;
