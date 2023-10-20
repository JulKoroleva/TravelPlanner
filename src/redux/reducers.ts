// rootReducer.ts
import { Reducer } from "redux";
import { Travel } from "../types";
import { ActionTypes, Action } from "./actions";

const defaultTravels: Travel[] = [
  {
    id: 1,
    name: "Новый год",
    place: "Москва",
    placeImage:
      "https://xn--80aaacfpel4cc2n3b.xn--80adxhks/images/avtobusnaya_obzornaya_ekskursiya_po_moskve_1.jpg",
    description:
      "Москва — крупнейший по численности населения город России, является столицей страны и популярным туристическим центром. Самыми известными достопримечательностями Москвы являются: Кремль, Красная площадь, Собор Василия Блаженного, Останкинская телебашня, Мавзолей, Третьяковская галерея.",
    startDate: "2024-01-07",
    endDate: "2024-01-02",
    budget: 10000,
    remainingBudget: 1000,
    plan: [
      {
        id: 1,
        name: "Красная Площадь",
        date: "2024-01-02",
        place: "Красная Площадь",
        placeImage:
          "https://kudamoscow.ru/uploads/355444510694dde01323664ba5f2d942.png",
        description:
          "Каток на Красной площади работает с 29 ноября по 28 февраля с 09:00 до 23:00",
        budget: 400,
        amount: 400,
        isFavorite: true,
      },
      {
        id: 2,
        name: "ЦУМ",
        date: "2024-01-03",
        place: "ЦУМ",
        placeImage:
          "https://static.tildacdn.com/tild3433-3666-4464-b264-333465356365/noroot.png",
        description:
          "ЦУМ (Центральный универсальный магазин) расположен на углу Петровки и Театральной площади по адресу: ул. Петровка, дом 2.",
        budget: 5000,
        amount: 5000,
        isFavorite: true,
      },
      {
        id: 3,
        name: "Третьяковская галерея",
        date: "2024-01-04",
        place: "Третьяковская галерея",
        placeImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG9gGwCdhLTLuAa6DVguUn17LLnxq5Becb0A&usqp=CAU",
        description: "Главный музей национального искусства России.",
        budget: 500,
        amount: 500,
        isFavorite: false,
      },
      {
        id: 4,
        name: "«Москва-Сити»",
        date: "2024-01-05",
        place: "«Москва-Сити»",
        placeImage:
          "data:image/jpeg;base64,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",
        description: "Московский международный деловой центр «Москва-Сити».",
        budget: 3000,
        amount: 3000,
        isFavorite: false,
      },
    ],
  },
  {
    id: 2,
    name: "Покоряем Эверест",
    place: "Эверест",
    placeImage:
      "https://assets.editorial.aetnd.com/uploads/2013/05/gettyimages-1088050790.jpg",
    description:
      "Эверест — самая высокая точка планеты, высота — 8848 метров. Гора входит в горную систему Гималаи и лежит аккурат на границе между Китаем (северный склон) и Непалом (южный склон), благодаря чему совершить восхождение можно сразу из двух стран, на выбор.",
    startDate: "2023-05-08",
    endDate: "2023-05-20",
    budget: 100000,
    remainingBudget: 100000,
    plan: [],
  },
  {
    id: 3,
    name: "Тайланд",
    place: "Тайланд",
    placeImage:
      "data:image/jpeg;base64,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",
    description:
      "Таиланд поражает своим разнообразием. Это и высокие, покрытые лесом горы, и джунгли с редкими животными и экзотической растительностью, и реки с золотым песком, и лазурное море, и острова с первобытной прелестью природы. Более 60% территории страны занимают джунгли. Это лиственные леса, где самые распространенные растения - бамбук, тик, мангровые деревья, фикусы и пальмы. В лесах обитают белки, тигры, тапиры, носороги. На равнинах водятся дикие быки, буйволы, олени, антилопы.",
    startDate: "2024-07-01",
    endDate: "2024-07-10",
    budget: 500000,
    remainingBudget: 500000,
    plan: [],
  },
];

const loadTravelsFromLocalStorage = (): Travel[] => {
  const storedTravels = localStorage.getItem('travels');
  return storedTravels ? JSON.parse(storedTravels) : defaultTravels;
};

const saveTravelsToLocalStorage = (travels: Travel[]) => {
  localStorage.setItem('travels', JSON.stringify(travels));
};

interface AppState {
  travels: Travel[];
  selectedTravel: Travel | null;
  isMobile: boolean;
}

const initialState: AppState = {
  travels: [],
  selectedTravel: null,
  isMobile: false,
};

const rootReducer: Reducer<AppState, Action> = (
  state = { ...initialState, travels: loadTravelsFromLocalStorage() },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_TRAVEL:
      const newStateAdd = {
        ...state,
        travels: [...state.travels, action.payload],
      };
      saveTravelsToLocalStorage(newStateAdd.travels);
      return newStateAdd;

    case ActionTypes.EDIT_TRAVEL:
      const newStateEdit = {
        ...state,
        travels: state.travels.map((travel) =>
          travel.id === action.payload.id ? action.payload : travel
        ),
      };
      saveTravelsToLocalStorage(newStateEdit.travels);
      return newStateEdit;

    case ActionTypes.DELETE_TRAVEL:
      const newStateDelete = {
        ...state,
        travels: state.travels.filter((travel) => travel.id !== action.payload),
      };
      saveTravelsToLocalStorage(newStateDelete.travels);
      return newStateDelete;

    case ActionTypes.SELECT_TRAVEL:
      return {
        ...state,
        selectedTravel: action.payload,
      };

    case ActionTypes.DESELECT_TRAVEL:
      return {
        ...state,
        selectedTravel: null,
      };

    case ActionTypes.ADD_PLAN_ITEM:
      const currentTravelAdd = state.travels.find(
        (travel) => travel.id === action.payload.travelId
      );

      if (currentTravelAdd) {
        const totalSpentAdd = currentTravelAdd.plan.reduce(
          (acc, item) => acc + item.amount,
          0
        );
        const remainingBudgetAdd =
          currentTravelAdd.budget - (totalSpentAdd + action.payload.planItem.amount);

        const newStateAddPlanItem = {
          ...state,
          travels: state.travels.map((travel) =>
            travel.id === action.payload.travelId
              ? {
                  ...travel,
                  plan: [...travel.plan, { ...action.payload.planItem }],
                  remainingBudget: remainingBudgetAdd,
                }
              : travel
          ),
        };
        saveTravelsToLocalStorage(newStateAddPlanItem.travels);
        return newStateAddPlanItem;
      } else {
        return state;
      }

    case ActionTypes.DELETE_PLAN_ITEM:
      const { travelId, planItemId } = action.payload;
      const updatedTravelsDeletePlanItem = state.travels.map((travel) => {
        if (travel.id === travelId) {
          const updatedPlanDeletePlanItem = travel.plan.filter(
            (item) => item.id !== planItemId
          );
          const totalSpentDeletePlanItem = updatedPlanDeletePlanItem.reduce(
            (acc, item) => acc + item.amount,
            0
          );
          const remainingBudgetDeletePlanItem = travel.budget - totalSpentDeletePlanItem;
          const newStateDeletePlanItem = { ...travel, plan: updatedPlanDeletePlanItem, remainingBudget: remainingBudgetDeletePlanItem };
          return newStateDeletePlanItem;
        }
        return travel;
      });
      const newStateWithDeletePlanItem = { ...state, travels: updatedTravelsDeletePlanItem };
      saveTravelsToLocalStorage(newStateWithDeletePlanItem.travels);
      return newStateWithDeletePlanItem;

    case ActionTypes.EDIT_PLAN_ITEM:
      const { editedPlanItemId, isFavorite } = action.payload;

      const updatedPlansEditPlanItem = state.travels.map((travel) => {
        if (travel.id === editedPlanItemId) {
          const updatedPlanEditPlanItem = travel.plan.map((item) =>
            item.id === editedPlanItemId ? { ...item, isFavorite } : item
          );

          const totalSpentEditPlanItem = updatedPlanEditPlanItem.reduce(
            (acc, item) => acc + item.amount,
            0
          );
          const remainingBudgetEditPlanItem = travel.budget - totalSpentEditPlanItem;

          const newStateEditPlanItem = {
            ...travel,
            plan: updatedPlanEditPlanItem,
            remainingBudget: remainingBudgetEditPlanItem,
          };
          return newStateEditPlanItem;
        } else {
          return travel;
        }
      });

      const newStateWithEditPlanItem = { ...state, travels: updatedPlansEditPlanItem };
      saveTravelsToLocalStorage(newStateWithEditPlanItem.travels);
      return newStateWithEditPlanItem;

    case ActionTypes.UPDATE_PLAN_ITEM_IMAGE:
      const { planItemId: updatedPlanItemId, imageUrl } = action.payload;
      const updatedPlansImg = state.travels.map((travel) => {
        const updatedPlanUpdateImg = travel.plan.map((item) =>
          item.id === updatedPlanItemId
            ? { ...item, placeImage: imageUrl }
            : item
        );
        const newStateWithUpdateImg = { ...travel, plan: updatedPlanUpdateImg };
        return newStateWithUpdateImg;
      });
      const newStateWithUpdateImg = { ...state, travels: updatedPlansImg };
      saveTravelsToLocalStorage(newStateWithUpdateImg.travels);
      return newStateWithUpdateImg;

    case ActionTypes.SET_IS_MOBILE:
      const newStateSetIsMobile = {
        ...state,
        isMobile: action.payload,
      };
      saveTravelsToLocalStorage(newStateSetIsMobile.travels);
      return newStateSetIsMobile;

    default:
      return state;
  }
};

export default rootReducer;