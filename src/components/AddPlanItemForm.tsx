import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AutocompletePlaceInput from "./AutocompletePlaceInput";
import { PlanItem } from "../types";
import { addPlanItem } from "../redux/actions";

interface AddPlanItemFormProps {
  selectedTravel: any;
  onAddPlanItem: (newPlanItem: PlanItem) => void;
}

const AddPlanItemForm: React.FC<AddPlanItemFormProps> = ({
  selectedTravel,
  onAddPlanItem,
}) => {
  const dispatch = useDispatch();
  const [newPlanItem, setNewPlanItem] = useState<PlanItem>({
    id: Date.now(),
    name: "",
    date: new Date().toISOString().split("T")[0],
    place: "",
    placeImage: "",
    description: "",
    budget: 100,
    amount: 100,
    isFavorite: false,
  });

  const handleAddPlanItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPlanItem.place) {
      return;
    }

    const planItem: PlanItem = {
      ...newPlanItem,
      amount: newPlanItem.amount,
    };

    console.log("handleAddPlanItem.amount:", planItem.amount);
    onAddPlanItem(planItem);
    dispatch(addPlanItem(selectedTravel.id, planItem));

    console.log("AddPlanItemForm.amount BEFORE:", newPlanItem.amount);
    console.log("NewPlanItem", newPlanItem);
    console.log("AddPlanItemForm.amount AFTER:", newPlanItem.amount);

    setNewPlanItem({
      id: Date.now(),
      name: "",
      date: new Date().toISOString().split("T")[0],

      place: "",
      placeImage: "",
      description: "",
      budget: 100,
      amount: 100,
      isFavorite: false,
    });
  };

  const handlePlaceSelected = (
    selectedPlace: string,
    selectedPlaceImage: string
  ) => {
    const trimmedPlace = selectedPlace.split(",")[0].trim();

    setNewPlanItem((prevPlanItem) => ({
      ...prevPlanItem,
      place: trimmedPlace,
      placeImage: selectedPlaceImage,
    }));

    console.log("Selected Place:", trimmedPlace);
    console.log("Selected Place Image:", selectedPlaceImage);
  };
  return (
    <form className="form__add-plan" onSubmit={handleAddPlanItem}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <h2 className="form__title">Добавить новый пункт</h2>
        <AutocompletePlaceInput onPlaceSelected={handlePlaceSelected} />
        <label className="form__add-plan_label">
          Дата
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            max="2040-12-31"
            value={newPlanItem.date}
            className="form__input"
            style={{ width: "100px" }}
            onChange={(e) =>
              setNewPlanItem({ ...newPlanItem, date: e.target.value })
            }
            required
          />
        </label>
        <label className="form__add-plan_label" style={{ marginTop: "15px" }}>
          Описание
          <textarea
            maxLength={200}
            value={newPlanItem.description}
            className="form__input"
            style={{
              maxHeight: "150px",
              height: "70px",
              padding: "0",
              marginTop: "0px",
              borderTop: "1px solid rgba(95, 94, 94, 0.321)",
            }}
            onChange={(e) =>
              setNewPlanItem({ ...newPlanItem, description: e.target.value })
            }
            required
          />
        </label>
        <label className="form__add-plan_label">
          Стоимость
          <input
            type="number"
            value={newPlanItem.amount}
            className="form__input"
            style={{
              width: "100px",
              fontSize: "18px",
              fontWeight: "700",
              textAlign: "center",
            }}
            onChange={(e) =>
              setNewPlanItem((prevPlanItem) => ({
                ...prevPlanItem,
                amount: parseFloat(
                  e.target.value.replace(/\D/g, "").slice(0, 7)
                ),
              }))
            }
            required
          />
        </label>
        <button className="add-plan__btn" type="submit">
          СОЗДАТЬ
        </button>
      </div>
    </form>
  );
};
export default AddPlanItemForm;
