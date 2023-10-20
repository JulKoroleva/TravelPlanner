import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePlanItemImage } from "../redux/actions";
import ImageModal from "./ImageModal";

import { PlanItem } from "../types";
import PlanDefaultImg from "../images/default/plan/plan-img_default.png";
import starDisable from "../images/buttons/star_disable.png";
import starActive from "../images/buttons/star_active.png";
import deleteBtn from "../images/buttons/delete_btn.png";
import downloadBtn from "../images/buttons/downloadBtn.png";
interface TripPlanItemProps {
  planItem: PlanItem;
  travelBudget: number;
  onDelete: () => void;
  onSelect: () => void;
  onToggleFavorite: () => void;
  onUpdateImage: (imageUrl: string) => void;
}

const TripPlanItem: React.FC<TripPlanItemProps> = ({
  planItem,
  travelBudget,
  onDelete,
  onSelect,
  onToggleFavorite,
  onUpdateImage
}) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [warningMessage, setWarningMessage] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    console.log("planItem.amount:", planItem.amount);
    console.log("travelBudget:", travelBudget);
    if (planItem.amount > travelBudget * 1) {
      setWarningMessage(true);
    } else {
      setWarningMessage(false);
    }
  }, [planItem.amount, travelBudget]);

  const formatDateForDisplay = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSubmitModal = () => {
    onUpdateImage(imageUrl);
    setIsModalOpen(false);
  };


  return (
    <div
      className="plan-item"
      onMouseMove={() => setIsHovered(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setIsHovered(false);
        }, 1000)
       
      }
    >
      {planItem.isFavorite && (
        <img className="plan-item__isfavorite" src={starActive}></img>
      )}
      <div
        className="plan-item__img_container"
        style={{
          backgroundImage: `url(${planItem.placeImage || PlanDefaultImg})`,
        }}
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        {isImageHovered && (
          <>
          <button onClick={handleToggleModal} style={{backgroundImage:`url(${downloadBtn})`}} className="download__btn">
          </button>
         
        </>
        )}
      </div>
      {isModalOpen ? (
            <ImageModal
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              onSubmit={handleSubmitModal}
              onToggleModal={handleToggleModal}
            />
          ) : (
            <div className="plan-item__info_container">
            <h1 className="plan-item__name">{planItem.place}</h1>
            <p className="plan-item__date">{formatDateForDisplay(planItem.date)}</p>
            <p className="plan-item__description">{planItem.description}</p>
    
            {warningMessage && (
              <p className="warning-message" style={{ color: "red" }}>Не вписывается в бюджет</p>
            )}
          </div>
          )}
      
      <p className="plan-item__budget">стоимость: {planItem.amount}</p>

      <div className="plan-item__budget">стоимость: {planItem.amount}</div>
      {isHovered && (
        <div className="plan-item__btn-container">
          <button
            onMouseEnter={() => setIsHovered(true)}
            className="item_btn"
            style={{
              backgroundImage: `url(${
                planItem.isFavorite ? starActive : starDisable
              })`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
          ></button>
          <button
            onMouseEnter={() => setIsHovered(true)}
            className="item_btn"
            style={{ backgroundImage: `url(${deleteBtn})` }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          ></button>
        </div>
      )}
       
    </div>
  );
};

export default TripPlanItem;
