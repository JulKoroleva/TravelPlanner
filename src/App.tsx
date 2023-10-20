import React, { useEffect,useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setIsMobile } from "./redux/actions";
import TravelList from "./components/TravelList";
import TravelPage from "./components/TravelPage";

const App: React.FC = () => {
  const travels = useSelector((state: any) => state.travels);
  const selectedTravel = useSelector((state: any) => state.selectedTravel);
  const isGrid: boolean = true;
  const dispatch = useDispatch();
  const [savedTravelData, setSavedTravelData] = useState(JSON.parse(localStorage.getItem("selectedTravel") || "{}"));
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 850;
      dispatch(setIsMobile(isMobile));
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div className="page">
      <Routes>
        <Route
          path="/"
          element={<TravelList travels={travels} isGrid={isGrid} />}
        />
        <Route
          path="/travel"
          element={<TravelPage travel={selectedTravel || savedTravelData} />}
        />
      </Routes>
    </div>
  );
};

export default App;
