import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingPage from "./pages/User/LoadingPage";
import Admin from "./routes/Admin";
import Owner from "./routes/Owner";
import { AppContext } from "./context/AppContext";
import { AdminContext } from "./context/AdminContext";
import { io } from "socket.io-client";
// import User from "./routes/User";

function App() {
  const User = lazy(() => import("./routes/User"));
  const [chat, setChat] = React.useState(null);
  const [chatAdmin, setChatAdmin] = React.useState(null);
  const [socket, SetSocket] = React.useState(io("wss://api.bigmarts.shop/"));
  return (
    <Router>
      <div>
        <Routes>
          {/* User Routes */}

          <Route
            path="/*"
            element={
              <Suspense fallback={<LoadingPage />}>
                <User />
              </Suspense>
            }
          />

          {/* Owner Routes */}

          <Route
            path="/owner/*"
            element={
              <AppContext.Provider value={{ chat, setChat, socket }}>
                <Owner />
              </AppContext.Provider>
            }
          />

          {/* Admin Routes */}

          <Route
            path="/admin/*"
            element={
              <AdminContext.Provider
                value={{ chatAdmin, setChatAdmin, socket }}
              >
                <Admin />
              </AdminContext.Provider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
