
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import Trending from './pages/Trending';
// import Following from './pages/Following';
// import Search from './pages/Search';
// import CreatePost from './pages/CreatePost';
// import UserProfile from './pages/UserProfile';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Trending />} />
//           <Route path="/following" element={<Following />} />
//           <Route path="/search" element={<Search />} />
//           <Route path="/create" element={<CreatePost />} />
//           <Route path="/user/:username" element={<UserProfile />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Feed from "./pages/RantFeed";
import PrivateRoute from "./utilities/PrivateRoute";
import CreateRant from "./pages/CreateRant";


const HomeRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={user ? "/feed" : "/login"} />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreateRant />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


