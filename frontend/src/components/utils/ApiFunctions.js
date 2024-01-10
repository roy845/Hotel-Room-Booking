import axios from "axios";
import { HTTP_CREATED_201 } from "../constants/httpStatusCodes";

const baseURL = "http://localhost:9192/";

/*This function add a new room to the database*/
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);
  try {
    const response = await axios.post(`${baseURL}rooms/add/new-room`, formData);
    if (response.status === HTTP_CREATED_201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error("Error in creating new room");
  }
}

/*This function gets all room types from the database*/
export async function getRoomTypes() {
  try {
    const { data } = await axios.get(`${baseURL}rooms/room/types`);
    return data;
  } catch (error) {
    throw new Error("Error in fetching room types");
  }
}

/*This function gets all rooms from the database*/
export async function getAllRooms() {
  try {
    const result = await axios.get(`${baseURL}rooms/all-rooms`);
    return result.data;
  } catch (error) {
    throw new Error("Error in fetching rooms");
  }
}

/*This function deletes a room by the id*/
export async function deleteRoom(roomId) {
  try {
    const result = await axios.delete(`${baseURL}rooms/delete/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error in deleting room ${error.message}`);
  }
}

/*This function updates a room in the database*/
export async function updateRoom(roomId, roomData) {
  try {
    const formData = new FormData();
    formData.append("photo", roomData.photo);
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    const response = await axios.put(
      `${baseURL}rooms/update/${roomId}`,
      formData
    );
    return response;
  } catch (error) {
    throw new Error(`Error in updating room ${error.message}`);
  }
}

/*This function get a room by id from the database*/
export async function getRoomById(roomId) {
  try {
    const response = await axios.get(`${baseURL}rooms/room/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error in fetching room ${error.message}`);
  }
}

/*This function save a new booking to the database*/
export async function bookRoom(roomId, booking) {
  try {
    const response = await axios.post(
      `${baseURL}bookings/room/${roomId}/booking`,
      booking
    );
    return response.data;
  } catch (error) {
    if (error?.response?.data) {
      throw new Error(error?.response?.data);
    } else {
      throw new Error(`Error booking room : ${error.message}`);
    }
  }
}

/*This function gets all bookings from the database*/
export async function getAllBookings() {
  try {
    const result = await axios.get(`${baseURL}bookings/all-bookings`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

/*This function get booking by the confirmation code from the database*/
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await axios.get(
      `${baseURL}bookings/confirmation/${confirmationCode}`
    );
    return result.data;
  } catch (error) {
    if (error?.response?.data) {
      throw new Error(error?.response?.data);
    } else {
      throw new Error(`Error find booking : ${error.message}`);
    }
  }
}

/*This function cancels booking*/
export async function cancelBooking(bookingId) {
  try {
    const result = await axios.delete(
      `${baseURL}bookings/booking/${bookingId}/delete`
    );
    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling booking : ${error.message}`);
  }
}

/*This function gets all available rooms from the database with a given date and a room type*/
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  try {
    const result = await axios.get(
      `${baseURL}rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`
    );
    return result;
  } catch (error) {
    throw new Error(`Error cancelling booking : ${error.message}`);
  }
}

/* This function register a new user */
export async function registerUser(registration) {
  try {
    const response = await axios.post(
      `${baseURL}auth/register-user`,
      registration
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* This function login a registered user */
export async function loginUser(login) {
  try {
    const response = await axios.post(`${baseURL}auth/login`, login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/* This function sends a reset password link to the user with the specified email */
export async function forgotPassword(email) {
  try {
    return axios.post(`${baseURL}auth/password-reset-request`, { email });
  } catch (error) {
    throw error;
  }
}
/* This function resets the password of the user in the database */
export async function resetPassword(newPassword, token) {
  try {
    return axios.post(`${baseURL}auth/reset-password?token=${token}`, {
      newPassword,
    });
  } catch (error) {
    throw error;
  }
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
  try {
    const response = await axios.get(`${baseURL}users/profile/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
  try {
    const response = await axios.delete(`${baseURL}users/delete/${userId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
  try {
    const response = await axios.get(`${baseURL}users/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
  try {
    const response = await axios.get(
      `${baseURL}bookings/user/${userId}/bookings`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    throw new Error("Failed to fetch bookings");
  }
}

/* This is the function saves the profilePicture of the user to the database */
export async function saveProfilePicture(formData, userId) {
  try {
    const response = await axios.put(
      `${baseURL}users/updateUserProfilePicture/${userId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error saving profile picture:", error.message);
    throw new Error("Failed to save profile picture");
  }
}

/* This is the function saves the profile details of the user to the database */
export async function saveUserDetails(userId, user) {
  try {
    const response = await axios.put(
      `${baseURL}users/updateUserProfileDetails/${userId}`,
      user
    );
    return response.data;
  } catch (error) {
    console.error("Error saving profile details:", error.message);
    throw new Error("Failed to save profile details");
  }
}

/* This is a function that get access to admin routes */
export async function getAdminRoute() {
  try {
    const response = await axios.get(`${baseURL}admin/getAdminRoutes`);
    return response.data;
  } catch (error) {
    console.error("Error getting admin route:", error.message);
    throw error;
  }
}

/* This function check the jwt token expiration time */
export async function checkTokenExpiration() {
  try {
    const response = await axios.get(`${baseURL}auth/checkToken`);
    return response.data;
  } catch (error) {
    console.error("Error checking token:", error.message);
    throw error;
  }
}

/* This function gets all the roles from the database */
export async function getAllRoles() {
  try {
    return axios.get(`${baseURL}roles/all-roles`);
  } catch (error) {
    throw error;
  }
}

/* This function adds a new role to the database */
export async function addRole(name) {
  try {
    return axios.post(`${baseURL}roles/create-new-role`, { name });
  } catch (error) {
    throw error;
  }
}

/* This function deletes a role from the database */
export async function deleteRole(roleId) {
  try {
    return axios.delete(`${baseURL}roles/delete/${roleId}`);
  } catch (error) {
    throw error;
  }
}

/* This function gets all users from the database */
export async function getAllUsers() {
  try {
    return axios.get(`${baseURL}users/all`);
  } catch (error) {
    throw error;
  }
}

/* This function assigns role with roleId to user with userId */
export async function assignUserToRole(userId, roleId) {
  try {
    return axios.post(
      `${baseURL}roles/assign-user-to-role?userId=${userId}&roleId=${roleId}`
    );
  } catch (error) {
    throw error;
  }
}

/* This function removes role with roleId from user with userId */
export async function removeUserFromRole(userId, roleId) {
  try {
    return axios.post(
      `${baseURL}roles/remove-user-from-role?userId=${userId}&roleId=${roleId}`
    );
  } catch (error) {
    throw error;
  }
}

/* This function removes all users from role */
export async function removeAllUsersFromRole(roleId) {
  try {
    return axios.post(`${baseURL}roles/remove-all-users-from-role/${roleId}`);
  } catch (error) {
    throw error;
  }
}
