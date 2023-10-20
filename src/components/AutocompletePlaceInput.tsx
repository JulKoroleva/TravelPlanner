// AutocompletePlaceInput.tsx
import React, { useState } from "react";

interface Prediction {
  place_id: string;
  display_name: string;
}

interface AutocompletePlaceInputProps {
  onPlaceSelected: (selectedPlace: string, selectedPlaceImage: string) => void;
  isTravelForm?: boolean;
  placeError?: string;
}

const AutocompletePlaceInput: React.FC<AutocompletePlaceInputProps> = ({
  onPlaceSelected,
  isTravelForm,
  placeError,
}) => {
  const [place, setPlace] = useState("");
  const [selectedPlaceImage, setSelectedPlaceImage] = useState<string>("");
  const [isPlaceListActive, setIsPlaceListActive] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    console.log("inputValue:", inputValue);
    setPlace(inputValue);

    if (inputValue.trim() !== "") {
      // Fetch predictions from OpenStreetMap Nominatim API
      fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${inputValue}`
      )
        .then((response) => response.json() as Promise<Prediction[]>)
        .then((data) => setPredictions(data))
        .catch((error) => console.error("Error fetching predictions:", error));
    } else {
      setPredictions([]);
    }
    console.log("predictions:", predictions);
  };

  const handlePlaceSelect = (selectedPlace: string) => {
    setPlace(selectedPlace);
    setPredictions([]);
    const placeName = selectedPlace.split(",")[0].trim();
    console.log("handlePlaceSelect", selectedPlace);
    // Fetch image from Google Custom Search API
    const apiKey = "AIzaSyA3EV2OqG2KPmix_eCwWn4TYU4XOmaqTO4";
    const cx = "c1d56ba381a374d95";
    if (selectedPlace) {
      fetch(
        `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
          placeName
        )}&searchType=image&key=${apiKey}&cx=${cx}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.items && data.items.length > 0) {
            setSelectedPlaceImage(data.items[0].link);
            // Pass the selected place and image to the parent component
            onPlaceSelected(selectedPlace, data.items[0].link);
          }
        })
        .catch((error) => console.error("Error fetching place image:", error));
    }
  };

  const handleInputFocus = () => {
    setIsPlaceListActive(true);
  };

  const handleInputBlur = () => {
    setIsPlaceListActive(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <label
        className={
          isTravelForm ? "form__add-travel_label" : "form__add-plan_label"
        }
      >
        Место
        <input
          type="text"
          value={place}
          className={placeError !== "" && isTravelForm ? "error" : "form__input"}
          onChange={handlePlaceChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          required
        />
      </label>
      <ul className={`place-list ${isPlaceListActive ? "active" : ""}`}>
        {predictions.map((prediction) => (
          <li
            className="place-list__place"
            key={prediction.place_id}
            onMouseDown={() => handlePlaceSelect(prediction.display_name)}
          >
            {prediction.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AutocompletePlaceInput;
