// AddTravelBtn.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTravel } from "../redux/actions";
import AddTravelFormModal from "./AddTravelFormModal";
import AutocompletePlaceInput from "./AutocompletePlaceInput";
import { Travel } from "../types";
import plusBtn from "../images/buttons/plus.png";
interface AddBtnProps {
  isGrid: boolean;
}

const AddTravelBtn: React.FC<AddBtnProps> = ({ isGrid }) => {
  const dispatch = useDispatch();
  const [newTravel, setNewTravel] = useState<Travel>({
    id: Date.now(),
    name: "",
    description: "",
    place: "",
    placeImage: "",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    budget: 100,
    remainingBudget: 0,
    plan: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTravelForm, setIsTravelForm] = useState(true);
  const [placeError, setPlaceError] = useState<string>("");
  const [dateError, setDateError] = useState<string>("");

  const isDateValid = (date: string): boolean => {
    const currentDate = new Date();
    const selectedDate = new Date(date);

    return (
      selectedDate >= currentDate &&
      selectedDate.getFullYear() <= currentDate.getFullYear() + 10
    );
  };

  const resetForm = () => {
    setNewTravel({
      id: Date.now(),
      name: "",
      description: "",
      place: "",
      placeImage: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      budget: 100,
      remainingBudget: 0,
      plan: [],
    });
    setPlaceError("");
    setDateError("");
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isDateValid(newTravel.startDate) || !isDateValid(newTravel.endDate)) {
      setDateError("Invalid date input");
      setDateError("Invalid date input");
      return;
    }

    if (newTravel.startDate > newTravel.endDate) {
      setDateError("Invalid date input");
      setDateError("Invalid date input");
      return;
    }

    if (!newTravel.place) {
      console.log("Selected place is empty");
      setPlaceError("Selected place is empty")
      return;
    }

    dispatch(addTravel(newTravel));
    setPlaceError("");
    setDateError("");
    resetForm();
  };

  const handlePlaceSelected = (
    selectedPlace: string,
    selectedPlaceImage: string
  ) => {
    const trimmedPlace = selectedPlace.split(",")[0].trim();
    setNewTravel((prevTravel) => ({
      ...prevTravel,
      place: trimmedPlace,
      placeImage: selectedPlaceImage,
    }));
    setPlaceError("");
    console.log("Selected Place:", trimmedPlace);
    console.log("Selected Place Image:", selectedPlaceImage);
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        className={isGrid ? "add-btn__travel_grid" : "add-btn__travel_flex"}
      >
        {isGrid ? (
          <img
            className={"add-btn__travel_img"}
            src={plusBtn}
          />
        ) : (
          <img
            src={plusBtn}
            style={{ width: "5%", opacity: "0.4" }}
          />
        )}
      </button>
      {isModalOpen && (
        <div
          className={isGrid ? "modal-overlay_grid" : "modal-overlay_flex"}
          onClick={resetForm}
        >
          <AddTravelFormModal
            onClose={() => setIsModalOpen(false)}
            isGrid={isGrid}
          >
            <form className="form__add-travel" onSubmit={handleSubmit}>
              <h1 className="form__title">Добавить путешествие</h1>
              <label className="form__add-travel_label">
                Название
                <input
                  type="text"
                  minLength={5}
                  maxLength={10}
                  className="form__input"
                  value={newTravel.name}
                  onChange={(e) =>
                    setNewTravel({ ...newTravel, name: e.target.value })
                  }
                  required
                />
              </label>
              <AutocompletePlaceInput
                isTravelForm={isTravelForm}
                onPlaceSelected={handlePlaceSelected}
                placeError={placeError}
              />
              <label className="form__add-travel_label">
                Описание
                <textarea
                  maxLength={200}
                  className="form__input"
                  value={newTravel.description}
                  onChange={(e) =>
                    setNewTravel({ ...newTravel, description: e.target.value })
                  }
                  required
                />
              </label>
              <label className="form__add-travel_label">Дата</label>
              <div className="form__date-container">
                <label
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  с
                  <input
                    style={{
                      width: "100%",
                      marginTop: "0",
                      marginLeft: "15px",
                      marginRight: "15px",
                      color: `${dateError ? "red" : "black"}`,
                    }}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    max="2040-12-31"
                    className="form__input"
                    value={newTravel.startDate}
                    onBlur={() => setDateError("")}
                    onChange={(e) =>
                      setNewTravel({ ...newTravel, startDate: e.target.value })
                    }
                    required
                  />
                </label>

                <label
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  по
                  <input
                    style={{
                      width: "100%",
                      marginTop: "0",
                      marginLeft: "15px",
                      color: `${dateError ? "red" : "black"}`,
                    }}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    max="2040-12-31"
                    className="form__input"
                    value={newTravel.endDate}
                    onChange={(e) =>
                      setNewTravel({ ...newTravel, endDate: e.target.value })
                    }
                    required
                  />
                </label>
                {/* {dateError && <p style={{ color: "red" }}>{dateError}</p>} */}
              </div>
              <label className="form__add-travel_label">
                Бюджет
                <input
                  type="number"
                  className="form__input"
                  value={newTravel.budget}
                  onChange={(e) =>
                    setNewTravel({
                      ...newTravel,
                      budget: parseFloat(e.target.value) || 0,
                    })
                  }
                  required
                />
              </label>
              <button type="submit" className="add-travel__btn">
                создать
              </button>
            </form>
          </AddTravelFormModal>
        </div>
      )}
    </>
  );
};

export default AddTravelBtn;
