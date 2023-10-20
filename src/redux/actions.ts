// actions.ts
import { Travel, PlanItem } from '../types';

export enum ActionTypes {
    ADD_TRAVEL = 'ADD_TRAVEL',
    EDIT_TRAVEL = 'EDIT_TRAVEL',
    DELETE_TRAVEL = 'DELETE_TRAVEL',
    SELECT_TRAVEL = 'SELECT_TRAVEL',
    DESELECT_TRAVEL = 'DESELECT_TRAVEL',
    EDIT_PLAN_ITEM = 'EDIT_PLAN_ITEM',
    UPDATE_PLAN_ITEM_IMAGE = 'UPDATE_PLAN_ITEM_IMAGE',
    ADD_PLAN_ITEM = 'ADD_PLAN_ITEM', 
    DELETE_PLAN_ITEM = 'DELETE_PLAN_ITEM',
    SET_IS_MOBILE = 'SET_IS_MOBILE',
}

export interface AddTravelAction {
    type: ActionTypes.ADD_TRAVEL;
    payload: Travel;
}

export interface EditTravelAction {
    type: ActionTypes.EDIT_TRAVEL;
    payload: Travel;
}

export interface DeleteTravelAction {
    type: ActionTypes.DELETE_TRAVEL;
    payload: number; // Assuming payload is the travel ID
}

export interface SelectTravelAction {
    type: ActionTypes.SELECT_TRAVEL;
    payload: Travel;
}

export interface DeselectTravelAction {
    type: ActionTypes.DESELECT_TRAVEL;
}

export interface EditPlanItemAction {
    type: ActionTypes.EDIT_PLAN_ITEM;
    payload: any; 
}

export interface UpdatePlanItemImageAction {
    type: ActionTypes.UPDATE_PLAN_ITEM_IMAGE;
    payload: {
        planItemId: number;
        imageUrl: string;
    };
}

export interface AddPlanItemAction {
    type: ActionTypes.ADD_PLAN_ITEM;
    payload: {
        travelId: number;
        planItem: PlanItem;
    };
}

export interface DeletePlanItemAction {
    type: ActionTypes.DELETE_PLAN_ITEM;
    payload: {
        travelId: number;
        planItemId: number;
    };
}

export interface SetIsMobileAction {
    type: ActionTypes.SET_IS_MOBILE;
    payload: boolean;
}


export type Action =
    | AddTravelAction
    | EditTravelAction
    | DeleteTravelAction
    | SelectTravelAction
    | DeselectTravelAction
    | EditPlanItemAction    
    | UpdatePlanItemImageAction      
    | AddPlanItemAction
    | SetIsMobileAction
    | DeletePlanItemAction;
    

export const addTravel = (travel: any) => ({
    type: ActionTypes.ADD_TRAVEL,
    payload: travel,
});

export const selectTravel = (travel: any) => ({
    type: ActionTypes.SELECT_TRAVEL,
    payload: travel,
});

export const deselectTravel = () => ({
    type: ActionTypes.DESELECT_TRAVEL,
});

export const deleteTravel = (travelId: string) => ({
    type: ActionTypes.DELETE_TRAVEL,
    payload: travelId,
});

export const editTravel = (travel: any) => ({
    type: ActionTypes.EDIT_TRAVEL,
    payload: travel,
});

export const editPlanItem = (planItem: any) => ({
    type: ActionTypes.EDIT_PLAN_ITEM,
    payload: planItem,
});

export const updatePlanItemImage = (planItemId: number, imageUrl: string) => ({
    type: ActionTypes.UPDATE_PLAN_ITEM_IMAGE,
    payload: { planItemId, imageUrl },
  }); 

export const addPlanItem = (travelId: number, planItem: PlanItem) => ({
    type: ActionTypes.ADD_PLAN_ITEM,
    payload: { travelId, planItem: { ...planItem, isFavorite: false } }, 
});


export const deletePlanItem = (travelId: number, planItemId: number) => ({
    type: ActionTypes.DELETE_PLAN_ITEM as typeof ActionTypes.DELETE_PLAN_ITEM, 
    payload: { travelId, planItemId },
  });

  export const setIsMobile = (isMobile: boolean) => ({
    type: ActionTypes.SET_IS_MOBILE,
    payload: isMobile,
});