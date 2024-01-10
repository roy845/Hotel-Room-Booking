import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([""]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType !== "") {
      setRoomTypes([...roomTypes, newRoomType]);
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <>
      <div>
        <select
          id="roomType"
          name="roomType"
          value={newRoom.roomType}
          onChange={(e) => {
            if (e.target.value === "Add New") {
              setShowNewRoomTypeInput(true);
            } else {
              handleRoomInputChange(e);
            }
          }}
          className="form-select mb-3"
        >
          <option value={""}>Select a room type</option>
          <option value={"Add New"}>Add New</option>
          {roomTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
        {showNewRoomTypeInput && (
          <>
            <input
              className="form-control"
              type="text"
              placeholder="Enter a new room type"
              onChange={handleNewRoomTypeInputChange}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "5px",
              }}
            >
              <button
                className={!newRoomType ? "btn btn-disabled " : "btn btn-hotel"}
                type="button"
                disabled={!newRoomType}
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
              <button
                className="btn btn-danger"
                type="button"
                onClick={() => setShowNewRoomTypeInput(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RoomTypeSelector;
