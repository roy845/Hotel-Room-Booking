import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import EditRoom from "./components/room/EditRoom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import Checkout from "./components/bookings/Checkout";
import BookingSuccess from "./components/bookings/BookingSuccess";
import Bookings from "./components/bookings/Bookings";
import FindBooking from "./components/bookings/FindBooking";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import Profile from "./components/auth/Profile";
import Logout from "./components/auth/Logout";
import RequireAuth from "./components/auth/RequireAuth";
import { AuthProvider } from "./components/auth/AuthProvider";
import AdminRoute from "./components/admin/AdminRoute";
import Unauthorized from "./components/auth/Unauthorized";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Roles from "./components/admin/Roles";
import AddRole from "./components/admin/AddRole";
import DeleteUserFromRole from "./components/admin/DeleteUserFromRole";
import AssignUserToRole from "./components/admin/AssignUserToRole";
import RemoveAllUsersFromRole from "./components/admin/RemoveAllUsersFromRole";

function App() {
  return (
    <AuthProvider>
      <main>
        <Router>
          <Navbar />
          <Routes>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/add-room" element={<AddRoom />} />
              <Route path="/add-role" element={<AddRole />} />
              <Route path="/browse-all-rooms" element={<RoomListing />} />
              <Route path="/edit-room/:roomId" element={<EditRoom />} />
              <Route path="/existing-rooms" element={<ExistingRooms />} />
              <Route path="/book-room/:roomId" element={<Checkout />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/existing-bookings" element={<Bookings />} />
              <Route path="/find-booking" element={<FindBooking />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/manage-roles" element={<Roles />} />
              <Route
                path="/assign-user-to-role"
                element={<AssignUserToRole />}
              />
              <Route
                path="/delete-user-from-role"
                element={<DeleteUserFromRole />}
              />
              <Route
                path="/remove-all-users-from-role"
                element={<RemoveAllUsersFromRole />}
              />
              <Route path="/logout" element={<Logout />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password?/:token" element={<ResetPassword />} />

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
          </Routes>
        </Router>
        <Footer />
      </main>
    </AuthProvider>
  );
}

export default App;
