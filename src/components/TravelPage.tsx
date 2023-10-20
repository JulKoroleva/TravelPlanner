import React, { useState, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import TripPlanItem from "./TripPlanItem";
import AddPlanItemForm from "./AddPlanItemForm";
import TravelList from "./TravelList";
import { Travel, PlanItem } from "../types";
import { editTravel, deletePlanItem, selectTravel } from "../redux/actions";
import geoPoint from "../images/geoloc.png";
import downScroll from "../images/buttons/down.png";
import TravelDefaultImg from "../images/default/travel/defailt_landscape.jpg";
import plusBtn from "../images/buttons/plus.png";
interface TravelPageProps {
  travel: Travel;
}

const TravelPage: React.FC<TravelPageProps> = ({ travel }) => {
  const isMobile = useSelector((state: any) => state.isMobile);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const isGrid: boolean = false;
  const travels = useSelector((state: any) => state.travels);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const [currentTravelData, setCurrentTravelData] = useState(travel);
  const [savedTravelData, setSavedTravelData] = useState(JSON.parse(localStorage.getItem("selectedTravel") || "{}"));
  const sectionRef = useRef<HTMLDivElement>(null);
  const pageTopRef = useRef<HTMLDivElement>(null);
  const [editState, setEditState] = useState<{
    name: { editing: boolean; value: string };
    description: { editing: boolean; value: string };
    budget: { editing: boolean; value: number };
  }>({
    name: { editing: false, value: travel.name },
    description: { editing: false, value: travel.description },
    budget: { editing: false, value: travel.budget },
  });



  const [remainingBudget, setRemainingBudget] = useState(
    travel.remainingBudget
  );
  const [plan, setPlan] = useState(travel.plan);

  useEffect(() => {
    if (travel) {
      setCurrentTravelData(travel);
      setEditState({
        name: { editing: false, value: travel.name },
        description: { editing: false, value: travel.description },
        budget: { editing: false, value: travel.budget },
      });
    }
  }, [travel]);

  useEffect(() => {
    // Calculate remaining budget whenever the plan changes
    const totalSpent = plan.reduce((acc, item) => acc + item.amount, 0);
    const remainingBudget = travel.budget - totalSpent;
    setRemainingBudget(remainingBudget);
  }, [plan, travel.budget]);

  useEffect(() => {
    setPlan(travel.plan);
  }, [travel.plan]);

  const handleAddPlanItem = (newPlanItem: PlanItem) => {
    setPlan([...plan, newPlanItem]);
    setCurrentTravelData((prevTravel) => ({
      ...prevTravel,
      plan: [...prevTravel.plan, newPlanItem],
    }));
    setIsFormVisible(!isFormVisible);
  };

  const handleFieldChange = (field: string, value: string | number) => {
    if (field === "budget" && typeof value === "string") {
      value = parseFloat(value.replace(/[^\d,]/g, "")) || 0;
    }

    setEditState((prevEditState) => ({
      ...prevEditState,
      [field]: { ...prevEditState[field as keyof typeof prevEditState], value },
    }));
  };
  const handleFieldBlur = (field: keyof typeof editState) => {
    dispatch(
      editTravel({
        ...currentTravelData,
        [field]: editState[field].value,
      })
    );

    setEditState((prevEditState) => ({
      ...prevEditState,
      [field]: { ...prevEditState[field], editing: false },
    }));

    setCurrentTravelData((prevTravel) => ({
      ...prevTravel,
      [field]: editState[field].value,
    }));
  };

  const handleEdit = (field: keyof typeof editState) => {
    setEditState((prevEditState) => ({
      ...prevEditState,
      [field]: { ...prevEditState[field], editing: true },
    }));
  };
  useEffect(() => {
    if (editState.description.editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [editState.description.editing]);

  const handleDeletePlanItem = (planItemId: number) => {
    dispatch(deletePlanItem(travel.id, planItemId));
    const updatedPlan = plan.filter((item) => item.id !== planItemId);
    setPlan(updatedPlan);
    setCurrentTravelData((prevTravel) => ({
      ...prevTravel,
      plan: updatedPlan,
    }));
    dispatch(editTravel({ ...travel, plan: updatedPlan }));
  };

  const handleSelectPlanItem = (planItemId: number) => {
    console.log(`Выбран элемент плана с id ${planItemId}`);
  };

  const handleToggleFavorite = (planItemId: number) => {
    const updatedPlan = plan.map((item) =>
      item.id === planItemId ? { ...item, isFavorite: !item.isFavorite } : item
    );
    setPlan(updatedPlan);
    setCurrentTravelData((prevTravel) => ({
      ...prevTravel,
      plan: updatedPlan,
    }));
    dispatch(editTravel({ ...travel, plan: updatedPlan }));
  };

  const handleUpdatePlanItemImage = (planItemId: number, imageUrl: string) => {
    const updatedPlan = plan.map((item) =>
      item.id === planItemId ? { ...item, placeImage: imageUrl } : item
    );
    setPlan(updatedPlan);
    setCurrentTravelData((prevTravel) => ({
      ...prevTravel,
      plan: updatedPlan,
    }));
    dispatch(editTravel({ ...travel, plan: updatedPlan }));
  };

  const formatDateForDisplay = (date: string): string => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleScrollDown = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const scrollToTop = () => {
      if (pageTopRef.current) {
        pageTopRef.current.scrollIntoView({ behavior: "auto" });
      }
    };

    scrollToTop();
  }, [travel]);


  const compareDates = (a: string, b: string): number => {
    const dateA = new Date(a);
    const dateB = new Date(b);
  
    if (dateA < dateB) {
      return -1;
    } else if (dateA > dateB) {
      return 1;
    } else {
      return 0;
    }
  };

  return (
    <>
    
      <div
        ref={pageTopRef}
        style={{
          display: "flex",
          flexDirection: "row",
          position: "relative",
          width: "70vw",
          marginRight: "auto",
        }}
      >
        {travel !== null ? (
        <div>
          <div className="travel-info__container">
            <div
              className="container-bg"
              style={{
                backgroundImage: `url(${
                  travel.placeImage || TravelDefaultImg
                })`,
                width: "100%",
                height: "100%",
                backgroundSize: "cover",
              }}
            ></div>
            <div>
              <div className="field__container">
                {editState.name.editing ? (
                  <input
                    type="text"
                    maxLength={10}
                    value={editState.name.value}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    onBlur={() =>
                      handleFieldBlur("name" as keyof typeof editState)
                    }
                    autoFocus
                    className="input__name"
                  />
                ) : (
                  <h3
                    className="travel__name"
                    onClick={() => handleEdit("name" as keyof typeof editState)}
                  >
                    {currentTravelData.name}
                  </h3>
                )}
              </div>
              {travel?.place ? (
                <h2 style={{ textAlign: "center" }}>
                  {travel.place}{" "}
                  <img
                    src={geoPoint}
                    alt="geolocation"
                    style={{ width: "15px" }}
                  ></img>
                </h2>
              ) : (
                <h2 style={{ color: "red", textAlign: "center" }}>
                  <strong>Выберите место</strong>
                  <img
                    src={geoPoint}
                    alt="geolocation"
                    style={{ width: "15px" }}
                  ></img>
                </h2>
              )}
              <p>
                {formatDateForDisplay(currentTravelData.startDate)} —{" "}
                {formatDateForDisplay(currentTravelData.endDate)}
              </p>
            </div>
            <div className="field__container">
              {editState.description.editing ? (
                <>
                  <textarea
                    ref={textareaRef}
                    className="input__description"
                    value={editState.description.value}
                    maxLength={200}
                    onChange={(e) =>
                      handleFieldChange("description", e.target.value)
                    }
                    onBlur={() =>
                      handleFieldBlur("description" as keyof typeof editState)
                    }
                    autoFocus
                  />
                </>
              ) : (
                <h2
                  className="travel__description"
                  onClick={() =>
                    handleEdit("description" as keyof typeof editState)
                  }
                >
                  {currentTravelData.description}
                </h2>
              )}
            </div>
            <div className="field__container">
              {editState.budget.editing ? (
                <input
                  type="text"
                  value={`₽${editState.budget.value.toLocaleString("ru-RU")}`}
                  onChange={(e) =>
                    handleFieldChange(
                      "budget",
                      e.target.value.replace(/\D/g, "").slice(0, 7)
                    )
                  }
                  onBlur={() =>
                    handleFieldBlur("budget" as keyof typeof editState)
                  }
                  autoFocus
                  className="input__budget"
                />
              ) : (
                <h3
                  className="travel__budget"
                  onClick={() => handleEdit("budget" as keyof typeof editState)}
                >
                  Бюджет: {`₽${editState.budget.value.toLocaleString("en-US")}`}
                </h3>
              )}
            </div>
            <div className="scroll-down"></div>
            <img
              className="scroll-down__btn"
              onClick={handleScrollDown}
              src={downScroll}
              alt=""
              style={{
                position: "absolute",
                bottom: "10px",
                opacity: "0.2",
              }}
            />
          </div>

          <section className="plan-list__container section" ref={sectionRef}>
            <div
              className="container__blur"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  marginTop: "3vw",
                  fontFamily: "Georgia, serif",
                  textTransform: "uppercase",
                  color:'#6c6c72'
                }}
              >
                План путешествия
              </h2>
              <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="add-btn__plan"
              >
                <img src={plusBtn} style={{ width: "45%", opacity: "0.7" }} />
              </button>
            </div>

            <div
              style={{
                position: "relative",
                display: "flex",
                width: "100%",
                height: "100%",
              }}
            >
              <AddPlanItemForm
                selectedTravel={travel}
                onAddPlanItem={handleAddPlanItem}
              />

              <div
                className={
                  isFormVisible ? "container__blur-up" : "container__blur-down"
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {currentTravelData.plan.sort((a, b) => compareDates(a.date, b.date)).map((planItem: PlanItem) => (
                  <TripPlanItem
                    key={planItem.id}
                    planItem={planItem}
                    travelBudget={remainingBudget}
                    onDelete={() => handleDeletePlanItem(planItem.id)}
                    onSelect={() => handleSelectPlanItem(planItem.id)}
                    onToggleFavorite={() => handleToggleFavorite(planItem.id)}
                    onUpdateImage={(imageUrl) =>
                      handleUpdatePlanItemImage(planItem.id, imageUrl)
                    }
                  />
                ))}
                {currentTravelData.plan.length > 0 && (
                  <div
                    className="total-price"
                    style={{ margin: "20px auto auto" }}
                  >
                    <h2 style={{ margin: "0 10px" }}>Остаток:</h2>
                    <h1
                      style={{ color: remainingBudget < 0 ? "red" : "green" }}
                    >
                      {remainingBudget}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
        ) : (
        // JSX, который отображается, если travel === null
        <p>Выберите путешествие</p>
      )}
        <div>
          <TravelList travels={travels} isGrid={isGrid} />
        </div>
      </div>
    </>
  );
};

export default TravelPage;
