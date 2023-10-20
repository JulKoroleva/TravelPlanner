import React from "react";
import { Travel } from "../types";
import geoPoint from "../images/geoloc.png";
import TravelDefaultImg from "../images/default/travel/defailt_landscape.jpg";
interface TravelItemProps {
  travel: any;
}

const TravelItem: React.FC<TravelItemProps> = ({ travel }) => {
  const formatDateForDisplay = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };
  return (
    <div className="travel-item">
      <div
        className="container-bg__item"
        style={{
          backgroundImage: `url(${travel.placeImage || TravelDefaultImg})`,
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
        }}
      ></div>
      <h2>{travel.name}</h2>
      {travel?.place && (
        <h2>
          {travel.place}{" "}
          <img src={geoPoint} alt="geolocation" style={{ width: "15px" }}></img>
        </h2>
      )}
      <p>
        {formatDateForDisplay(travel.startDate)} — {formatDateForDisplay(travel.endDate)}
      </p>
    </div>
  );
};

export default TravelItem;
