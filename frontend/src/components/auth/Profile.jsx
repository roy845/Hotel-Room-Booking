import React, { useEffect, useState } from "react";
import {
  deleteUser,
  getBookingsByUserId,
  getUser,
  saveProfilePicture,
  saveUserDetails,
} from "../utils/ApiFunctions";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import DeleteUserModal from "../modals/DeleteUserModal";

const Profile = () => {
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    roles: [{ id: "", name: "" }],
    profilePicture: null,
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [file, setFile] = useState(null);

  const [bookings, setBookings] = useState([
    {
      id: "",
      room: { id: "", roomType: "" },
      checkInDate: "",
      checkOutDate: "",
      bookingConfirmationCode: "",
    },
  ]);
  const [message, setMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [openDeleteUserModal, setOpenDeleteUserModal] = useState(false);
  const [originalProfilePicture, setOriginalProfilePicture] = useState(null);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId, token);
        setUser({ ...userData, password: "" });
        setOriginalProfilePicture(userData.profilePicture);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserId(userId, token);
        setBookings(response);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      await deleteUser(userId)
        .then((response) => {
          setMessage(response.data);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole");
          localStorage.removeItem("user");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.data);
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));
      setUser({ ...user, profilePicture: null });
      setFile(file);
    } else {
      setProfilePicture(null);
    }
  };

  const handleSaveProfilePicture = async () => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const response = await saveProfilePicture(formData, userId);

      setUser({ ...user, profilePicture: response.profilePicture });
      setProfilePicture(null);
      setSuccessMessage("User profile picture updated successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSaveDetails = async () => {
    try {
      const userToUpdate = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      };
      const response = await saveUserDetails(userId, userToUpdate);

      localStorage.setItem("firstName", response.firstName);
      localStorage.setItem("lastName", response.lastName);
      setSuccessMessage("User profile details updated successfully");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-danger">{message}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      {user ? (
        <div
          className="card p-5 mt-5"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <h4 className="card-title text-center">User Information</h4>
          <div className="card-body">
            <div className="col-md-10 mx-auto">
              <div className="card mb-3 shadow">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-flex flex-column align-items-center mb-4">
                      <label htmlFor="profilePictureInput">
                        {profilePicture && (
                          <img
                            src={profilePicture}
                            alt="Profile"
                            className="rounded-circle mt-4 ml-5"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                          />
                        )}
                        {user.profilePicture && (
                          <img
                            src={`data:image/png;base64,${user.profilePicture}`}
                            alt="Profile"
                            className="rounded-circle mt-4 ml-5"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                          />
                        )}
                        {!user.profilePicture && !profilePicture && (
                          <img
                            src={
                              "https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                            }
                            alt="Profile"
                            className="rounded-circle mt-4 ml-5"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                              cursor: "pointer",
                            }}
                          />
                        )}
                      </label>
                      {profilePicture && (
                        <div className="text-center mt-3">
                          <button
                            className="btn btn-primary"
                            onClick={handleSaveProfilePicture}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              setProfilePicture(null);
                              setUser({
                                ...user,
                                profilePicture: originalProfilePicture,
                              });
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      <input
                        type="file"
                        id="profilePictureInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleProfilePictureChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-10">
                    <div className="card-body">
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          ID:
                        </label>
                        <div className="col-md-10">
                          <p className="card-text">{user.id}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          First Name:
                        </label>
                        <div className="col-md-10">
                          <input
                            name="firstName"
                            onChange={handleInputChange}
                            value={user.firstName}
                            className="form-control border-dark"
                          />
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Last Name:
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleInputChange}
                            name="lastName"
                            value={user.lastName}
                            className="form-control border-dark"
                          />
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Email:
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleInputChange}
                            name="email"
                            disabled
                            value={user.email}
                            className="form-control border-dark"
                          />
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Password:
                        </label>
                        <div className="col-md-10">
                          <input
                            type="password"
                            onChange={handleInputChange}
                            name="password"
                            value={user.password}
                            className="form-control border-dark"
                          />
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">
                          Roles:
                        </label>
                        <div className="col-md-10">
                          <ul className="list-unstyled">
                            {user.roles.map((role) => (
                              <li key={role.id} className="card-text">
                                {role.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          className="btn btn-hotel"
                          onClick={handleSaveDetails}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="card-title text-center">Booking History</h4>

              {bookings.length > 0 ? (
                <table className="table table-bordered table-hover shadow">
                  <thead>
                    <tr>
                      <th scope="col">Booking ID</th>
                      <th scope="col">Room ID</th>
                      <th scope="col">Room Type</th>
                      <th scope="col">Check In Date</th>
                      <th scope="col">Check Out Date</th>
                      <th scope="col">Confirmation Code</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking, index) => (
                      <tr key={index}>
                        <td>{booking.id}</td>
                        <td>{booking.room.id}</td>
                        <td>{booking.room.roomType}</td>
                        <td>
                          {moment(booking.checkInDate)
                            .subtract(1, "month")
                            .format("MMM Do, YYYY")}
                        </td>
                        <td>
                          {moment(booking.checkOutDate)
                            .subtract(1, "month")
                            .format("MMM Do, YYYY")}
                        </td>
                        <td>{booking.bookingConfirmationCode}</td>
                        <td className="text-success">On-going</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-center">
                  You have not made any bookings yet.
                </p>
              )}

              <div className="d-flex justify-content-center">
                <div className="mx-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setOpenDeleteUserModal(true)}
                  >
                    Close account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      {openDeleteUserModal && (
        <DeleteUserModal
          open={openDeleteUserModal}
          setOpen={setOpenDeleteUserModal}
          handleDelete={handleDeleteAccount}
          userId={userId}
        />
      )}
    </div>
  );
};

export default Profile;
