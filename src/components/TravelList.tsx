// src/components/TravelList.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TravelItem from "./TravelItem";
import AddTravelBtn from "./AddTravelBtn";
import PhotoSlider from "./PhotoSlider";
import { selectTravel, deleteTravel } from "../redux/actions";
import deleteBtn from "../images/buttons/delete_btn.png";
import closeMenuBtn from "../images/buttons/closeMenu.png";
import mainPageBtn from "../images/buttons/mainPage.png";
import menuMobile from "../images/buttons/menuMobile.png";

interface TravelListProps {
  travels: any[];
  isGrid: boolean;
}

const TravelList: React.FC<TravelListProps> = ({ travels, isGrid }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useSelector((state: any) => state.isMobile);
  const [hoveredTravel, setHoveredTravel] = useState(null);

  const handleSelectTravel = (travel: any) => {
    console.log("Selected travel:", travel);
    dispatch(selectTravel(travel));
  };

  const handleDeleteSelectedTravel = (travel: any) => {
    dispatch(deleteTravel(travel.id));
  };

  const handleOpenMenu = () => {
    document
      .querySelector(".travel-list-is-mobile")
      ?.classList.toggle("active");
  };
  return (
    <>
      {isGrid === true ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100vw",
            }}
          >
            <PhotoSlider isMobile={isMobile} />
            <div className="travel-list-grid">
              <div className="list-grid">
                <AddTravelBtn isGrid={isGrid} />
                {travels.length > 0 ? (
                  travels.map((travel) => (
                    <div
                      style={{ position: "relative" }}
                      key={travel.id}
                      onMouseEnter={() => setHoveredTravel(travel)}
                      onMouseLeave={() => setHoveredTravel(null)}
                    >
                      {hoveredTravel === travel && (
                        <div
                          className="delete__btn"
                          style={{ backgroundImage: `url(${deleteBtn})` }}
                          onClick={() => handleDeleteSelectedTravel(travel)}
                        ></div>
                      )}
                      <Link to={`/travel`} style={{ textDecoration: "none" }}>
                        <div onClick={() => handleSelectTravel(travel)}>
                          <TravelItem travel={travel} />
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p style={{ display: "flex", justifyContent:'center', alignItems:'center'}}>
                    Пусто! Добавьте новое путешествие.
                  </p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {isMobile && (
            <button
              onClick={handleOpenMenu}
              className="open-travel-list__btn"
              style={{ backgroundImage: `url(${menuMobile})` }}
            ></button>
          )}
          <div
            className={
              isMobile
                ? "travel-list-is-mobile travel-list-flex"
                : "travel-list-flex"
            }
          >
            <div className="list-flex">
              {isMobile && (
                <button
                  style={{ backgroundImage: `url(${mainPageBtn})` }}
                  className="main-page__btn"
                  onClick={() => navigate('/')}
                ></button>
              )}
              {isMobile && (
                <button
                  style={{ backgroundImage: `url(${closeMenuBtn})` }}
                  className="close-menu__btn"
                  onClick={handleOpenMenu}
                ></button>
              )}
              <AddTravelBtn isGrid={isGrid} />
              {travels.map((travel) => (
                <div
                  style={{ position: "relative" }}
                  key={travel.id}
                  onMouseEnter={() => setHoveredTravel(travel)}
                  onMouseLeave={() => setHoveredTravel(null)}
                >
                  {hoveredTravel === travel && (
                    <div
                      className="delete__btn"
                      style={{ backgroundImage: `url(${deleteBtn})` }}
                      onClick={() => handleDeleteSelectedTravel(travel)}
                    ></div>
                  )}
                  <Link to={`/travel`} style={{ textDecoration: "none" }}>
                    <div onClick={() => handleSelectTravel(travel)}>
                      <TravelItem travel={travel} />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TravelList;
