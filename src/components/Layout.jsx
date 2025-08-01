// import { Outlet, NavLink } from "react-router-dom";

// export default function Layout() {
//   return (
//     <div className="min-h-screen bg-gray-100 text-gray-800">
//       {/* Nav */}
//       <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-blue-600">RantSpace</h1>
//         <div className="space-x-4">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-500 font-semibold border-b-2 border-blue-500"
//                 : "text-gray-600 hover:text-blue-500"
//             }
//           >
//             Home
//           </NavLink>
//           <NavLink
//             to="/trending"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-500 font-semibold border-b-2 border-blue-500"
//                 : "text-gray-600 hover:text-blue-500"
//             }
//           >
//             Trending
//           </NavLink>
//           <NavLink
//             to="/profile"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-500 font-semibold border-b-2 border-blue-500"
//                 : "text-gray-600 hover:text-blue-500"
//             }
//           >
//             Profile
//           </NavLink>
//         </div>
//       </nav>

//       {/* Page Content */}
//       <main className="p-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// src/components/Layout.jsx
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">RantVerse</h1>
          <div className="flex space-x-4">
            <NavLink to="/" end className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }>
              Home
            </NavLink>
            <NavLink to="/trending" className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }>
              Trending
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) =>
              isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
            }>
              Profile
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
