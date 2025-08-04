import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/RantFeed";
import CreateRant from "./pages/CreateRant";
import SetupProfile from "./pages/SetupProfile";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import Unfiltered from "./pages/Unfiltered"
import Notifications from "./pages/Notifications";
import RantDetail from "./pages/RantDetail";

const HomeRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={user ? "/feed" : "/login"} />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/setup-profile" element={<SetupProfile />} />

          {/* Protected Routes with layout */}
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/feed" element={<Feed />} />
            <Route path="/create" element={<CreateRant />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Unfiltered />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/rant/:id" element={<RantDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
