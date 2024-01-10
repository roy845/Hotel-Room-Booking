import React, { useEffect, useState } from "react";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";
import { HTTP_200_OK } from "../constants/httpStatusCodes";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";

const EditRoom = () => {
  const [Room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const isButtonDisabled = !Room.photo || !Room.roomPrice || !Room.roomType;

  const { roomId } = useParams();

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }

    setRoom({ ...Room, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    const name = e.target.name;
    setRoom({ ...Room, [name]: selectedImage });
    if (selectedImage) {
      setImagePreview(URL.createObjectURL(selectedImage));
    } else {
      setImagePreview("");
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const roomData = await getRoomById(roomId);
        setRoom(roomData);
        setImagePreview(`data:image/png;base64, ${roomData.photo}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await updateRoom(roomId, Room);
      setRoom(response);
      if (response.status === HTTP_200_OK) {
        setSuccessMessage("Room updated successfully!");
        const updatedRoomData = await getRoomById(roomId);

        setImagePreview(`data:image/png;base64, ${updatedRoomData.photo}`);
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <h2 className="mt-5 mb-2">Update\View Room</h2>

            {successMessage && (
              <div className="alert alert-success fade show">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>
                <RoomTypeSelector
                  handleRoomInputChange={handleRoomInputChange}
                  newRoom={Room}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="roomPrice" className="form-label">
                  Room Price
                </label>
                <input
                  className="form-control"
                  required
                  type="number"
                  id="roomPrice"
                  name="roomPrice"
                  value={Room.roomPrice}
                  onChange={handleRoomInputChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Room Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  required
                  id="photo"
                  name="photo"
                  onChange={handleImageChange}
                />

                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview Room Photo"
                    style={{
                      marginTop: "30px",
                      maxHeight: "400px",
                      maxWidth: "400px",
                    }}
                    className="mt-3"
                  />
                )}
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-center mt-2">
                <Link
                  to={"/existing-rooms"}
                  className="btn btn-outline-info ml-5"
                >
                  Back
                </Link>
                <button
                  disabled={isButtonDisabled}
                  className={`btn btn-outline-warning ml-5${
                    isButtonDisabled ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  Update Room
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditRoom;
